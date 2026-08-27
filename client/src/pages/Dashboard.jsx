import { useEffect, useState } from "react";
import api from "../services/api";

import SmartTimeline from "../components/SmartTimeline";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { formatDistanceToNow } from "date-fns";
import LinearProgress from "@mui/material/LinearProgress";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Box,
  Typography,
  Paper,
 Card,
  Fab,
  Drawer,
} from "@mui/material";
function Dashboard() {
  const [documents, setDocuments] = useState([]);
 const [aiOpen, setAiOpen] = useState(false);
 const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchDocuments();
     fetchEvents();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    setDocuments(
  response.data.documents.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const categories = [
    ...new Set(documents.map((doc) => doc.category)),
  ];
 
 const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/timeline", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    

    setEvents(response.data.events);

  } catch (error) {
    console.log(error);
  }
};

    const totalStorage = (
    documents.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) /
    (1024 * 1024)
  ).toFixed(2);
  const maxStorage = 50; // MB

const storagePercent = Math.min(
  (Number(totalStorage) / maxStorage) * 100,
  100
);
  const cards = [
    {
      title: "Total Documents",
      value: documents.length,
      icon: <DescriptionIcon sx={{ fontSize: 50 }} />,
      color: "#1976d2",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: <CategoryIcon sx={{ fontSize: 50 }} />,
      color: "#2e7d32",
    },
    {
      title: "Storage Used",
      value: `${totalStorage} MB`,
      icon: <CloudDoneIcon sx={{ fontSize: 50 }} />,
      color: "#ed6c02",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Welcome Back 👋
      </Typography>

      <Typography
        color="text.secondary"
        mb={5}
      >
        Here's an overview of your Document Management System.
      </Typography>
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(3, 1fr)",
    },
    gap: 3,
  }}
>
  {cards.map((card) => (
    <Card
      key={card.title}
      sx={{
        borderRadius: 4,
        boxShadow: 4,
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography color="text.secondary">
              {card.title}
            </Typography>

            <Typography variant="h3" fontWeight="bold">
              {card.value}
            </Typography>
          </Box>

          <Box sx={{ color: card.color }}>
            {card.icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
    
  ))}
</Box>
<Paper
  sx={{
    mt: 5,
    p: 3,
    borderRadius: 4,
    boxShadow: 3,
  }}
>
  <Typography variant="h5" fontWeight="bold" mb={2}>
    Recent Documents
  </Typography>
  <Paper
  sx={{
    mt: 4,
    p: 3,
    borderRadius: 4,
    boxShadow: 3,
  }}
>
  <Typography variant="h5" fontWeight="bold" mb={2}>
    Storage Usage
  </Typography>

  <Typography variant="body2" mb={1}>
    {totalStorage} MB of {maxStorage} MB used
  </Typography>

  <LinearProgress
    variant="determinate"
    value={storagePercent}
    sx={{
      height: 12,
      borderRadius: 10,
    }}
  />

  <Typography
    variant="body2"
    mt={1}
    color="text.secondary"
  >
    {storagePercent.toFixed(1)}% Used
  </Typography>
</Paper>
  {documents.length === 0 ? (
    <Typography color="text.secondary">
      No documents uploaded yet.
    </Typography>
  ) : (
    <List>
      {documents.slice(0, 5).map((doc, index) => (
        <Box key={doc._id}>
          <ListItem
            secondaryAction={
              <Chip
                label={doc.category}
                color="primary"
                variant="outlined"
              />
            }
          >
            <ListItemText
              primary={doc.title}
              secondary={formatDistanceToNow(new Date(doc.createdAt), {
                addSuffix: true,
              })}
            />
          </ListItem>

          {index !== 4 && index !== documents.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  )}
</Paper>

<Fab
  color="primary"
  onClick={(event)=>{

    event.currentTarget.blur();

    setAiOpen(true);

  }}
>
  <SmartToyIcon />
</Fab>
<Drawer
  anchor="right"
  open={aiOpen}
  onClose={() => setAiOpen(false)}
  ModalProps={{
    keepMounted: true,
  }}
>
  <Box
    sx={{
      width: 500,
      p: 3,
    }}
  >
    <SmartTimeline
      events={events}
      fetchEvents={fetchEvents}
    />
  </Box>
</Drawer>
    </Box>
  );
}

export default Dashboard;