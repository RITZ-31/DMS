const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  deleteEvent,
  toggleComplete,
} = require("../controllers/timelineController");

router.post("/", protect, createEvent);

router.get("/", protect, getEvents);

router.delete("/:id", protect, deleteEvent);

router.put("/:id", protect, toggleComplete);

module.exports = router;