import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Department() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:8081/getDepartment')
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
    axios.delete(`http://localhost:8081/delete/${id}`)
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
        <h3>Department List</h3>
      </div>
      <Link to="/createe" className='btn btn-success'>Add Department</Link>
      <div className='mt-3'>
      <table className='table'>
        <thead>
          <tr>
            <th>Department</th>
            <th>Budget</th>
            <th>Building</th>

          </tr>
        </thead>
        <tbody>
          {/* Render the data here */} 
{
  data.map((department,index)=>{
return <tr key={index}>
  <td>{department.dept_name}</td>
  <td>{department.budget}</td> 
  <td>{department.building}</td>
 
  <td>
    <Link to={`/departmentEdit/${department.dept_name}`} className='btn btn-primary btn-sm me-2'>edit</Link>
    <button onClick={e=>handleDelete(department.dept_name)} className='btn btn-sm btn-danger'>delete</button>
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

export default Department;
