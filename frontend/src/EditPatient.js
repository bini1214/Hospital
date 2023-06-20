import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

function EditPatient() {
const [data,setData]=useState({
    p_id:'',
    fname:'', 
    lname:'',
    address:'',
    DOB:''
    
})


const navigate=useNavigate();  
const {id}=useParams();


useEffect(() => {
  axios.get(`http://localhost:8081/get/patient/${id}`)
    .then(res => {
      setData({
        ...data,
        p_id: res.data.Result[0].p_id,
        fname: res.data.Result[0].fname,
        lname: res.data.Result[0].lname,
        address: res.data.Result[0].address,
        DOB: res.data.Result[0].DOB,
       
        
      });
    })
  
.catch(err=>console.log(err));

},[]);


const handleSubmit = async (event) => {
  event.preventDefault();

  // Convert the salary to a decimal
  //const decimalSalary = parseFloat(data.salary);

  // Update the data state with the decimal salary
  //setData({ ...data, salary: decimalSalary });

  axios.put(`http://localhost:8081/update/patient/${data.p_id}`, data)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('patient');
      }
    })
    .catch(err => console.log(err));
};




return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Patient</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="p_id" className='form-label'>ID</label>
          <input
            type='text'
            className='form-control'
            id='p_id'
            placeholder={data.p_id}
            onChange={e => setData({ ...data, p_id: e.target.value })}
            value={data.p_id}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputFirstName" className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='inputFirstName'
            placeholder='Enter First Name'
            onChange={e => setData({ ...data, fname: e.target.value })}
            value={data.fname}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputLastName" className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='inputLastName'
            placeholder='Enter Last Name'
            onChange={e => setData({ ...data, lname: e.target.value })}
            value={data.lname}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputAddress" className='form-label'>Address</label>
          <input
            type='text'
            className='form-control'
            id='inputAddress'
            placeholder='City'
            onChange={e => setData({ ...data, address: e.target.value })}
            value={data.address}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputDepart" className='form-label'>DOB</label>
          <input
            type='text'
            className='form-control'
            id='inputDepart'
            placeholder='Enter date of birth'
            onChange={e => setData({ ...data, DOB: e.target.value })}
            value={data.DOB}
          />
        </div>
        
        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
  
}

export default EditPatient
