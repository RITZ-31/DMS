import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import DocumentCard from "../components/DocumentCard";
import MicIcon from "@mui/icons-material/Mic";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";
import {TextField} from "@mui/material";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {InputAdornment} from "@mui/material";
import {MenuItem} from "@mui/material";
function Documents() {
  console.log("DOCUMENTS PAGE LOADED");
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments(response.data.documents);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Document deleted successfully!");
      fetchDocuments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete document!"
      );
    }
  };

  const startVoiceSearch = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {
    alert("Voice search is not supported in this browser");
    return;
  }


  const recognition = new SpeechRecognition();


  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;


  recognition.start();



  recognition.onresult = (event) => {

    const voiceText =
      event.results[0][0].transcript;


    setSearch(voiceText);

  };


  recognition.onerror = (error) => {

    console.log("Voice error:", error);

  };

};

  const filteredDocuments = documents
    .filter((doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doc) =>
      category === "All" ? true : doc.category === category
    );

  return (
    <Box
      sx={{
        p: 4,
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        📂 My Documents
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
  label="Search documents"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  sx={{ flex:1, minWidth:260 }}

  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),

    endAdornment: (
      <InputAdornment position="end">

        <MicIcon
          style={{
            cursor:"pointer"
          }}
          onClick={startVoiceSearch}
        />

      </InputAdornment>
    )
  }}
/>

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ width: 220 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Resume">Resume</MenuItem>
          <MenuItem value="Notes">Notes</MenuItem>
          <MenuItem value="Certificate">Certificate</MenuItem>
        </TextField>
      </Paper>

      {filteredDocuments.length === 0 ? (
        <Typography
          variant="h6"
          textAlign="center"
          mt={10}
          color="text.secondary"
        >
          No documents found 📄
        </Typography>
      ) : (
        <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },
    gap: 3,
  }}
>
  {filteredDocuments.map((doc) => (
    <DocumentCard
      key={doc._id}
      doc={doc}
      handleDelete={handleDelete}
    />
  ))}
</Box>
      )}

    </Box>
  );
}

export default Documents;