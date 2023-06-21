import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
  
function Payment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getPayment')
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

  const handleDelete = (bi_id, p_id) => {
    axios.delete(`http://localhost:8081/delete/payment/${bi_id}/${p_id}`)
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
        <h3>Payment</h3>
      </div>
      <Link to="/dashB/createPayment" className='btn btn-success'>Add Payment</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Payment_ID</th>
              <th>Patient_ID</th>
              <th>Payment_Reason</th>
              <th>Amount</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {/* Render the data here */}
            {data.map(payment => (
              <tr key={payment.payment_id}>
                <td>{payment.bi_id}</td>
                <td>{payment.p_id}</td>
                <td>{payment.reason}</td>
                <td>{payment.amount}</td>
                <td>
                  {/* <Link to={`/dashB/paymentEdit/${payment.bi_id}/${payment.p_id}`} className='btn btn-primary btn-sm me-2'>edit</Link> */}
                  {/* <button onClick={() => handleDelete(payment.bi_id, payment.p_id)} className='btn btn-sm btn-danger'>delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payment;
