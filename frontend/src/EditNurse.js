import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

function EditNurse() {
const [data,setData]=useState({
    nr_id:'',
    fname:'', 
    lname:'',
    address:'',
    dept_name:'',
    salary:0
})


const navigate=useNavigate();
const {id}=useParams();


useEffect(() => {
  axios.get(`http://localhost:8081/get/nurse/${id}`)
    .then(res => {
      setData({
        ...data,
        nr_id: res.data.Result[0].nr_id,
        fname: res.data.Result[0].fname,
        lname: res.data.Result[0].lname,
        address: res.data.Result[0].address,
        dept_name: res.data.Result[0].dept_name,
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

  axios.put(`http://localhost:8081/update/nurse/${data.nr_id}`, data)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/nurse');
      }
    })
    .catch(err => console.log(err));
};



return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Nurse</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="nr_id" className='form-label'>ID</label>
          <input
            type='text'
            className='form-control'
            id='nr_id'
            placeholder={data.nr_id}
            onChange={e => setData({ ...data, nr_id: e.target.value })}
            value={data.nr_id}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputFirstName" className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='inp'
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
            id='inputLa'
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
            id='inputs'
            placeholder='City'
            onChange={e => setData({ ...data, address: e.target.value })}
            value={data.address}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputDepart" className='form-label'>Department</label>
          <input
            type='text'
            className='form-control'
            id='inppt'
            placeholder='Enter Department'
            onChange={e => setData({ ...data, dept_name: e.target.value })}
            value={data.dept_name}
          />
        </div>
        <div className='col-12'>
          <label htmlFor="inputSalary" className='form-label'>Salary</label>
          <input
            type='number'
            step="0.01" 
            className='form-control'
            id='inputry'
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

export default EditNurse
