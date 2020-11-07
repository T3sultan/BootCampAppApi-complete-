const BootcampLogs=require("../models/BootcampLogs")

exports.createBootcampLogs=async(req,res,next)=>{
    try {
        req.body.user=req.user.id
        const bootcampLogs=BootcampLogs.create(req.body)
        res.status(200).json({
            success:true,
            data:bootcampLogs,
        })
    } catch (error) {
        res.status(400).json({success:false})
    }
}

