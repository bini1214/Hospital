import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPayment() {
  const [data, setData] = useState({
    bi_id: '',
    p_id: '',
    reason: '',
    amount: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!data.bi_id || !data.p_id || !data.reason || !data.amount) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/createPayment', data);
      if (response.data.Status === 'Success') {
        navigate('/dashB/payment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Payment</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='bi_id' className='form-label'>
            Payment ID
          </label>
          <input
            type='text'
            className='form-control'
            id='bi_id'
            placeholder='Enter Payment ID'
            value={data.bi_id}
            onChange={(e) => setData({ ...data, bi_id: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputFirstName' className='form-label'>
            Patient ID
          </label>
          <input
            type='text'
            className='form-control'
            id='inputFirstName'
            placeholder='Enter Patient ID'
            value={data.p_id}
            onChange={(e) => setData({ ...data, p_id: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputLastName' className='form-label'>
            Reason
          </label>
          <input
            type='text'
            className='form-control'
            id='inputLastName'
            placeholder='Enter Reason of Payment'
            value={data.reason}
            onChange={(e) => setData({ ...data, reason: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputSalary' className='form-label'>
            Amount
          </label>
          <input
            type='number'
            step='0.01'
            className='form-control'
            id='inputSalary'
            placeholder='Enter Amount'
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
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

export default AddPayment;
