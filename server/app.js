const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes.js")
const timelineRoutes = require("./routes/timelineRoutes");
const documentRoutes = require("./routes/documentRoutes");
//Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth" , authRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/documents", documentRoutes);

//test Route
app.get("/",(req,res) =>{
    res.send("DMS backend is running...");
})

module.exports = app;

