import express from "express";
import mongoose from "mongoose";
import dotenv from  "dotenv";
import flight from "./routes/flight.js"
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", 
  }));
app.use("/",flight);

async function main(){
    try{
            
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected");

        app.listen(port,()=>{
            console.log(`server is running on ${port}`);
        })
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
main();
