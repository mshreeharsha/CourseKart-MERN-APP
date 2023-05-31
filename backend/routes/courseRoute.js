
const express=require('express');
const { requireSignIn, isAdmin } = require('../middleware/requireAuth');
const router=express.Router();

//A Node.js module for parsing form data, especially file uploads.
//it adds a req.fields property to the request object that contains the non-file form fields submitted with the request, and a req.files property that contains an object with details about any uploaded files.

const formidable=require('express-formidable');

const {createCourseController,
    getCourseController,
    getSingleCourseController,
    getPhotoController,
    deleteCourseController,
    updateCourseController,
    courseFilterController,
    courseCountController,
    courseListController,
    searchCourseController,
    relatedCourseController,
    brainTreePaymentController,
    braintreeTokenController,deleteOrderController} = require('../controllers/courseController');

//creating a new Course

router.post('/create-course',requireSignIn,isAdmin,formidable(),createCourseController);

//Get Course
router.get('/get-course',getCourseController);

//Get Single Course
router.get('/get-course/:slug',getSingleCourseController);

//Get Photo
router.get('/course-photo/:pid',getPhotoController);

//delete Course
router.delete('/delete-course/:pid',requireSignIn,isAdmin,deleteCourseController);

//update Course
router.put('/update-course/:cid',requireSignIn,isAdmin,formidable(),updateCourseController);

//course Price Filter
router.post('/course-filter',courseFilterController);

//Course Count
router.get('/course-count',courseCountController);

//Course List
router.get('/course-list/:page',courseListController);

//search course
router.get('/search/:keyword',searchCourseController);

//related courses
router.get('/related-courses/:pid/:cid',relatedCourseController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//cancel Order
router.patch("/cancel-order/:id",requireSignIn,deleteOrderController);

module.exports=router;