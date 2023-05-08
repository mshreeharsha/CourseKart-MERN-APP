const categoryModel = require("../models/categoryModel")

const slugify=require('slugify')

//Create Category
const createCategoryController = async(req,res)=>{

    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({
                message:'name is Required'
            })
        }
        const existingCategory=await categoryModel.findOne({name})

        if(existingCategory){
            return res.status(200).send({
                message:'Category Already Exists'
            })
        }

        const category= await categoryModel.create({name,slug:slugify(name)})
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category
            
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
}

//Update category
const updateCategoryController= async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params

        const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Updating Category'
        })
    }
}

//Get All Categories
const getCategoryController= async(req,res)=>{
    try {
        const category=await categoryModel.find({})

        res.status(200).send({
            success:true,
            message:'All Categories List',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Getting All Category'
        })
    }
}

//Get Single Category
const getSingleCategoryController = async(req,res)=>{
    try {
        const category= await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Getting Single Category'
        })
    }
}

//Delete a category
const deleteCategoryController = async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Deleting Single Category'
        })
    }
}

module.exports={createCategoryController,updateCategoryController,getCategoryController,getSingleCategoryController,deleteCategoryController}