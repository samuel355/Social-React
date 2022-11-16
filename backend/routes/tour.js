import express from 'express'
import { createTour, fetchTours } from '../controllers/tour.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/create', auth,  createTour ) 
router.get('/tours', fetchTours ) 

export default router