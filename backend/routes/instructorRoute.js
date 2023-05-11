
const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/requireAuth')
const router=express.Router()
const formidable=require('express-formidable')

const {createInstructorController,
    updateInstructorController,
    getSingleInstructorController,
    deleteInstructorController,
    getAllInstructorController,
    getPhotoController}=require('../controllers/instructorController')

//create Instructor Route
router.post('/create-instructor',requireSignIn,isAdmin,formidable(),createInstructorController)

//update Instructor Route
router.patch('/update-instructor/:id',requireSignIn,isAdmin,formidable(),updateInstructorController)

//get Single Instructor
router.get('/single-instructor/:slug',getSingleInstructorController)

//get all Instructor
router.get('/all-instructors',getAllInstructorController)

//delete Instructor
router.delete('/delete-instructor/:id',requireSignIn,isAdmin,deleteInstructorController)

//Get Photo
router.get('/instructor-photo/:pid',getPhotoController)

module.exports=router