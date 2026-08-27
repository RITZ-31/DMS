import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

function UploadDocument() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/folders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFolders(response.data.folders);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleUpload = async () => {
    try {
      if (!title.trim()) {
        toast.error("Please enter a file name.");
        return;
      }

      if (!file) {
        toast.error("Please choose a PDF.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("folder", folder);
      formData.append("document", file);

      const token = localStorage.getItem("token");

      await api.post("/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Document uploaded successfully!");

      navigate("/documents");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Upload failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 550,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <UploadFileIcon
              sx={{
                fontSize: 70,
                color: "#1976d2",
              }}
            />

            <Typography variant="h4" fontWeight="bold">
              Upload Document
            </Typography>

            <Typography color="text.secondary">
              Upload a PDF to the root or a folder
            </Typography>
          </Box>

          <TextField
            label="File Name"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description (Optional)"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            select
            label="Folder (Optional)"
            fullWidth
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          >
            <MenuItem value="">
              Root (No Folder)
            </MenuItem>

            {folders.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
          >
            Choose PDF

            <input
              hidden
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {file && (
            <Typography color="success.main">
              📎 {file.name}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleUpload}
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
            }}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default UploadDocument;