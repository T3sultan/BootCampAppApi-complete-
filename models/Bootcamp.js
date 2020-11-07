const mongoose= require('mongoose')

const BootcampSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please add a title'],
        unique:true,
        trim:true,
        maxlength:[50, 'Title can not be greater than 50 characters'],
    },
    description:{
        type:String,
        required:[true, 'Please add a description'],
        maxlength:[500, 'Description can not be more than 500 characters'],
    },
    contact:{
        type:String,
        maxlength:[20, 'Phone number can not be longer than 20 characters'],
    },
    website:{
        type:String,
    },
    email:{
        type:String,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ]
    },
    address:{
        type:String,
        required:[true,'Please add an address'],
    },
    careers:{
        type:[String],
        required:true,
    },
    duration:{
        type:Number,
        min:1,
        max:12,
    },
    price:{
        type:Number,
        min:0,
        max:1000000000,
    },
    isScholarship:{
        type:Boolean,
        default:false,
    },
    jobGuarantee:{
        type:Boolean,
        default:false,
    },
    coverColor:{
        type:Object,
        default:{
            name:"orange",
            code:"#F2994A",
        },
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
})
module.exports=mongoose.model('Bootcamp',BootcampSchema)