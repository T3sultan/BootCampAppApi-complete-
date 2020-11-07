const Bootcamp = require('../models/Bootcamp')
const BootcampLogs = require('../models/BootcampLogs')

exports.createBootcamp=async (req, res, next) =>{
    try {
        req.body.user=req.user.id
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json({
            success:true,
            data:bootcamp
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error,
        })
    }
}

exports.getUserBootcamps=async (req, res, next) =>{
    try {
        const userId=req.user.id
        const bootcamps = await Bootcamp.find({user:userId})

        return res.status(200).json({success:true, data:bootcamps})
    } catch (error) {
        res.status(400).json({
            success:false,
            error,
        })
    }
}

exports.deleteBootcamp=async (req, res, next) =>{
    try {
        await Bootcamp.findByIdAndDelete(req.params.id)

        return res.status(200).json({success:true})
    } catch (error) {
        res.status(400).json({
            success:false,
            error,
        })
    }
}

exports.explore=async(req,res,next)=>{
    try {
        const userId = req.user.id
        const bootcampLogs=await BootcampLogs.find({
            user:userId,
        })

        const bootcamps = await Bootcamp.find({
            user:{$ne:userId}, //1. user should not be able to explore his/her own bootcamp
            _id:{$nin:bootcampLogs.map(({bootcamp})=>bootcamp)}  
        }).populate("user")
        
        res.status(200).json({
            success:true,
            data:bootcamps,
            total: bootcamps.length
        })
    } catch (error) {
        res.status(400).json({success:false})
    }
}

exports.getSavedBootcamps = async (req,res,next)=>{
    try {
        const userId=req.user.id
        const bootcampLogs=await BootcampLogs.find({
            user:userId,
            status:"saved",
        })
        const bootcamps=await Bootcamp.find({
            _id:{$in:bootcampLogs.map(({bootcamp})=>bootcamp)}
        })

        res.status(200).json({success:true,bootcamps})
        console.log(bootcamps)
    } catch (error) {
        //res.status(400).json({success:false})
        next(error)
    }
}