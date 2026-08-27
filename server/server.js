require("dotenv").config();

const app = require("./app");
const connectDb = require("./config/db.js");

connectDb();

module.exports = app;