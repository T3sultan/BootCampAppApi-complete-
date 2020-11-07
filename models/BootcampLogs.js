const mongoose= require('mongoose')

const BootcampLogsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:"Bootcamp",
        required:true,
    },

    status:{
        type:String,
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
module.exports=mongoose.model('BootcampLogs',BootcampLogsSchema)