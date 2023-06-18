import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

function EditDoctor() {
const [data,setData]=useState({
    doctID:'',
    fname:'', 
    lname:'',
    address:'',
    dept_name:'',
    salary:0
})


const navigate=useNavigate();
const {id}=useParams();


useEffect(()=>{
  
axios.get(`http://localhost:8081/get/${id}`)
.then(res => {
  console.log("----------data");
  
    setData({
      ...data,
      doctID: res.data.Result[0].doctID,
      fname: res.data.Result[0].fname,
      lname: res.data.Result[0].lname,
      address: res.data.Result[0].address,
      dept_name: res.data.Result[0].dept_name,
      salary: res.data.Result[0].salary
    });
  })
  
.catch(err=>console.log(err));

},[])


const handleSubmit = async (event) => {
  event.preventDefault();

  // Convert the salary to a decimal
  const decimalSalary = parseFloat(data.salary);

  // Update the data state with the decimal salary
  setData({ ...data, salary: decimalSalary });

  axios.put(`http://localhost:8081/update/${data.doctID}`, data)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/doctor');
      }
    })
    .catch(err => console.log(err));
};


//   try {
//     const res = await axios.post('http://localhost:8081/update',data {
//      doctID:data.doctID,
//       fname:data.fname,
//       lname:data.lname,
//       address:data.address,
//       dept_name:data.dept_name,
//       salary:data.salary,
//     });
//     navigate('/doctor');
    
// console.log(res);

//   }
//    catch (err) {console.log(err);
//   }
// };


return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Doctor</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="doctID" className='form-label'>ID</label>
          <input
            type='text'
            className='form-control'
            id='doctID'
            placeholder={data.doctId}
            onChange={e => setData({ ...data, doctID: e.target.value })}
            value={data.doctID}
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
          <label htmlFor="inputDepart" className='form-label'>Department</label>
          <input
            type='text'
            className='form-control'
            id='inputDepart'
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
            id='inputSalary'
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

export default EditDoctor
