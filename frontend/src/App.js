import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Doctor from './Doctor'

import Reception from './Reception'
import Triage from './Triage'
import Nurse from './Nurse'
import Home from './Home'
import Profiles from './Profiles';
import Department from './Department'
import AddDoctor from './AddDoctor';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/" element={<Dashboard />} >
          <Route path='/doctor' element={<Doctor/>}></Route>
          <Route path='/profiles' element={<Profiles/>}></Route>
          <Route path='/reception' element={<Reception/>}></Route>
          <Route path='/triage' element={<Triage/>}></Route>
          <Route path='/department' element={<Department/>}></Route>
          <Route path='/nurse' element={<Nurse/>}></Route>
          <Route path='/create' element={<AddDoctor/>}></Route>
        </Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
