import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'

const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState)
    const {email, password} = formValue
    
  return (
    <div>Login</div>
  )
}

export default Login