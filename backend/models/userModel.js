
const bcrypt=require('bcrypt')
const validator=require('validator')

const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default :0
    }
},{timestamps:true})


//static signup method
userSchema.statics.register = async function(name,email,password,phone,address){

    //Validating Email and Password
    if(!validator.isEmail(email)){
        throw Error('Email is Not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is Not Strong Enough')
    }

    //Checking for existance of User
    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use! Please Login!!')
    }

    //If new User Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    //Save it into Data Base
    const user = await this.create({name,email,phone,address,password:hash})

    return user
}

//Static Login Method

userSchema.statics.login = async function(email,password){

    const user=await this.findOne({email})
    if(!user){
        throw Error('Incorrect Email, User is Not Registered')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect Password')
    }
    return user
}


module.exports=mongoose.model('User',userSchema)