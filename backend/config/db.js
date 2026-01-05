const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongo(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")
    }catch(error){
        console.error(error.message)
    };
}
module.exports =  connectToMongo;
