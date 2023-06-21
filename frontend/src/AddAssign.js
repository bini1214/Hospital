import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAssign() {
  const [data, setData] = useState({
    p_id: '',
    doctID: '',
    nr_id: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!data.p_id || !data.doctID || !data.nr_id) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/createAssign', data);
      if (response.data.Status === 'Success') {
    console.log('-------------Here-------------');
        navigate('/dashC/assign');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Assign</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='p_id' className='form-label'>
            Patient_ID
          </label>
          <input
            type='text'
            className='form-control'
            id='p_id'
            placeholder='Enter Patient ID'
            value={data.p_id}
            onChange={(e) => setData({ ...data, p_id: e.target.value })}
          />
        </div>


        <div className='col-12'>
          <label htmlFor='inputFirstName' className='form-label'>
            Doctor ID
          </label>
          <input
            type='text'
            className='form-control'
            id='inputFirstName'
            placeholder='Enter Doctor ID'
            value={data.doctID}
            onChange={(e) => setData({ ...data, doctID: e.target.value })}
          />
        </div>

        <div className='col-12'>
          <label htmlFor='inputLastName' className='form-label'>
            Nurse_ID
          </label>
          <input
            type='text'
            className='form-control'
            id='inputLastName'
            placeholder='Enter Nurse ID'
            value={data.nr_id}
            onChange={(e) => setData({ ...data, nr_id: e.target.value })}
          />
        </div>
        
        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAssign;
