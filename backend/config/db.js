const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongo(){
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (!mongoUri) {
        throw new Error("MongoDB connection string is not configured. Set MONGODB_URI.");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
}
module.exports =  connectToMongo;
