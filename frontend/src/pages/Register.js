import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBValidationItem} from 'mdb-react-ui-kit'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../redux/features/authSlice'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState)
    const {firstName, lastName, email, password, confirmPassword} = formValue

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading, error,} = useSelector((state) => ({...state.auth}))

    const onInputChange = (e) => {
        e.preventDefault() 
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        if(password !== confirmPassword){
            return toast.error("Passwords do not match")
        }
        if(firstName && lastName && email && password ){
            dispatch(register({formValue, navigate, toast}))
        }
    }

    //Only run when there's an error
    useEffect(() =>{
        error && toast.error(error);
    }, [error])

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '500px', alignContent: 'center', marginTop: '120px'}}>
        <MDBCard alignment='center' style={{padding: '15px'}}>
            <MDBIcon fas icon="user-circle" className='fa-2x' />
            <h4>Sign Up </h4>
            {
                loading && (
                    <MDBSpinner size='sm' role="status" tag="span" className='me-2 center' />
                )
            }
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className='row g-3'>
                    <MDBValidationItem feedback="Please provide your First Name" invalid  className="col-md-12">
                        <MDBInput 
                          label="First Name" 
                          type='text' 
                          value={firstName} 
                          name="firstName" 
                          onChange ={onInputChange} 
                          required 
                
                        />
                    </MDBValidationItem>
                    <MDBValidationItem feedback="Please provide your Last name" invalid  className="col-md-12">
                        <MDBInput 
                          label="Last Name" 
                          type='text' 
                          value={lastName} 
                          name="lastName" 
                          onChange = {onInputChange} 
                          required 
                          
                        />
                    </MDBValidationItem>
                    <MDBValidationItem feedback="Please provide your email" invalid  className="col-md-12">
                        <MDBInput 
                          label="Email" 
                          type='email' 
                          value={email} 
                          name="email" 
                          onChange ={onInputChange} 
                          required 
                          
                        />
                    </MDBValidationItem>
                    <MDBValidationItem feedback="Please provide your password" invalid  className="col-md-12">
                        <MDBInput 
                          label="Password" 
                          type='password' 
                          value={password} 
                          name="password" 
                          onChange ={onInputChange} 
                          required 
                          
                        />
                    </MDBValidationItem>
                    <MDBValidationItem feedback="Please re-enter your password" invalid  className="col-md-12">
                        <MDBInput 
                          label="Confirm Password" 
                          type='password' 
                          value={confirmPassword} 
                          name="confirmPassword" 
                          onChange ={onInputChange} 
                          required 
                          
                        />
                    </MDBValidationItem>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            Register
                        </MDBBtn>
                    </div>
                        
                </MDBValidation>
            </MDBCardBody>

            <MDBCardFooter>
                <Link to={"/login"}>
                    <p>Already have an Account? Sign In </p>
                </Link>
            </MDBCardFooter>
            
        </MDBCard>
    </div>
  );
}

export default Register