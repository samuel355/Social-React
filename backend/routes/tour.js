import express from 'express'
import { createTour, fetchTours, getTour } from '../controllers/tour.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/create', auth,  createTour ) 
router.get('/tours', fetchTours ) 
router.get('/tour/:id', getTour ) 

export default router