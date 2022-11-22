import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'
import tourModel from "./models/tours.js";
import asyncHandler from 'express-async-handler'
import User from "./models/user.js";

const mongoose_link = "mongodb+srv://sobal_official:Confirmation12@cluster0.4wduhw2.mongodb.net/React-Social?retryWrites=true&w=majority"

const port = 8000;
const app = express();

app.use(morgan('dev'))
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.listen(port, () =>console.log(`app is running on port ${port}`))

const connectDB = async () => {
    try {
        const connect = mongoose.connect(mongoose_link, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Mongo DB connected successfully")
    }catch(err){
        console.log(`Error: ${err}`)
        process.exit(1)
    }
}

connectDB()

app.get('/check', (req, res) => {res.send('server working')})

app.get('/fetch', asyncHandler(async(req, res) => {
    try {
        const tours = await tourModel.find({}).lean()
        if(tours){
            res.status(200).json(tours)
        }else{
            res.json({message: 'No Tour was found. you can Create new Tour'})
        }
    } catch (error) {
        res.status(404).json({message: 'Something went wrong fetching tours, try again later'})
        console.log(error)
    }
}))

app.use('/', userRouter) //http://localhost:8000/signup
app.use('/', tourRouter)