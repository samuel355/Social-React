import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBFooter } from 'mdb-react-ui-kit'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../redux/features/authSlice'

const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState)
    const {email, password} = formValue

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
        if(email && password){
            dispatch(login({formValue, navigate, toast}))
            console.log(formValue)
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
            <h4>Log In</h4>
            {
                loading && (
                    <MDBSpinner size='sm' role="status" tag="span" className='me-2 center' />
                )
            }
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
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            Login
                        </MDBBtn>
                    </div>
                        
                </MDBValidation>
            </MDBCardBody>

            <MDBFooter>
                <Link to={"/register"}>
                    <p>Don't have an account ? Sign up </p>
                </Link>
            </MDBFooter>
            
        </MDBCard>
    </div>
  );
}

export default Login