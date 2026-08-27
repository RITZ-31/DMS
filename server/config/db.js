const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log("mongodb connected");
        console.log("Connected database:", mongoose.connection.name);
    } catch (err) {
        console.error("mongodb connection error:", err.message);
        isConnected = false;
        throw err;
    }
};

module.exports = connectDb;