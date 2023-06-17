import React from 'react'
import { Link } from 'react-router-dom'

function Doctor() {
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Doctor List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Doctor</Link>

    </div>
  )
}

export default Doctor
