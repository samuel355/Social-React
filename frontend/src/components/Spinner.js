import React from 'react'
import {MDBSpinner} from 'mdb-react-ui-kit'

const Spinner = () => {
  return (
    <MDBSpinner style={{width: '2rem', height: '2rem', marginTop: '100px', margin: 'auto', display: 'flex', alignContent: 'center', alignSelf: 'center', flexDirection:'column'}}>
        <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  )
}

export default Spinner