import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditDepartment() {
  const [data, setData] = useState({
    dept_name: '',
    budget: '',
    building: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${id}`)
      .then(res => {
        setData({
          ...data,
          dept_name: res.data.Result[0].dept_name,
          budget: res.data.Result[0].budget,
          building: res.data.Result[0].building,
        });
      })

      
      .catch(err => console.log(err));
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const decimalBudget = parseFloat(data.budget);

    setData({ ...data, budget: decimalBudget });

    axios.put(`http://localhost:8081/update/${data.dept_name}`, data)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/department');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Department</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='dept_name' className='form-label'>Department</label>
          <input
            type='text'
            className='form-control'
            id='dept_name'
            placeholder={data.dept_name}
            onChange={e => setData({ ...data, dept_name: e.target.value })}
            value={data.dept_name}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputBudget' className='form-label'>Budget</label>
          <input
            type='text'
            className='form-control'
            id='inputBudget'
            placeholder='Enter department'
            onChange={e => setData({ ...data, budget: e.target.value })}
            value={data.budget}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputBuilding' className='form-label'>Building</label>
          <input
            type='text'
            className='form-control'
            id='inputBuilding'
            placeholder='Enter building'
            onChange={e => setData({ ...data, building: e.target.value })}
            value={data.building}
          />
        </div>
        <div className='col-12 mb-3'>
          <button type='submit' className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditDepartment;
