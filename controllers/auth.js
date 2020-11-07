const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    //1. we take the data from client
    const { name, email, password, bio } = req.body;

    //2. validating if the user already exists.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    //creating the user object and save to our mongo db
    const user = await User.create({ name, email, password, bio });
    //get the token
    const token=user.getSignedJwtToken
    
    res.status(200).json({ success: true, user, token  });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal error!" });
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    
    if(!email || !password){
      return res
      .status(400)
      .json({success:false, msg:'Please provide email and password'})
    }
    
    const user = await User.findOne({email:email}).select('+password')

    if(!user){
      return res
      .status(400)
      .json({success:false, msg: 'Invalid credentials'})
    }
    
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
      return res
      .status(400)
      .json({success:false, msg:'Invalid credentials'})
    }

    const token=user.getSignedJwtToken()
    res.status(200).json({success:true, user, token})

  } catch (err) {
    res. status(500).json({success:false, msg: 'Internal error!'})
    next(err)
  }
};

exports.getProfile=async(req,res, next)=>{
  try {
    //user is already available due to the protect middleware
    const user = req.user

    res.status(200).json({
      success:true,
      data:user,
    })
  } catch (error) {
    
  }
}

exports.editProfile=async(req,res, next)=>{
  const { name, bio } = req.body;
  console.log("bio === ",bio)
  console.log("name === ",name)

  User.findOneAndUpdate({_id:req.user._id},{ $set: { bio: bio,name:name } },{new:true,useFindAndModify:false},(err,contact)=>{  
    if(err){
      res.send(err)
    }
    res.status(200).json({
      success:true,
      data:req.user,
    })
  })
}