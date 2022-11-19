import React, {useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import {useParams} from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { getTour } from '../redux/features/tourSlice';

const SingleTour = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {tour} = useSelector((state) => ({...state.tour}))

    useEffect(() => {
      if(id){
        dispatch(getTour(id))
      }
    }, [id, dispatch])
    
  return (
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
                position='top'
                style={{width: '100%', maxHeight: '600px'}}
                src={tour.imageFile}
                alt={tour.title}
            />
            <MDBCardBody>
                <h3>{tour.title}</h3>
                <span>
                    <p className="text-start tourName"> Created By : {tour.name}</p>
                </span>

                <div style={{float: 'left'}}>
                    <span>
                        {
                           tour.tags?.map((tag, i) =>  <span key={i} style={{background: 'grey', padding: '2px', borderRadius: '5px', color: 'white', marginLeft: '5px', marginRight: '5px'}}> {`#${tag}`} </span>)
                        }
                    </span>
                </div>
                <br />
                <MDBCardText style={{alignItems: 'center'}} className='text-start mt-3 d-flex text-center '>
                    <MDBIcon
                        style={{float: 'left', margin: '5px'}}
                        far 
                        icon='calendar-alt' 
                        size='lg'
                    />
                    <small className="text-muted text-capitalize">
                        {
                            moment(tour.createdAt).fromNow()
                        }
                    </small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {tour.description }
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
  )
}

export default SingleTour