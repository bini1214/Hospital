// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Patient() {
//   const [data, setData] = useState([]);
 
//   useEffect(() => {
//     axios.get('http://localhost:8081/getPatient')
//       .then(res => {
//         if (res.data.Status === "Success") {
//           console.log(res.data.Result);
//           setData(res.data.Result);
//         } else {
//           alert("Error");
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);
  

//   //--------------------------------|-----------
//   const handleDelete=(id)=>{
//     axios.delete(`http://localhost:8081/delete/patient/${id}`)
// .then(res=>{
//   if(res.data.Status==="Success")
//   {
// window.location.reload(true);
//   }
//   else{

//     alert("Error");
//   }
// })
// .catch(err=>{
//   console.log("------------An error has occurred >>>>");
  
  
//   console.log(err)});
//   }
// //----------------------------------|---------- 
//   return (
//     <div className='px-5 py-3'>
//       <div className='d-flex justify-content-center'>
//         <h3>Patient List</h3>
//       </div>
//       <Link to="/createPatient" className='btn btn-success'>Add Patient</Link>
//       <div className='mt-3'>
//       <table className='table'>
//         <thead>
//           <tr>
//             <th>ID</th> 
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>City</th>
//             <th>DOB</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Render the data here */} 
// {
//   data.map((patient,index)=>{
// return <tr key={index}>
//   <td>{patient.p_id}</td>
//   <td>{patient.fname}</td> 
//   <td>{patient.lname}</td>
//   <td>{patient.address}</td>
//  <td>{patient.DOB}</td>
//   <td>
//     <Link to={`patientEdit/${patient.p_id}`} className='btn btn-primary btn-sm me-2'>edit</Link>
//     <button onClick={e=>handleDelete(patient.p_id)} className='btn btn-sm btn-danger'>delete</button>
//   </td>

// </tr>

//   })
// }

//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// }

// export default Patient;
