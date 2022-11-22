import mongoose  from 'mongoose'
import Tour from '../models/tours.js'

//Create Tour
export const createTour = async (req, res) => {
    const tour = req.body
    const newTour = new Tour({
        ...tour,
        creator: req.userId
    })
    try {
        newTour.save();
        res.status(201).json(newTour)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong, try again later'})
        console.log(error)
    }
}

//Fetch all tours
export const fetchTours = async (req, res) => {
    try {
        const tours = await Tour.find().lean()
        if(tours){
            res.status(200).json(tours)
        }else{
            res.json({message: 'No Tour was found. you can Create new Tour'})
        }
    } catch (error) {
        res.status(404).json({message: 'Something went wrong fetching tours, try again later'})
        console.log(error)
    }
}

//Fetch all tours
export const testTours = async (req, res) => {
    try {
        const tours = await Tour.find({}).lean()
        if(tours){
            res.status(200).json(tours)
        }else{
            res.json({message: 'No Tour was found. you can Create new Tour'})
        }
    } catch (error) {
        res.status(404).json({message: 'Something went wrong fetching tours, try again later'})
        console.log(error)
    }
}

//Fetch single tour with id 
export const getTour = async (req, res) => {
    const {id} = req.params
     try {
        const tour = await Tour.findById(id).lean()
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong fetching tours, try again later'})
        console.log(error)
    }
}

//Fetching tours created by the user
export const getToursByUser = async (req, res) => {
    const {userId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({message: 'User does not exist'})
    }

    const userTours = await Tour.find({creator: userId}).lean()
    res.status(200).json(userTours)
}

//Deleting Tour
export const deleteTour = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `This tour does not exist: ${id}`})
    }

    await Tour.findByIdAndRemove(id).lean()
    res.json({message: 'Tour Deleted Successfully'})
}

//Update Tour
export const updateTour = async (req, res) => {
    const {id} = req.params;
    const {title, description, imageFile, creator, tags} = req.body

    try {
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: `This tour does not exist: ${id}`})
        }
        const updatedTour = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id
        }

        await Tour.findByIdAndUpdate(id, updatedTour, {new: true}).lean()
        res.json(updatedTour)
    } catch (error) {
        res.status(404).json({message: `Sorry Something went wrong`})
        console.log(error)
    }

}

// Search Tour
export const getToursBySearch = async(req, res) =>{
    const {searchQuery} = req.query

    try {
        const title = new RegExp(searchQuery, 'i')
        const tours = await Tour.find({title})

        res.json(tours)

    } catch (error) {
        res.status(404).json({message: `Sorry Something went wrong`}) 
        console.log(error) 
    }
}