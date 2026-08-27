const TimelineEvent = require("../models/TimelineEvent");

// Create Event
const createEvent = async (req, res) => {
  try {
    const { title, date, priority } = req.body;

    const event = await TimelineEvent.create({
      title,
      date,
      priority,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {

    const events = await TimelineEvent.find({
      createdBy: req.user._id,
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Complete
const toggleComplete = async (req, res) => {
  try {
    const event = await TimelineEvent.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.completed = !event.completed;

    await event.save();

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  toggleComplete,
};