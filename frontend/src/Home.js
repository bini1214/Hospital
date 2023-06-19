import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate=useNavigate()

  const [adminCount, setAdminCount] = useState(null);
  const [doctorCount, setDoctorCount] = useState(null);
  const [nurseCount, setNurseCount] = useState(null);
  const [triageCount, setTriageCount] = useState(null);
  const [receptionCount, setReceptionCount] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:8081/dashboard')
    .then(res=>{
      if(res.data.Status==="Success")
      {
    
      }
      else{
        navigate('/start')
      }
    })

  


    axios.get('http://localhost:8081/adminCount')
      .then(res => {
       setAdminCount(res.data[0].admine)
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/doctorCount')
      .then(res => {
       setDoctorCount(res.data[0].doctore)
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/nurseCount')
      .then(res => {
       setNurseCount(res.data[0].nursee)
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/triageCount')
      .then(res => {
       setTriageCount(res.data[0].triagee)
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:8081/receptionCount')
      .then(res => {
       setReceptionCount(res.data[0].receptione)
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
      

      </div>
      </div>


      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Doctor</p>
      <hr/>
      <p>Total:{doctorCount}</p>
      
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Nurse</p>
      <hr/>
      <p>Total:{nurseCount}</p>
      
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Triage</p>
      <hr/>
      <p>Total:{triageCount}</p>
      
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Reception</p>
      <hr/>
      <p>Total:{receptionCount}</p>
    
      </div>
      </div> 

    </div>
    
      
      
    <div className="container d-flex justify-content-center align-items-center">
  <div>
    <Link to="/dash" className="btn btn-primary btn-sm me-">
      menu
    </Link>
  </div>
</div>
      
      
      
    </div>
  )
}

export default Home
