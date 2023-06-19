import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Doctor() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8081/getDoctor')
      .then(res => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  

  //--------------------------------|-----------
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:8081/delete/doctor/${id}`)
.then(res=>{
  if(res.data.Status==="Success")
  {
window.location.reload(true);
  }
  else{

    alert("Error");
  }
})
.catch(err=>{
  console.log("------------An error has occurred >>>>");
  
  
  console.log(err)});
  }
//----------------------------------|----------
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Doctor List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Doctor</Link>
      <div className='mt-3'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the data here */} 
{
  data.map((doctor,index)=>{
return <tr key={index}>
  <td>{doctor.doctID}</td>
  <td>{doctor.fname}</td> 
  <td>{doctor.lname}</td>
  <td>{doctor.address}</td>
  <td>{doctor.dept_name}</td>
  <td>{doctor.salary}</td>
  <td>
    <Link to={`/doctorEdit/${doctor.doctID}`} className='btn btn-primary btn-sm me-2'>edit</Link>
    <button onClick={e=>handleDelete(doctor.doctID)} className='btn btn-sm btn-danger'>delete</button>
  </td>

</tr>

  })
}

        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Doctor;
