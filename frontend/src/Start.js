import React from 'react'
import { useNavigate } from 'react-router-dom'



function Start() {

const navigate=useNavigate(); 

  return (
<div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className=' p-5 rounded w-50 border loginForm text-center'>

          

            <h2>Login As</h2>
            <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-primary btn-lg'onClick={e=>navigate('/doctorLogin')}>Doctor</button>
                <button className='btn btn-success btn-lg' onClick={e=>navigate('/login')}>Admin</button>
            </div>
           

            <div className="d-flex justify-content-between mt-4">
    <button className="btn btn-primary btn-lg" onClick={e => navigate('/nurseLogin')}> Nurse </button>
    </div>


            <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-primary btn-lg'onClick={e=>navigate('/triageLogin')}>Triage</button>
                <button className='btn btn-success btn-lg' onClick={e=>navigate('/receptionLogin')}>Reception</button>
            </div>

           

            

        </div>
      
    </div>
  )
}

export default Start
