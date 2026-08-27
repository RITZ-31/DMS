import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

function AITimeline() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    fetchEvents();
  }, []);

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
      console.log(error.response?.data || error.message);
    }
  };

  const createEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/timeline",
        {
          title,
          date,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Event Added");

      setTitle("");
      setDate("");
      setPriority("Medium");

      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <Box>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        🤖 AI Smart Timeline
      </Typography>

      <TextField
        fullWidth
        label="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        fullWidth
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </TextField>

      <Button
        variant="contained"
        fullWidth
        onClick={createEvent}
      >
        Save Event
      </Button>

      <Typography
        variant="h6"
        fontWeight="bold"
        mt={4}
        mb={2}
      >
        Upcoming Events
      </Typography>

      {events.length === 0 ? (
        <Typography>No events yet.</Typography>
      ) : (
        events.map((event) => (
          <Card
            key={event._id}
            sx={{ mb: 2 }}
          >
            <CardContent>

              <Typography fontWeight="bold">
                {event.title}
              </Typography>

              <Typography color="text.secondary">
                {new Date(event.date).toLocaleDateString()}
              </Typography>

              <Chip
                sx={{ mt: 1 }}
                label={event.priority}
                color={
                  event.priority === "High"
                    ? "error"
                    : event.priority === "Medium"
                    ? "warning"
                    : "success"
                }
              />

            </CardContent>
          </Card>
        ))
      )}

    </Box>
  );
}

export default AITimeline;

