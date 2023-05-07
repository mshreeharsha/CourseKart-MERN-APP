
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const instructorSchema=new Schema({
    instructorName:{
        type:String,
        required:true
    },
    courses:[{
        type: mongoose.ObjectId,
        ref: 'Course'
      }]
},{timestamps:true})

module.exports = mongoose.model('Instructor',instructorSchema)