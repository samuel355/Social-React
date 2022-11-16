import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'

const initialState = {
  email: "",
  password: "",
}

const Register = () => {
  const [formValue, setFormValue] = useState(initialState)
  const {email, password} = formValue

  const handleSubmit = (e) => {
      e.preventDefault() 
  }
  const onInputChange = () => {

  }
  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '500px', alignContent: 'center', marginTop: '120px'}}>
        <MDBCard alignment='center' style={{padding: '15px'}}>
            <MDBIcon fas icon="user-circle" className='fa-2x' />
            <h4>Log In</h4>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className="col-md-12">
                        <MDBInput 
                          label="Email" 
                          type='email' 
                          value={email} 
                          name="email" 
                          onChange ={onInputChange} 
                          required 
                          invalid 
                          validation="Please provide your email" 
                        />
                    </div>

                    <div className="col-md-12">
                        <MDBInput 
                          label="Password" 
                          type='password' 
                          value={password} 
                          name="password" 
                          onChange ={onInputChange} 
                          required 
                          invalid 
                          validation="Please provide your password" 
                        />
                    </div>
                        
                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default Register