import React, {useEffect} from 'react'
import {MDBCol, MDBContainer, MDBRow, MDBTypography} from  'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';


const Home = () => {
  const {tours, loading} = useSelector((state) => ({...state.tour}))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTours())
  }, [dispatch])

  if(loading){
    return (<h5>Loading...</h5>)
  }

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '1000px', alignContent: 'center'}}>
      <MDBRow className='mt-5'>
        {
          tours.length === 0 && (
            <MDBTypography className='text-center mb-0' tag="h4">
                No Tours have been created
            </MDBTypography>
          )
        }
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-3 g-2'>
               {
                tours && tours?.map((tour, index) => (
                  <CardTour 
                    key={index} 
                    imageFile={tour.imageFile}
                    name={tour.name}
                    description={tour.description}
                    tags={tour.tags}
                    _id = {tour._id}
                    title={tour.title}
                    creator={tour.creator}
                    />
                ))
               }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home