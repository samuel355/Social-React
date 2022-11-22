import React, {useEffect, useState} from 'react'
import { MDBCard, MDBValidation, MDBValidationItem, MDBSpinner, MDBBtn, MDBInput, } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import { createTour, updateCreatorTour } from '../redux/features/tourSlice';

const initialState = {
  title: "",
  description: "",
  tags: [],

}

const CreateTour = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toursData, setToursData] = useState(initialState)
  const {title, description, tags} = toursData

  const {id} = useParams()

  const {error, loading, userTours} = useSelector((state) => ({...state.tour}))
  const {user} = useSelector((state) => ({...state.auth}))

  //copy and paste the tour to be edited
  useEffect(() => {
    if(id){
      const singleTour = userTours.find((tour) => tour._id ===id)
      setToursData({...singleTour})
    }
  },[id, userTours])

  const onInputChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setToursData({...toursData, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    if(title && description && tags){
      const updatedTourData = {...toursData, name: user?.result?.name}

      if(!id){
        dispatch(createTour({updatedTourData, navigate, toast}))
        handleClear()
      }else{
        dispatch(updateCreatorTour({id, updatedTourData, toast, navigate}))
        handleClear()
      }

    }
  }

  const handleAddTag = (tag) => {
    setToursData({
      ...toursData, 
      tags: [...toursData.tags, tag]
    })
  }

  const handleDeleteTag = (deleteTag) => {
    setToursData({
      ...toursData, 
      tags: toursData.tags.filter((tag) => tag !== deleteTag)})
  }

  const handleClear = () => {
    setToursData({
      title: "",
      description: '',
      tags: []
    })
  }

  useEffect(() => {
    error && toast.error(error)
  },[error])

  return (
    <div 
      className='container'
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '650px',
        alignContent: 'center',
        marginTop: '120px'
      }}
    >
      <MDBCard alignment='center'>
        <h5 style={{marginTop: '10px'}}>{id ? "Update" : "Add Tour"}</h5>
        {
          loading && (
            <MDBSpinner size='sm' role='' />
          )
        }
        <MDBValidation onSubmit={handleSubmit} style={{padding: '15px'}}>
          <MDBValidationItem feedback="Please provide tour Title" invalid  className="col-md-12">
            <MDBInput 
              label="Enter Title" 
              type='text' 
              value={title} 
              name="title" 
              onChange ={onInputChange} 
              required 
              style={{padding: '10px'}}
            />
          </MDBValidationItem>

          <MDBValidationItem feedback="Add Description" invalid  className="col-md-12">
            <textarea onChange ={onInputChange}  name="description" id="description" value={description} col="10" style={{width: '100%', marginTop: '30px',  height: '100px'}} placeholder="Description" required />
          </MDBValidationItem>

          <div className="col-md-12">
            <ChipInput 
              name="tags"
              placeholder = "Add Tag(s)" 
              variant='outlined'
              onChange ={onInputChange}
              value={tags}
              fullWidth
              onAdd={(tag) => handleAddTag(tag)}
              onDelete = {(tag) => handleDeleteTag(tag)}
              style={{marginTop: "30px"}}
            />
          </div>

          <div className="d-flex justify-content-start" style={{marginTop: "30px"}}>
            
            <FileBase 
              type="file"
              multiple={false} 
              onDone={
                ( ({base64}) => 
                setToursData({...toursData, imageFile: base64}))
              } 
            />
            
          </div>

          <div className="col-12 mt-5" >
              <MDBBtn style={{width: "100%", marginTop: '30px'}} className="mt-2">
                  {id ? "Update" : "Create Tour"}
              </MDBBtn>
          </div>

          <div className="col-12 mt-1" >
              <MDBBtn onClick={handleClear} color='danger' style={{width: "100%", marginTop: '10px'}} className="mt-2">
                  Clear
              </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCard>
    </div>
  )
}

export default CreateTour