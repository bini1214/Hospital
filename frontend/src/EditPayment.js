import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
//import EditPatient from './EditPatient';

function EditPayment() {
const [data,setData]=useState({
    bi_id:'',
    p_id:'', 
    reason:'',
    amount:'',
   
})


const navigate=useNavigate();  
const {id}=useParams();


useEffect(() => {
    axios.get(`http://localhost:8081/get/payment/${bi_id}/${p_id}`)
      .then(res => {
        setData({
          ...data,
          bi_id: res.data.Result[0].bi_id,
          p_id: res.data.Result[0].p_id,
          reason: res.data.Result[0].reason,
          amount: res.data.Result[0].amount,
        });
      })
      .catch(err => {
        console.log("An error has occurred:");
        console.log(err);
      });
  }, [bi_id, p_id]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Convert the amount to a decimal
    const decimalAmount = parseFloat(data.amount);
  
    // Update the data state with the decimal amount
    setData({ ...data, amount: decimalAmount });
  
    axios.put(`http://localhost:8081/update/payment/${data.bi_id}/${data.p_id}`, data)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('payment');
        }
      })
      .catch(err => console.log(err));
  };
  


return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Payment</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="bi_id" className='form-label'>Payment_ID</label>
          <input
            type='text'
            className='form-control'
            id='bi_id'
            placeholder={data.bi_id}
            onChange={e => setData({ ...data, bi_id: e.target.value })}
            value={data.bi_id}
          />
        </div>

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
          <label htmlFor="inputFirstName" className='form-label'>Reason</label>
          <input
            type='text'
            className='form-control'
            id='inputFirstN'
            placeholder='inter payment reason'
            onChange={e => setData({ ...data, reason: e.target.value })}
            value={data.reason}
          />
        </div>


       
        <div className='col-12'>
          <label htmlFor="inputSalary" className='form-label'>Amount</label>
          <input
            type='number'
            step="0.01" 
            className='form-control'
            id='inputSalary'
            placeholder='Enter amount in Birr'
            onChange={e => setData({ ...data, amount: e.target.value })}
            value={data.amount}
          />
        </div>
        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
  
}

export default EditPayment
