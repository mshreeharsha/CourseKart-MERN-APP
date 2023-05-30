
const courseModel = require('../models/courseModel');
const instructorModel = require('../models/instructor');
const orderModel = require('../models/orderModel');
const slugify=require('slugify');

const braintree = require("braintree")
const dotenv = require("dotenv")

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  
//File System
const fs = require('fs');

const createCourseController = async(req,res)=>{
    try {
        const{name,slug,description,price,category,instructor,duration,topics,accessible}=req.fields;

        const {photo}=req.files;

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
            case !duration:
                return res.status(500).send({
                    message:'Duration is Required'
                })
            case !topics:
                return res.status(500).send({
                    message:'Topics is Required'
                })
            case !accessible:
                return res.status(500).send({
                    message:'Accessible is Required'
                })
            case photo && photo.size>100000:
                return res.status(500).send({
                    message:'Photo is Required and should be less than 1MB'
                })
             
        }

        const existing=await courseModel.findOne({name});

        if(existing){
            return res.status(200).send({
                success:false,
                message:'Course Already Exists'
            })
        }
        const course = new courseModel({...req.fields,slug:slugify(name)});

        if(photo){
            course.photo.data = fs.readFileSync(photo.path);

            course.photo.contentType=photo.type;
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
        .select("-photo").limit(10).sort({createdAt:-1});

        console.log(courses);
        res.status(200).send({
            success:true,
            count:courses.length,
            message:'Fetched All Courses',
            courses
        });
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
        console.log(req.params.slug)
        const course = await courseModel.findOne({slug:req.params.slug}).select("-photo")
        .populate('category').populate('instructor');

        res.status(200).send({
            success:true,
            message:'Single Course Fetched',
            course
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success:false,
            message:'Error in Fetching Single Course',
            error:error.message
        });
    }
}

//Get Photo
const getPhotoController = async(req,res)=>{
    try {
        const course = await courseModel.findById(req.params.pid).select("photo");
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
        const {pid}=req.params;
        console.log(pid);
        const course=await courseModel.findByIdAndDelete(pid).select("-photo");
        const instructor=course.instructor;
        await instructorModel.findOneAndUpdate({_id:instructor},
            { $pull: { courses: course._id } },
            { new: true })
        res.status(200).send({
            success:true,
            message:'Course Deleted Successfully'
        })
    } catch (error) {
        console.log(error.message);
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
        const {cid}=req.params;
        const oldCourse= await courseModel.findById(cid).select("-photo");
        console.log(oldCourse);
        const oldInstructor=oldCourse.instructor;
        console.log(oldInstructor);
        await instructorModel.findOneAndUpdate({_id:oldInstructor},
            { $pull: { courses: oldCourse._id } },
            { new: true })


        const{name,slug,description,price,category,instructor,duration,topics,accessible}=req.fields;

        const {photo}=req.files;

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
            case !duration:
                return res.status(500).send({
                    message:'Duration is Required'
                })
            case !topics:
                return res.status(500).send({
                    message:'Topics is Required'
                })
            case !accessible:
                return res.status(500).send({
                    message:'Accessible is Required'
                })
            case photo && photo.size>100000:
                return res.status(500).send({
                    message:'Photo is Required and should be less than 1MB'
                })
             
        }
        const course = await courseModel.findByIdAndUpdate(cid,
            {...req.fields,slug:slugify(name)},{new:true});

        if(photo){
            course.photo.data = fs.readFileSync(photo.path);

            course.photo.contentType=photo.type;
        }

        await course.save()
        await instructorModel.findOneAndUpdate({_id:instructor},
            { $push: { courses: course._id } },
            { new: true })
        res.status(201).send({
            success:true,
            message:'Course Updated Successfully',
            course
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success:false,
            message:'Error in Updating Course',
            error:error.message
        });
    }
}

//Course Filter
const courseFilterController = async(req,res)=>{
    try {
        const {checked,radio}=req.body;
        let args={};
        if(checked.length>0){
            args.category=checked;
        }
        if(radio.length){
            //Price range Between 0th Index and 1st Index
            args.price={$gte:radio[0],$lte:radio[1]};
        }
        args.accessible=true;
        console.log(args);
        const courses=await courseModel.find(args).populate("instructor").populate("category");
        res.status(200).send({
            success:true,
            courses
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Filter by Prices',
            error
        });
    }
}

//get Courses Count

const courseCountController = async(req,res)=>{
    try {
        // const total = await courseModel.find({}).estimatedDocumentCount()
        const total = await courseModel.countDocuments({ accessible: true });
        console.log(total);
        res.status(200).send({
            success:true,
            total
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Counting Total no of Courses',
            error
        });
    }
}

//Course List per Page

const courseListController = async(req,res)=>{
    try {
        const perPage=3;
        const page=req.params.page?req.params.page:1;

        const courses = await courseModel.find({accessible:true}).select("-photo").
        skip((page-1)*perPage).limit(perPage).sort({createdAt:-1}).populate("instructor").populate("category");

        res.status(200).send({
            success:true,
            courses
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Getting Course Per Page',
            error
        });
    }
}

const searchCourseController = async(req,res) => {
    try {
        const{keyword} = req.params;
        
        //$regex: keyword, $options: "i": The $regex operator performs a regular expression search on the specified field. In this case, it matches the keyword value in a case-insensitive manner ($options: "i").

        const results = await courseModel.find({
            $or: [
                {name :{$regex : keyword , $options: "i"}},
                {description :{$regex : keyword , $options: "i"}},
            ],accessible:true
        }).select("-photo").populate("instructor").populate("category");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in search course api",
            error
        });
    }
}

const relatedCourseController = async(req,res) => {
    try {
        const {pid,cid} = req.params;

        //$ne: pid, the query ensures that the returned courses do not have the same _id as the provided pid. This prevents the current course from being included in the related courses.
        
        const courses = await courseModel.find({
            category : cid,
            _id: {$ne : pid},
        }).select("-photo").limit(3).populate("category").populate("instructor");
        res.status(200).send({
            success:true,
            courses,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message: "error while getting related course",
            error
        });
    }
}

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              courses: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

module.exports={createCourseController,getCourseController,
    getSingleCourseController,getPhotoController,
    deleteCourseController,updateCourseController,courseFilterController,
courseCountController,courseListController,searchCourseController,relatedCourseController,braintreeTokenController,brainTreePaymentController};