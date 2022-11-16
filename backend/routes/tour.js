import express from 'express'
import { createTour, fetchTours } from '../controllers/tour.js'

const router = express.Router()

router.post('/create', createTour ) 
router.get('/tours', fetchTours ) 

export default router