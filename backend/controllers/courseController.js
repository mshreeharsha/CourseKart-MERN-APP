
const courseModel = require('../models/courseModel')
const instructorModel = require('../models/instructor')
const slugify=require('slugify')

//File System
const fs = require('fs')

const createCourseController = async(req,res)=>{
    try {
        const{name,slug,description,price,category,instructor,accessible}=req.fields

        const {photo}=req.files

        //Validation

        switch(true){
            case !name:
                return res.status(500).send({
                    message:'name is Required'
                })
            case !description:
                return res.status(500).send({
                    message:'Description is Required'
                })
            case !price:
                return res.status(500).send({
                    message:'Price is Required'
                })
            case !category:
                return res.status(500).send({
                    message:'Category is Required'
                })
            case !instructor:
                return res.status(500).send({
                    message:'Instructor is Required'
                })
            case photo && photo.size>100000:
                return res.status(500).send({
                    message:'Photo is Required and should be less than 1MB'
                })
             
        }

        const existing=await courseModel.findOne({name})

        if(existing){
            return res.status(200).send({
                success:false,
                message:'Course Already Exists'
            })
        }

        const course = new courseModel({...req.fields,slug:slugify(name)})

        if(photo){
            course.photo.data = fs.readFileSync(photo.path)

            course.photo.contentType=photo.type
        }

        await course.save()
        await instructorModel.findOneAndUpdate({_id:instructor},
            { $push: { courses: course._id } },
            { new: true })
        res.status(201).send({
            success:true,
            message:'Course Created Successfully',
            course
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Creating Course'
        })
    }
}

//Get All Courses

const getCourseController = async(req,res)=>{
    try {

        //Not Loading the photo while Fetching the Courses
        //Adding a Limit and Displaying only recent 10 Courses
        const courses= await courseModel.find({}).populate('category').populate('instructor')
        .select("-photo").limit(10).sort({createdAt:-1})

        res.status(200).send({
            success:true,
            count:courses.length,
            message:'Fetched All Courses',
            courses
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success:false,
            message:'Error in Getting the Course',
            error:error.message
        })
    }
}

const getSingleCourseController = async(req,res)=>{
    try {
        const course = await courseModel.findOne({slug:req.params.slug}).select("-photo").populate('category').populate('instructor')

        res.status(200).send({
            success:true,
            message:'Single Course Fetched',
            course
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success:false,
            message:'Error in Fetching Single Course',
            error:error.message
        })
    }
}

//Get Photo
const getPhotoController = async(req,res)=>{
    try {
        const course = await courseModel.findById(req.params.pid).select("photo")
        if(course.photo.data){
            res.set('Content-type',course.photo.contentType);
            return res.status(200).send(course.photo.data);
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

//Delete the Course

const deleteCourseController =async(req,res)=>{
    try {
        const {pid}=req.params
        console.log(pid)
        const course=await courseModel.findByIdAndDelete(pid).select("-photo")
        const instructor=course.instructor
        await instructorModel.findOneAndUpdate({_id:instructor},
            { $pull: { courses: pid } },
            { new: true })
        res.status(200).send({
            success:true,
            message:'Course Deleted Successfully'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success:fasle,
            message:'Error while Deleting Course',
            error:error.message
        })
    }
}

//update Course
const updateCourseController = async(req,res)=>{
    try {

        //Removing the course from oldInstructor
        const {cid}=req.params
        const oldCourse= await courseModel.findById(cid).select("-photo")
        console.log(oldCourse)
        const oldInstructor=oldCourse.instructor
        console.log(oldInstructor)
        await instructorModel.findOneAndUpdate({_id:oldInstructor},
            { $pull: { courses: cid } },
            { new: true })


        const{name,slug,description,price,category,instructor,accessible}=req.fields

        const {photo}=req.files

        //Validation

        switch(true){
            case !name:
                return res.status(500).send({
                    message:'name is Required'
                })
            case !description:
                return res.status(500).send({
                    message:'Description is Required'
                })
            case !price:
                return res.status(500).send({
                    message:'Price is Required'
                })
            case !category:
                return res.status(500).send({
                    message:'Category is Required'
                })
            case !instructor:
                return res.status(500).send({
                    message:'Instructor is Required'
                })
            case photo && photo.size>100000:
                return res.status(500).send({
                    message:'Photo is Required and should be less than 1MB'
                })
             
        }
        const course = await courseModel.findByIdAndUpdate(cid,
            {...req.fields,slug:slugify(name)},{new:true})

        if(photo){
            course.photo.data = fs.readFileSync(photo.path)

            course.photo.contentType=photo.type
        }

        await course.save()
        await instructorModel.findOneAndUpdate({_id:instructor},
            { $push: { courses: cid } },
            { new: true })
        res.status(201).send({
            success:true,
            message:'Course Updated Successfully',
            course
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success:false,
            message:'Error in Updating Course',
            error:error.message
        })
    }
}

module.exports={createCourseController,getCourseController,getSingleCourseController,getPhotoController,deleteCourseController,updateCourseController}