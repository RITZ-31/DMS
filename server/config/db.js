const mongoose = require("mongoose");
const connectDb = async() =>{
    try{
        await
        mongoose.connect(process.env.MONGODB_URL);
        
        console.log("mongodb connected");
        console.log("Connected database:", mongoose.connection.name);
   }catch(err){
        console.log("mongodb connection err :", err.message);
        process.exit(1);

    }
};
module.exports = connectDb;
