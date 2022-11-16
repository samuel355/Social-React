import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const secret = 'reactSoc'

//Sign Up
export const signup = async(req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try{
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.status(400).json({message: 'User already exit. Log in with this email'});
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        })

        const token = jwt.sign({
            email: result.email,
            id: result._id,
        }, secret, {expiresIn: '1h'})

        res.status(201).json({result, token})
    }catch (error){
        res.status(500).json({message: 'Something went wrong, please try again'});
        console.log(error)
    }
}

// Login In
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const oldUser = await User.findOne({email});
        if(!oldUser) return res.status(404).json({message: 'Email or Password is incorrect'})

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
        if(!isPasswordCorrect) return res.status(404).json({message: 'Email or Password is incorrect'})

        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '1h'});

        res.status(200).json({result: oldUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, please try again'});
        console.log(error)
    }
}