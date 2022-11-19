import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h4>Page Not Found</h4>
        <Link to={'/'}> Go Home</Link>
    </div>
  )
}

export default NotFound