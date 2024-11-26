const mongoose = require('mongoose');
const env = require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const todoSchema = new Schema({
    title:String,
    startTime:String,
    endTime:String,
    creatorId: ObjectId
})
const userSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})


const todoModel = mongoose.model("todo",todoSchema);
const userModel = mongoose.model("user",userSchema);
module.exports= {
    todoModel,
    userModel
}

