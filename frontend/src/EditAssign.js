import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditAssign() {
  const [data, setData] = useState({
    p_id: '',
    doctID: '',
    nr_id: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/get/assign/${id}`)
      .then(res => {
        setData({
          ...data,
          p_id: res.data.Result[0].p_id,
          doctID: res.data.Result[0].doctID,
          nr_id: res.data.Result[0].nr_id,
        });
      })
      .catch(err => {
        console.log("An error has occurred:");
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8081/update/assign/${id}`, data)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/assign');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Assign</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="p_id" className='form-label'>Patient_ID</label>
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
          <label htmlFor="doctID" className='form-label'>Doctor_ID</label>
          <input
            type='text'
            className='form-control'
            id='doctID'
            placeholder={data.doctID}
            onChange={e => setData({ ...data, doctID: e.target.value })}
            value={data.doctID}
          />
        </div>

        <div className='col-12'>
          <label htmlFor="inputFirstName" className='form-label'>Nurse_ID</label>
          <input
            type='text'
            className='form-control'
            id='inputFirstN'
            placeholder='Enter nurse ID'
            onChange={e => setData({ ...data, nr_id: e.target.value })}
            value={data.nr_id}
          />
        </div>

        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditAssign;
