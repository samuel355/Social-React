import Tour from '../models/tours.js'

//Create Tour
export const createTour = async (req, res) => {
    const tour = req.body
    const newTour = new Tour(tour)

    try {
        newTour.save();
        res.status(200).json(newTour)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong, try again later'})
        console.log(error)
    }
}

//Fetch all tours
export const fetchTours = async (req, res) => {
    try {
        const tours = Tour.find()
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong, try again later'})
        console.log(error)
    }
}