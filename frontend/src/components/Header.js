import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setLogout} from '../redux/features/authSlice'
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBNavbarBrand,
    MDBCollapse,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBIcon
} from 'mdb-react-ui-kit'

const Header = () => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    const {user} = useSelector((state) => ({...state.auth}))
    
    const handleLogout = () => {
        dispatch(setLogout())
    }
    return (
        <MDBNavbar fixed='top' expand='lg' style={{backgroundColor: '#f0e6ea'}}>
            <MDBContainer>
                
                <MDBNavbarBrand style={{color: '#606089',fontWeight: '600', fontSize: '22px'}} href="/" >
                    React Social
                </MDBNavbarBrand>
                {
                    user?.result ? (
                        <span>Welcome Back {user.result.name} </span>
                    ) : (<></>)
                }
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShow(!show)}
                    style={{color: '#606089'}}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'> 
                                <p className='header-text'> Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        {
                            user && (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/addTour'> 
                                            <p className='header-text'> Add Tour</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>

                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/dashboard'> 
                                            <p className='header-text'> Dashboard</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>

                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='/'> 
                                            <p className='header-text' onClick={handleLogout}> Logout </p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            )
                        }

                        {
                            user === null ? (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/login'> 
                                        <p className='header-text'> Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            ): (
                                <></>
                            )
                        }

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header