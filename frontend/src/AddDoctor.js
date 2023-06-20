import axios from 'axios';
import React, { useState } from 'react'
import Doctor from './doctor/Doctor';
import { useNavigate } from 'react-router-dom';
// import multer from 

function AddDoctor() {
const [data,setData]=useState({
    doctID:'',
    fname:'',
    lname:'',
    address:'',
    email:'',
    password:'',
    dept_name:'',
    salary:''
})

const navigate=useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("doctID", data.doctID);
  formData.append("fname", data.fname);
  formData.append("lname", data.lname);
  formData.append("address", data.address);
  formData.append("dept_name", data.dept_name);
  formData.append("salary", data.salary);
  formData.append("email", data.email);
  formData.append("password", data.password);

  console.log("----------------+++++++++++++");
   // Accessing the value using get() method

  try {
    const res = await axios.post('http://localhost:8081/create', {


    
      doctID:data.doctID,
      fname:data.fname,
      lname:data.lname,
      address:data.address,
      dept_name:data.dept_name,
      salary:data.salary,
      email:data.email,
      password:data.password

  
    });
    navigate('/doctor');
    

    
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};









  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Doctor</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
      
        
        
      <div className='col-12'>
            <label htmlFor="docId" className='form-label'>ID</label>
            <input type='text' className='form-control' id='docId' placeholder='Enter Doctor ID'
            onChange={e=>setData({...data,doctID:e.target.value})} />

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
            <label htmlFor="inputDepart" className='form-label'>Department</label>
            <input type='text' className='form-control' id='inputDepart' placeholder='Enter Department'
           onChange={e=>setData({...data,dept_name:e.target.value})} />

        </div>
        <div className='col-12'>
            <label htmlFor="inputSalary" className='form-label'>Salary</label>
            <input type='decimal' step="0.01" className='form-control' id='inputSalary' placeholder='Enter per Month Salary'
           onChange={e=>setData({...data,salary:e.target.value})} />

        </div>

        <div className='col-12'>
            <label htmlFor="inputEmail4" className='form-label'>Email</label>
            <input type='email' className='form-control' id="inputEmail4" placeholder='Enter Email'autoComplete='off'
            onChange={e=>setData({...data,email:e.target.value})}/>

        </div>
        <div className='col-12'>
            <label htmlFor="inputPassword4" className='form-label'>Password</label>
            <input type='password' className='form-control' id='inputPassword4' placeholder='Enter Password'
            onChange={e=>setData({...data,password:e.target.value})}/>

        </div>
        <div className='col-12 mb-3'>  

            <button type='submit' className='btn btn-primary'>Create</button>

        </div>
        
     
      </form>
    </div>
  )
}

export default AddDoctor
