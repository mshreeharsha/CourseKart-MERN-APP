
const jwt=require('jsonwebtoken')
const userModel = require('../models/userModel')

const requireSignIn = async(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.SECRET)
        req.user=decode
        console.log(decode)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin Middleware'
        })
    }
}

const isAdmin = async(req,res,next)=>{
    try {
        const id=req.user._id
        const user=await userModel.findById(id)
        if(user.role!==1){
            return res.status(400).send({
                success:false,
                message:'Unauthorized Access'
            })
        }
        else{
            next()
        }
    } catch (error) {
        console.log()
    }
}

module.exports={requireSignIn,isAdmin}