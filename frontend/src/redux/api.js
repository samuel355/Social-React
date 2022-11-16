import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:8000"
})
//sign in 
export const signIn = (formData) => API.post('/login', formData);
//sign up
export const signUp = (formData) => API.post('/signup', formData)
//google signin
export const googleSignIn = (result) => API.post('/googleSignIn', result)

//Create Tour
export const createTour = (tourData) => API.post('/create', tourData)