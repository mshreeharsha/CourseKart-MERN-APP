//Configuring the dotenv
require('dotenv').config()

//Express
const express=require('express')
const app=express()
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoutes')
const courseRoute = require('./routes/courseRoute')
const instructorRoute = require('./routes/instructorRoute')

//Morgan
const morgan = require('morgan')
const connectDB = require('./config/dbConfig')

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/users',userRoute)
app.use('/api/category',categoryRoute)
app.use('/api/course',courseRoute)
app.use('/api/instructor',instructorRoute)

//Connect to Database
connectDB()

//Listening to Requests
app.listen(process.env.PORT,()=>{
    console.log(`Server Running at Port ${process.env.PORT}`)
})