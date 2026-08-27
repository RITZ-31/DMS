require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db.js");
const PORT = process.env.PORT || 5000;

//connect to mongodb
connectDb();


app.listen(PORT ,() =>{
  console.log(`Server is running on port ${PORT}`);
})