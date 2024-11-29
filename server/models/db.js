import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);
console.log("mongodb connected in models");

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airlineName: String,
    source: String,
    destination: String,
    price: Number,
    duration: String,
});

const flightModel = mongoose.model("flight", flightSchema);

export default flightModel; 

