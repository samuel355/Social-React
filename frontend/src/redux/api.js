import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:8000"
})
export const signIn = (formData) => API.post('/login', formData);

export const signUp =  (formData) => API.post('/signup', formData)