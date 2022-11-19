import express from 'express'
import { createTour, deleteTour, fetchTours, getTour, getToursByUser, updateTour} from '../controllers/tour.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/create', auth,  createTour ) 
router.get('/tours', fetchTours ) 
router.get('/tour/:id', getTour ) 
router.get('/tours/userTours/:userId', auth, getToursByUser ) 
router.patch('/tour/updateTour/:id', auth, updateTour ) 
router.delete('/tour/deleteTour/:id', auth, deleteTour ) 

export default router