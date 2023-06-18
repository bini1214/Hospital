import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


function Home() {
  const [adminCount, setAdminCount] = useState(null);
  const [doctorCount, setDoctorCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/adminCount')
      .then(res => {
       setAdminCount(res.data[0].admine)
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/doctorCount')
      .then(res => {
       setDoctorCount(res.data[0].doctor)
      })
      .catch(err => console.log(err));


  }, []);
  

  return (
    <div>
    <div className='p-3 d-flex justify-content-around'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'> 
      <div className='text-center pb-1'> 
      

      <p>Admin</p>
      <hr/>
      <p>Total:{adminCount}</p>
      <Link to={'/login'} className='btn btn-primary btn-sm me-2'>edit</Link>

      </div>
      </div>


      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Doctor</p>
      <hr/>
      <p>Total:{doctorCount}</p>
      <Link to={'/login'} className='btn btn-primary btn-sm me-2'>edit</Link>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Nurse</p>
      <hr/>
      <p>Total:{}</p>
      <Link to={'/login'} className='btn btn-primary btn-sm me-2'>edit</Link>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Triage</p>
      <hr/>
      <p>Total:{}</p>
      <Link to={'/login'} className='btn btn-primary btn-sm me-2'>edit</Link>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Reception</p>
      <hr/>
      <p>Total:{}</p>
      <Link to={'/login'} className='btn btn-primary btn-sm me-2'>edit</Link>
      </div>
      </div> 

    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admin</h3>
      <table className='table'>
        <thead>
          <th>
          
            <th>Email</th>
            <th>Action</th>
          </th>
        </thead>
        <tbody>

        </tbody>
      </table>
      
      </div>
      
    </div>
  )
}

export default Home
