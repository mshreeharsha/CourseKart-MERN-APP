
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const instructorSchema=new Schema({
    instructorName:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    courses:[{
        type: mongoose.ObjectId,
        ref: 'Course'
      }],
    instructorDetails:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Instructor',instructorSchema)