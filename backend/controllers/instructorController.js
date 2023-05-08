const instructorModel = require('../models/instructor')

const createInstructorController = async(req,res)=>{
    try {
        const {instructorName,courses}=req.body
        //Validation
        if(!instructorName){
            return res.status(500).send({
                message:'Instructor Name is Required'
            })
        }
        
        const existing=await instructorModel.findOne({instructorName})

        if(existing){
            return res.status(200).send({
                success:false,
                message:'Instructor Already Exists'
            })
        }

        const instructor=await instructorModel.create({instructorName,courses})
        res.status(201).send({
            success:true,
            message:'New Instructor Created',
            instructor
            
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success:false,
            message:'Error in Creating Instructor',
            error:error.message
        })
    }
}
const updateInstructorController = async(req,res)=>{

}
const getInstructorController = async(req,res)=>{

}

//Getting a single Instructor
const getSingleInstructorController = async(req,res)=>{
    const {id}=req.params
    try {
        const instructor= await instructorModel.findOne({_id:id})
        res.status(200).send({
            success:true,
            message:'Fetched A Single Instructor',
            instructor
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success:false,
            message:'Error in Fetching Instructor',
            error:error.message
        })
    }
}
const deleteInstructorController = async(req,res)=>{

}

module.exports={createInstructorController,updateInstructorController,getInstructorController,
    getSingleInstructorController,
    deleteInstructorController}