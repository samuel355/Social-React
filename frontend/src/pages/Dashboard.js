import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardGroup} from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import {getUserTours} from '../redux/features/tourSlice'


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

    return (
        <div>Dashboard </div>
    )
}

export default Dashboard