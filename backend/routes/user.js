import { googleSignIn, login, signup} from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.post('/signup', signup) 
router.post('/login', login) 
router.post('/googleSignIn', googleSignIn) 

export default router 