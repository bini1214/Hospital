import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

import Doctor from "./Doctor";

import Reception from "./Reception";
import Triage from "./Triage";
import Nurse from "./Nurse";
import Home from "./Home";
//import Profiles from './Profiles';
import Department from "./Department";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import Start from "./Start";
import DoctorDetail from "./DoctorDetail";
import DoctorLogin from "./DoctorLogin";
import NurseLogin from "./NurseLogin";
import NurseDetail from "./NurseDetail";
import TriageDetail from "./TriageDetail";
import TriageLogin from "./TriageLogin";
import ReceptionLogin from "./ReceptionLogin";
import ReceptionDetail from "./ReceptionDetail";
import Dash from "./Dash";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import AddNurse from "./AddNurse";
import EditNurse from "./EditNurse";
import AddTriage from "./AddTriage";
import EditTriage from "./EditTriage";
import AddReception from "./AddReception";
import EditReception from "./EditReception";
import DashA from "./DashA";
import DashB from "./DashB";
import DashC from "./DashC";
import DashD from "./DashD";
import Patient from "./Patient";
import DashAA from "./DashAA";
import DashBB from "./DashBB";
import DashCC from "./DashCC";
import DashDD from "./DashDD";
import Payment from "./Payment";
import Appointment from "./Appointment";
import Test from "./Test";
import Bed from "./Bed";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import AddPayment from "./AddPayment";
import EditPayment from "./EditPayment";
import AddAssign from "./AddAssign";
import EditAssign from "./EditAssign";
import Assign from "./Assign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/" element={<Dashboard />}>
          <Route path="/dash" element={<Dash />}></Route>

          <Route path="/doctor" element={<Doctor />}></Route>

          <Route path="/reception" element={<Reception />}></Route>
          <Route path="/triage" element={<Triage />}></Route>
          <Route path="/department" element={<Department />}></Route>
          <Route path="/nurse" element={<Nurse />}></Route>
          <Route path="/create" element={<AddDoctor />}></Route>
          <Route path="/createe" element={<AddDepartment />}></Route>
          <Route path="/createNurse" element={<AddNurse />}></Route>
          <Route path="/createTriage" element={<AddTriage />}></Route>
          <Route path="/createReception" element={<AddReception />}></Route>

          <Route
            path="/departmentEdit/:id"
            element={<EditDepartment />}
          ></Route>

          <Route path="/nurseEdit/:id" element={<EditNurse />}></Route>
          <Route path="/triageEdit/:id" element={<EditTriage />}></Route>
          <Route path="/receptionEdit/:id" element={<EditReception />}></Route>

          <Route path="/doctorEdit/:id" element={<EditDoctor />}></Route>
        </Route>

        {/* for doctor Authorization */}

        <Route path="/dashA" element={<DashA />}>
          <Route path="da" element={<DashAA />}></Route>
          <Route path="doctorDetail" element={<DoctorDetail />}></Route>
          <Route path="appointment" element={<Appointment />}></Route>
        </Route>






        {/* for Reception Authorization */}
        <Route path="/dashB" exact element={<DashB />}>
  <Route path="daB" element={<DashBB />} />
  <Route path="receptionDetail" element={<ReceptionDetail />} />
  <Route path="payment" element={<Payment />} />

  <Route path="createPayment" element={<AddPayment />}></Route>
  {/* <Route path="paymentEdit/:bi_id/:p_id" element={<EditPayment />}></Route> */}
  <Route path="createPatient" exact element={<AddPatient />} />

  <Route path="patient" element={<Patient />}>

   

  </Route>
  <Route path="createPatient" exact element={<AddPatient />} />
  <Route path="patient" exact element={<Patient />} />

  <Route path="paymentEdit/:id/:pay_id" element={<EditPayment />} />
</Route>

        



      

        {/* for triage Authorization */}

        <Route path="/dashC" element={<DashC />}>
          <Route path="daC" element={<DashCC />}></Route>

          <Route path="createAssign" element={<AddAssign />}></Route>
          <Route path="triageDetail" element={<triageDetail />}></Route>
          <Route path="assign" element={<Assign/>}></Route>
          <Route path="assignEdit/:id" element={<EditAssign/>}></Route>
        </Route>








        {/* for Nurse Authorization */}

        <Route path="/dashD" element={<DashD />}>
          <Route path="daD" element={<DashDD />}></Route>
          
          <Route path="nurseDetail" element={<nurseDetail />}></Route>
          <Route path="test" element={<Test />}></Route>
          <Route path="bed" element={<Bed />}></Route>
        </Route>










        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/doctorDetail" element={<DoctorDetail />}></Route>

        <Route path="/doctorLogin" element={<DoctorLogin />}></Route>
        <Route path="/nurseLogin" element={<NurseLogin />}></Route>
        <Route path="/nurseDetail" element={<NurseDetail />}></Route>
        <Route path="/triageLogin" element={<TriageLogin />}></Route>
        <Route path="/triageDetail" element={<TriageDetail />}></Route>
        <Route path="/receptionLogin" element={<ReceptionLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
