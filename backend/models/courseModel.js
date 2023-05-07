
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const courseModel=new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category'
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    instructor:{
        type:mongoose.ObjectId,
        ref:'Instructor'
    },
    accessible:{
        type:Boolean
    }
},{timestamps:true})

module.exports=mongoose.model('Course',courseModel)