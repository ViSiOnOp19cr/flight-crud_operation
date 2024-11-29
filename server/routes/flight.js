import express from "express";
import mongoose from "mongoose";

const flight = express.Router();
import flightModel from "../models/db.js"


flight.post('/post', async function(req,res){
    const {airlineName,source,destination,price,duration} = req.body;
    await flightModel.create({
        airlineName:airlineName,
        source:source,
        destination:destination,
        price:price,
        duration:duration

    })
    res.json({
        message:"added a flight succesfully"
    })
});

flight.get('/getbyid/:id', async (req, res) => {
    

    try {
        const id = req.params.id; 
        const flight = await flightModel.findById(id); 
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.json({ flight:flight });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while retrieving the flight"
        });
    }
});
flight.put('/update/:id',async(req,res) =>{
    const {airlineName,source,destination,price,duration} = req.body;
    try{
        const id = req.params.id;
        const flight = await flightModel.findByIdAndUpdate({
            _id:id
        },
        {
            airlineName:airlineName,source:source,destination:destination,price:price,duration:duration
        },{
            new:true
        });
        if(!flight){
            return res.status(404).json({message:"flight not found"});
        }
        else{
            return res.json({message:"flight details updated"});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"error occurred while retrieving the flight"
        });
    }
});
flight.delete('/delete/:id',async(req,res) =>{
    try{
        const id = req.params.id;
        const flight = await flightModel.findByIdAndDelete(id);
        if(flight){
            res.json({message:"delted succesfully"})
        }
        else{
            res.json({message:"flight id not found"})
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"error occurred while retrieving the flight"
        });
    }
});


flight.get('/getall',  async function (req, res) {
    try {
        // Fetch all flights from the collection
        const allflights = await flightModel.find(); 

        res.json({
            allflights: allflights
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while retrieving flights"
        });
    }
});
export default flight;



