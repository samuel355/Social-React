import React, {useState} from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBValidationItem, MDBSpinner, MDBBtn, MDBInput, } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const initialState = {
  title: "",
  description: "",
  tags: [],

}
const CreateTour = () => {

  const navigate = useNavigate()
  const [toursData, setToursData] = useState(initialState)
  const {title, description, tags} = toursData

  const onInputChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setToursData({...toursData, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault() 

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
        <h5 style={{marginTop: '10px'}}>Add Tour</h5>
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
                  Create Tour
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