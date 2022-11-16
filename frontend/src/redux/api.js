import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:8000"
})

//get token and pass to create tour endpoint
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

//sign in 
export const signIn = (formData) => API.post('/login', formData);
//sign up
export const signUp = (formData) => API.post('/signup', formData)
//google signin
export const googleSignIn = (result) => API.post('/googleSignIn', result)

//Create Tour
export const createTour = (tourData) => API.post('/create', tourData)