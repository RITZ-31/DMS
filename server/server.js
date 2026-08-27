// require("dotenv").config();
// const app = require("./app");
// const connectDb = require("./config/db.js");
// const PORT = process.env.PORT || 5000;
require("dotenv").config();

console.log("MONGODB_URL exists:", !!process.env.MONGODB_URL);

const app = require("./app");
const connectDb = require("./config/db.js");
const PORT = process.env.PORT || 5000;
//connect to mongodb
connectDb();


app.listen(PORT ,() =>{
  console.log(`Server is running on port ${PORT}`);
})