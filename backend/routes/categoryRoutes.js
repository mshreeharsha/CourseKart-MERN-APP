
const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/requireAuth')
const router=express.Router()

const {createCategoryController,
    updateCategoryController,
    getCategoryController,
    getSingleCategoryController,
    deleteCategoryController}=require('../controllers/categoryController')

//create Category Route
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update Category Route
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getAll Categories
router.get('/get-category',getCategoryController)

//get Single Category
router.get('/single-category/:slug',getSingleCategoryController)

//delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

module.exports=router