const Document = require("../models/Document");
const supabase = require("../config/supabase");
const mongoose = require("mongoose");
const fs = require("fs-extra");
const path = require("path");

const uploadDocument = async (req, res) => {
 try {
    const { title, description ,category} = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    // writing the next code

    const fileName = `${Date.now()}-${req.file.originalname}`;

const fileBuffer = await fs.readFile(req.file.path);

const { data, error } = await supabase.storage
  .from("documents")
  .upload(fileName, fileBuffer, {
    contentType: req.file.mimetype,
    upsert: false,
  });

if (error) {
  throw error;
}

const { data: publicData } = supabase.storage
  .from("documents")
  .getPublicUrl(fileName);

await fs.remove(req.file.path);

const document = await Document.create({
  title: title || req.file.originalname,
  description: description || "",
  category: category || "General",
  fileUrl: publicData.publicUrl,
  publicId: fileName,
  uploadedBy: req.user._id,
});

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getDocuments = async (req, res) => {
//     try {
//         const documents = await Document.find();

//         res.status(200).json({
//             success: true,
//             documents,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

const getDocuments = async (req, res) => {
    try {

        const documents = await Document.find({
            uploadedBy: req.user._id,
        });

        res.status(200).json({
            success: true,
            documents,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getDocumentById = async (req, res) => {
    try {
        // const document = await Document.findById(req.params.id);
        const document = await Document.findOne({
    _id: req.params.id,
    uploadedBy: req.user._id,
});
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        res.status(200).json({
            success: true,
            document,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateDocument = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        document.title = title || document.title;
        document.description = description || document.description;
        document.category = category || document.category;

        await document.save();

        res.status(200).json({
            success: true,
            message: "Document updated successfully",
            document,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        // const document = await Document.findById(req.params.id);
        const document = await Document.findOne({
    _id: req.params.id,
    uploadedBy: req.user._id,
});
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        // Delete file from Cloudinary
     const { error } = await supabase.storage
  .from("documents")
  .remove([document.publicId]);

if (error) {
  throw error;
}
        // Delete document from MongoDB
        await document.deleteOne();

        res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
