import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardGroup} from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import {deleteCreatorTour, getUserTours} from '../redux/features/tourSlice'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const dispatch = useDispatch()
    const {userTours, loading} = useSelector((state) => ({...state.tour})) 
    const {user} = useSelector((state) => ({...state.auth})) 

    const userId = user?.result?._id;

    useEffect(() => {
        if(userId){
            dispatch(getUserTours(userId))
        }
    }, [userId, dispatch])

    const excerpt = (str) => {
        if(str.length > 45) {
            str = str.substring(0, 45) + '...'
        }
        return str
    }

    if(loading){
        return (<Spinner />)
    }

    //Delete tour
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this tour? ")){
            dispatch(deleteCreatorTour({id, toast}))
        }
    }

    return (
        <div style={{margin: 'auto', padding: '120px', maxWidth: '900px', alignContent: 'center'}}>
            <h4 className='text-center'>{user?.result?.name}</h4>
            <hr style={{maxWidth: '570px'}} />
            {
                userTours && userTours.map((userTour) => (
                    <MDBCardGroup key={userTour._id}>
                        <MDBCard style={{maxWidth: '600px', marginTop: '10px'}}>
                            <MDBRow>
                                <MDBCol md="4">
                                    <MDBCardImage 
                                        className='rounded'
                                        src={userTour.imageFile}
                                        alt={userTour.title}
                                        fluid
                                        />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-start'>
                                            {userTour.title}
                                        </MDBCardTitle>
                                        <MDBCardText className='text-start'>
                                            {excerpt(userTour.description)}
                                            <Link to={`/tour/${userTour._id}`}>Read More </Link>
                                        </MDBCardText>
                                        <div style={{marginLeft: '5px', float: 'right', marginTop: '-60px'}}>
                                            <MDBBtn className='mt-1' tag="a" color="none">
                                                <MDBIcon fas icon='trash' style={{color: '#dd4b39'}} size="lg" onClick={() => handleDelete(userTour._id)} />
                                            </MDBBtn>

                                            <Link to={`/edit-tour/${userTour._id}`} className='mt-1' tag="a" color="none">
                                                <MDBIcon fas icon='edit' style={{color: '#55acee', marginLeft: '15px'}} size="lg" />
                                            </Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCardGroup>
                ))
            }
        </div>
    )
}

export default Dashboard