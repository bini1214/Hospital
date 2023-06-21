import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Assign() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getAssign')
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

  const handleDelete = (p_id,doctID,nr_id) => {
    axios.delete(`http://localhost:8081/delete/assing/${p_id}/${doctID}/${nr_id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch(err => {
        console.log("An error has occurred:");
        console.log(err);
      });
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Assign</h3>
      </div>
      <Link to="/dashC/createAssign" className='btn btn-success'>Add Assign</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Patient_ID</th>
              <th>Doctor_ID</th>
              <th>Nurse_ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the data here */}
            {data.map(assign => (
              <tr key={assign.p_id}>
                <td>{assign.doctID}</td>
                <td>{assign.nr_id}</td>
                <td>
                  <Link to={`/dashC/assignEdit/${assign.p_id}/${assign.doctID}/${assign.nr_id}`} className='btn btn-primary btn-sm me-2'>edit</Link>
                  <button onClick={() => handleDelete(assign.p_id, assign.doctID,assign.nr_id)} className='btn btn-sm btn-danger'>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assign;
