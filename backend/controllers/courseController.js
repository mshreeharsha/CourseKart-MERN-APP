
const courseModel = require('../models/courseModel')
const slugify=require('slugify')
//File System
const fs = require('fs')

const createCourseController = async(req,res)=>{
    try {
        const{name,slug,description,price,category,accessible}=req.fields

        const {photo}=req.files

        //Validation

        switch(true){
            case !name:
                return res.status(500).send({
                    error:'name is Required'
                })
            case !description:
                return res.status(500).send({
                    error:'Description is Required'
                })
            case !price:
                return res.status(500).send({
                    error:'Price is Required'
                })
            case !category:
                return res.status(500).send({
                    error:'Category is Required'
                })
            case photo && photo.size>100000:
                return res.status(500).send({
                    error:'Photo is Required and should be less than 1MB'
                })
             
        }
        const course = new courseModel({...req.fields,slug:slugify(name)})

        if(photo){
            course.photo.data = fs.readFileSync(photo.path)

            course.photo.contentType=photo.Type
        }

        await course.save()
        res.status(201).send({
            success:true,
            message:'Product Created Successfully',
            course
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Creating Product'
        })
    }
}

module.exports={createCourseController}