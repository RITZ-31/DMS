import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  Box,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { formatDistanceToNow } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DocumentCard({ doc, handleDelete }) {
  const navigate = useNavigate();
 const getFileIcon = () => {
  const url = doc.fileUrl.toLowerCase();

  if (url.includes(".pdf")) {
    return <PictureAsPdfIcon sx={{ color: "#e53935", fontSize: 42 }} />;
  }

  if (
    url.includes(".png") ||
    url.includes(".jpg") ||
    url.includes(".jpeg")
  ) {
    return <ImageIcon sx={{ color: "#43a047", fontSize: 42 }} />;
  }

  if (
    url.includes(".doc") ||
    url.includes(".docx")
  ) {
    return <DescriptionIcon sx={{ color: "#1976d2", fontSize: 42 }} />;
  }

  if (
    url.includes(".zip") ||
    url.includes(".rar")
  ) {
    return <ArchiveIcon sx={{ color: "#ff9800", fontSize: 42 }} />;
  }

  return <InsertDriveFileIcon sx={{ color: "#757575", fontSize: 42 }} />;
};
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.download = "";
    link.click();
  };

  return (
    <Card
      sx={{
        width: 330,
        borderRadius: 4,
        transition: "all .25s ease",
        boxShadow: 3,
       "&:hover": {
  transform: "translateY(-8px)",
  boxShadow: 12,
},
      }}
    >
      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
        {getFileIcon()}
          <Chip
            label={doc.category}
            color="primary"
            size="small"
          />
        </Box>

        <Typography
  variant="h6"
  fontWeight={700}
  noWrap
  gutterBottom
>
          {doc.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
        >
          {doc.description || "No description available"}
        </Typography>
         <Box
  display="flex"
  alignItems="center"
  gap={1}
  mb={2}
>
  <CalendarTodayIcon
    sx={{
      fontSize: 18,
      color: "gray",
    }}
  />

  <Typography
    variant="caption"
    color="text.secondary"
  >
    {formatDistanceToNow(new Date(doc.createdAt), {
      addSuffix: true,
    })}
  </Typography>
</Box>
        <Stack
          direction="row"
          spacing={1}
          mb={2}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => window.open(doc.fileUrl, "_blank")}
          >
            View
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={downloadFile}
          >
            Download
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit/${doc._id}`)}
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(doc._id)}
          >
            Delete
          </Button>
        </Stack>

      </CardContent>
    </Card>
  );
}

export default DocumentCard;