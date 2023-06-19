import axios from 'axios';
import React, { useState } from 'react'
import Department from './Department'
import { useNavigate } from 'react-router-dom';
// import multer from 

function AddDepartment() {
const [data,setData]=useState({
    dept_name:'',
    budget:'',
    building:'',

})

const navigate=useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("dept_name", data.dept_name);
  formData.append("budget", data.budget);
  formData.append("building", data.building);
  

  console.log("----------------+++++++++++++");
   // Accessing the value using get() method

  try {
    const res = await axios.post('http://localhost:8081/createe', {


    
      dept_name:data.dept_name,
      budget:data.budget,
      building:data.building,
      
    });
    navigate('/department');
    

    
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};









  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Department</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
      
        
        
      <div className='col-12'>
            <label htmlFor="dept_name" className='form-label'>Department</label>
            <input type='text' className='form-control' id='dept_name' placeholder='Enter department name'
            onChange={e=>setData({...data,dept_name:e.target.value})} />

        </div>

        <div className='col-12'>
            <label htmlFor="inputDepartment" className='form-label'>Budget</label>
            <input type='decimal' step="0.01" className='form-control' id='inputBudget' placeholder='Enter Budget'
           onChange={e=>setData({...data,budget:e.target.value})} />

        </div>



        <div className='col-12'>
            <label htmlFor="inputBuilding" className='form-label'>Building</label>
            <input type='text' className='form-control' id='inputBuilding' placeholder='Enter Building'
           onChange={e=>setData({...data,building:e.target.value})} />

        </div>
       
    
        <div className='col-12 mb-3'>  

            <button type='submit' className='btn btn-primary'>Create</button>

        </div>
        
     
      </form>
    </div>
  )
}

export default AddDepartment
