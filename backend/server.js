//Configuring the dotenv
require('dotenv').config()

//Express
const express=require('express')
const app=express()
const userRoute = require('./routes/userRoute')

//Morgan
const morgan = require('morgan')
const connectDB = require('./config/dbConfig')

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/users',userRoute)

//Connect to Database
connectDB()

app.get('/',(req,res)=>{
    res.send({mssg:'Hello there'})
})

//Listening to Requests
app.listen(process.env.PORT,()=>{
    console.log(`Server Running at Port ${process.env.PORT}`)
})