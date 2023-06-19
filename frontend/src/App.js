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
//import Profiles from './Profiles';
import Department from './Department'
import AddDoctor from './AddDoctor';
import EditDoctor from './EditDoctor'
import Start from './Start';
import DoctorDetail from './DoctorDetail';
import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import NurseDetail from './NurseDetail';
import TriageDetail from './TriageDetail'
import TriageLogin from './TriageLogin';
import ReceptionLogin from './ReceptionLogin';
import ReceptionDetail from './ReceptionDetail';
import Dash from './Dash';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';
import AddNurse from './AddNurse';
import EditNurse from './EditNurse';
import AddTriage from './AddTriage'
import EditTriage from './EditTriage'
import AddReception from './AddReception'
import EditReception from './EditReception'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
      <Route path='/' element={<Home/>}></Route>
      <Route path="/" element={<Dashboard />} >
        
      <Route path='/dash' element={<Dash/>}></Route>
          <Route path='/doctor' element={<Doctor/>}></Route>
          
          <Route path='/reception' element={<Reception/>}></Route>
          <Route path='/triage' element={<Triage/>}></Route>
          <Route path='/department' element={<Department/>}></Route>
          <Route path='/nurse' element={<Nurse/>}></Route>
          <Route path='/create' element={<AddDoctor/>}></Route>
          <Route path='/createe' element={<AddDepartment/>}></Route>
          <Route path='/createNurse' element={<AddNurse/>}></Route>
          <Route path='/createTriage' element={<AddTriage/>}></Route>
          <Route path='/createReception' element={<AddReception/>}></Route>

          <Route path='/departmentEdit/:id' element={<EditDepartment/>}></Route>

          <Route path='/nurseEdit/:id' element={<EditNurse/>}></Route>
          <Route path='/triageEdit/:id' element={<EditTriage/>}></Route>
          <Route path='/receptionEdit/:id' element={<EditReception/>}></Route>

          <Route path='/doctorEdit/:id' element={<EditDoctor/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/start" element={<Start/>} ></Route>
        <Route path="/doctorDetail" element={<DoctorDetail/>} ></Route>
        <Route path="/doctorLogin" element={<DoctorLogin/>} ></Route>
        <Route path="/nurseLogin" element={<NurseLogin/>} ></Route>
        <Route path="/nurseDetail" element={<NurseDetail/>} ></Route>
        <Route path="/triageLogin" element={<TriageLogin/>} ></Route>
        <Route path="/triageDetail" element={<TriageDetail/>} ></Route>
        <Route path="/receptionLogin" element={<ReceptionLogin/>} ></Route>
        <Route path="/receptionDetail" element={<ReceptionDetail/>} ></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
