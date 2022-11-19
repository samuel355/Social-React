import React, {useState, useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBValidationItem} from 'mdb-react-ui-kit'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { login, googleSignIn } from '../redux/features/authSlice'

import {GoogleLogin} from 'react-google-login'
import { gapi } from 'gapi-script';

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
        }
    }

    const googleSuccess = (resp) =>{
        const email = resp?.profileObj.email
        const name = resp?.profileObj.name
        const token = resp?.tokenId
        const googleId = resp?.googleId 
        const result = {email, name, token, googleId}
        dispatch(googleSignIn({result, navigate, toast}))
        
    }

    const googleFailure = (error) =>{
        console.log(error)
        toast.error('Sorry something went wrong. Try again later')
    }

    //Only run when there's an error
    useEffect(() =>{
        error && toast.error(error);
    }, [error])

    const clientId="68788342542-qr98h7o358n4nuh6aqb4qtf3uuhscnge.apps.googleusercontent.com"
    //ClientID:  68788342542-qr98h7o358n4nuh6aqb4qtf3uuhscnge.apps.googleusercontent.com
    //Client Secret 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

    useEffect(() => {
        const initClient = () => {
                gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    },[]);

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
                    <MDBValidationItem feedback="Please provide your email" invalid className="col-md-12">
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
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            Login
                        </MDBBtn>
                    </div>
                        
                </MDBValidation>

                <GoogleLogin 
                    clientId={clientId}
                    render={
                        (renderProps) => (
                            <MDBBtn 
                                style={{width: '100%', marginTop: 10}} 
                                color="danger" 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className='me-2' fab icon="google" /> Google Sign In

                            </MDBBtn>
                        )
                    }

                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy ={"single_host_origin"}
                />
            </MDBCardBody>

            <MDBCardFooter>
                <Link to={"/register"}>
                    <p>Don't have an account ? Sign up </p>
                </Link>
            </MDBCardFooter>
            
        </MDBCard>
    </div>
  );
}

export default Login