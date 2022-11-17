import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'

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

app.use('/', userRouter) //http://localhost:8000/signup
app.use('/', tourRouter)