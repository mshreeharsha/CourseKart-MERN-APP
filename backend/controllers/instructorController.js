const instructorModel = require('../models/instructor')
const slugify=require('slugify')
//File System
const fs = require('fs')

const createInstructorController = async(req,res)=>{
    try {
        console.log(req.fields)
        const {instructorName,slug,instructorDetails}=req.fields
        const {photo}=req.files
        //Validation
        if(!instructorName){
            return res.status(500).send({
                message:'Instructor Name is Required'
            })
        }
        if(!instructorDetails){
            return res.status(500).send({
                message:'Details is Required'
            })
        }
        if(photo && photo.size>100000){
            return res.status(500).send({
                message:'Photo is Required and should be less than 1MB'
            })
        }
        const existing=await instructorModel.findOne({instructorName})

        if(existing){
            return res.status(200).send({
                success:false,
                message:'Instructor Already Exists'
            })
        }

        const instructor=new instructorModel({instructorName,instructorDetails,slug:slugify(instructorName),courses:[]})

        if(photo){
            instructor.photo.data = fs.readFileSync(photo.path)

            instructor.photo.contentType=photo.type
        }
        await instructor.save()
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

//Updating Instructor
const updateInstructorController = async(req,res)=>{
    try {
        const {id} = req.params
        const {instructorName,slug,instructorDetails}=req.fields
        const {photo}=req.files
        //Validation
        if(!instructorName){
            return res.status(500).send({
                message:'Instructor Name is Required'
            })
        }
        if(!instructorDetails){
            return res.status(500).send({
                message:'Details is Required'
            })
        }

        if(photo && photo.size>100000){
            return res.status(500).send({
                message:'Photo is Required and should be less than 1MB'
            })
        }

        const instructor=await instructorModel.findByIdAndUpdate(id,{instructorName,instructorDetails,slug:slugify(instructorName)},{new:true})

        if(photo){
            instructor.photo.data = fs.readFileSync(photo.path)

            instructor.photo.contentType=photo.type
        }

        res.status(200).send({
            success:true,
            message:'Instructor Updated Successfully',
            instructor
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Updating the Instructor'
        })
    }
}

//Getting All Instructors
const getAllInstructorController = async(req,res)=>{
    try {
        const instructors= await instructorModel.find({}).sort({createdAt:-1}).select("-photo").populate("courses")
        res.status(200).send({
            success:true,
            message:'All Instructor List',
            instructors
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success:false,
            message:'Error in Fetching All Instructors',
            error:error.message
        })
    }
}


//Getting a single Instructor
const getSingleInstructorController = async(req,res)=>{
    try {
        const instructor= await instructorModel.findOne({slug:req.params.slug}).select("-photo").populate("courses")
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

//Get Photo
const getPhotoController = async(req,res)=>{
    try {
        const instructor = await instructorModel.findById(req.params.pid).select("photo")
        if(instructor.photo.data){
            res.set('Content-type',instructor.photo.contentType);
            return res.status(200).send(instructor.photo.data);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success:false,
            message:'Error in Fetching Photo',
            error:error.message
        });
    }
}


const deleteInstructorController = async(req,res)=>{
    try {
        const instructor=await instructorModel.findById(req.params.id).select("-photo")
        const courses=instructor.courses
        if(courses.length>0){
            return res.status(400).send({
                success:false,
                message:"Can't delete Instructor"
            })
        }

        await instructorModel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success:true,
            message:'Deleted Instructor Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Deleting Instructor',
            error:error.message
        })
    }
}

module.exports={createInstructorController,updateInstructorController,
    getSingleInstructorController,
    deleteInstructorController,
    getAllInstructorController,
    getPhotoController}