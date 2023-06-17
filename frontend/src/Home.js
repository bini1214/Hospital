import React from 'react'

function Home() {
  return (
    <div>
    <div className='p-3 d-flex justify-content-around'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'> 
      <div className='text-center pb-1'> 

      <p>Admin</p>
      <hr/>
      <p>Total:{}</p>
      </div>
      </div>


      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Doctor</p>
      <hr/>
      <p>Total:{}</p>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Nurse</p>
      <hr/>
      <p>Total:{}</p>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Triage</p>
      <hr/>
      <p>Total:{}</p>
      </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
      <div className='text-center pb-1'>

      <p>Reception</p>
      <hr/>
      <p>Total:{}</p>
      </div>
      </div> 

    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admin</h3>
      <table className='table'>
        <thead>
          <th>
          
            <th>Email</th>
            <th>Action</th>
          </th>
        </thead>
        <tbody>

        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home
