import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

function EditTriage() {
const [data,setData]=useState({
    tr_id:'',
    fname:'', 
    lname:'',
    address:'',
    salary:0
})


const navigate=useNavigate();  
const {id}=useParams();


useEffect(() => {
  axios.get(`http://localhost:8081/get/triage/${id}`)
    .then(res => {
      setData({
        ...data,
        tr_id: res.data.Result[0].tr_id,
        fname: res.data.Result[0].fname,
        lname: res.data.Result[0].lname,
        address: res.data.Result[0].address,
        salary: res.data.Result[0].salary,
        
      });
    })
  
.catch(err=>console.log(err));

},[]);


const handleSubmit = async (event) => {
  event.preventDefault();

  // Convert the salary to a decimal
  const decimalSalary = parseFloat(data.salary);

  // Update the data state with the decimal salary
  setData({ ...data, salary: decimalSalary });

  axios.put(`http://localhost:8081/update/triage/${data.tr_id}`, data)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/triage');
      }
    })
    .catch(err => console.log(err));
};




return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Triage</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="tr_id" className='form-label'>ID</label>
          <input
            type='text'
            className='form-control'
            id='tr_id'
            placeholder={data.tr_id}
            onChange={e => setData({ ...data, tr_id: e.target.value })}
            value={data.tr_id}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inirstName" className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='inirstName'
            placeholder='Enter First Name'
            onChange={e => setData({ ...data, fname: e.target.value })}
            value={data.fname}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="putLastName" className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='putLastName'
            placeholder='Enter Last Name'
            onChange={e => setData({ ...data, lname: e.target.value })}
            value={data.lname}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="utAddress" className='form-label'>Address</label>
          <input
            type='text'
            className='form-control'
            id='utAddress'
            placeholder='City'
            onChange={e => setData({ ...data, address: e.target.value })}
            value={data.address}
          />
        </div>
        
        <div className='col-12'>
          <label htmlFor="inputSala" className='form-label'>Salary</label>
          <input
            type='number'
            step="0.01" 
            className='form-control'
            id='inputSala'
            placeholder='Enter per Month Salary'
            onChange={e => setData({ ...data, salary: e.target.value })}
            value={data.salary}
          />
        </div>
        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
  
}

export default EditTriage
