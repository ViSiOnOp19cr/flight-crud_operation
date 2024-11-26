import express from "express";
import mongoose from "mongoose";
import dotenv from  "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

console.log("checking github brooooo")

async function main(){
    try{
            
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("data basa connected");

        app.listen(port,()=>{
            console.log(`server is running on ${port}`);
        })
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
main();
