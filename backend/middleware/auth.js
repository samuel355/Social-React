import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const secret = 'react-soc'

const auth = async (req, res, next) => {
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            const token = req.headers.authorization.split(' ')[1];
            //google auth token is more than 500 long so if it's than 500 the user logged in with email and password, otherwise the user logged in with google
    
            const isCustomAuth = token.length < 500;
            let decodedData;
            if(token && isCustomAuth){
                decodedData = jwt.verify(token, secret);
                req.userId = decodedData?.id
            }else{
                // users with google logged in
                //token length will be greater than 500
                decodedData = jwt.decode(token)
                const googleId = decodedData?.sub.toString()
                const user = await User.findOne({googleId})
                req.userId = user?._id;
            }
            next()
    
        } catch (error) {
    
            console.log(`Middleware error ${error}`)
        }
    }
}

export default auth;