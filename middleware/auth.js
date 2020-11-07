const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect=async (req,res,next)=>{
    try {
        //veriry token
        let token
        
        //if there is token, we get the token
        if(req.headers.authorization){
            token=req.headers.authorization.split(" ")[1]
        }

        
        //if there is not token send back error
        if(!token){
            console.log("NO TOKEN")
            return next(res.status(401).send({error:"Not authorized"}))
        }

        //if token -> then we extract user id, find user from DB -> attach user to req.obj
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user= await User.findById(decoded.id)

            next()
        } catch (error) {
            console.log("error",error)
            return next(res.status(401).send({error:'Not authorized'}))
        }
    } catch (error) {
        console.log("last error",error)
        return next(res.status(401).send({error:'Not authorized'}))
    }
}