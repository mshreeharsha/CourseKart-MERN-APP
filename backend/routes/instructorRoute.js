
const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/requireAuth')
const router=express.Router()

const {createInstructorController,
    updateInstructorController,
    getInstructorController,
    getSingleInstructorController,
    deleteInstructorController}=require('../controllers/instructorController')

//create Instructor Route
router.post('/create-instructor',requireSignIn,isAdmin,createInstructorController)

//update Instructor Route
router.put('/update-instructor/:id',requireSignIn,isAdmin,updateInstructorController)

//getAll Instructor
router.get('/get-instructor',requireSignIn,isAdmin,getInstructorController)

//get Single Instructor
router.get('/single-instructor/:id',getSingleInstructorController)

//delete Instructor
router.delete('/delete-instructor/:id',requireSignIn,isAdmin,deleteInstructorController)

module.exports=router