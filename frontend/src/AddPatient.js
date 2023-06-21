import axios from 'axios';
import React, { useState } from 'react'
//import Doctor from './Doctor';
import { useNavigate } from 'react-router-dom';
// import multer from 

function AddPatient() {
const [data,setData]=useState({
    p_id:'',
    fname:'',
    lname:'',
    address:'', 
    DOB:''
   
})

const navigate=useNavigate();
  
const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("p_id", data.p_id);
  formData.append("fname", data.fname); 
  formData.append("lname", data.lname);
  formData.append("address", data.address);
  formData.append("dept_name", data.DOB);

  console.log("----------------+++++++++++++");
   // Accessing the value using get() method

  try {
    const res = await axios.post('http://localhost:8081/createPatient', {


    
      p_id:data.p_id,
      fname:data.fname,
      lname:data.lname,
      address:data.address,
      DOB:data.DOB,
    
    });
    navigate('/dashB/patient');
    

    
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};









  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Patient</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
      
        
        
      <div className='col-12'>
            <label htmlFor="p_id" className='form-label'>ID</label>
            <input type='text' className='form-control' id='p_id' placeholder='Enter patient ID'
            onChange={e=>setData({...data,p_id:e.target.value})} />

        </div>

      <div className='col-12'>
            <label htmlFor="inputFirstName" className='form-label'>First Name</label>
            <input type='text' className='form-control' id='inputFirstName' placeholder='Enter First Name'
           onChange={e=>setData({...data,fname:e.target.value})} />

        </div>
        <div className='col-12'>
            <label htmlFor="inputLastName" className='form-label'>Last Name</label>
            <input type='text' className='form-control' id='inputLastName' placeholder='Enter Last Name'
           onChange={e=>setData({...data,lname:e.target.value})} />

        </div>  
        <div className='col-12'>
            <label htmlFor="inputAddress" className='form-label'>Address</label>
            <input type='text' className='form-control' id='inputAddress' placeholder='City'
            onChange={e=>setData({...data,address:e.target.value})}/>
          </div>
          <div className='col-12'>
            <label htmlFor="inputDepart" className='form-label'>DOB</label>
            <input type='text' className='form-control' id='inputDepart' placeholder='Enter date of birth'
           onChange={e=>setData({...data,DOB:e.target.value})} />

        </div>
       

        
        
        <div className='col-12 mb-3'>  

            <button type='submit' className='btn btn-primary'>Create</button>

        </div>
        
     
      </form>
    </div>
  )
}

export default AddPatient
