// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Assuming you have a Login component
import SignUp from "./components/Signup"; // Import your SignUp component
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Patient from "./components/Patient";
import Billing from "./components/Billing";
import MedicalRecord from "./components/MedicalRecords";
import Appointments from "./components/Appointments";
import DoctorPatient from "./components/DoctorPatient";
import PatientMedicalRecord from "./components/PatientMedicalRecord";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./components/NotFound";
function App() {
  const token = Cookies.get("jwtToken");
  console.log("token", token);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route  path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/medicalrecord" element={<MedicalRecord />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/doctorpatient/:id" element={<DoctorPatient />} />
          
          
          <Route
            path="/patientmedicalrecord/:id"
            element={<PatientMedicalRecord />}
          />
          <Route path="*" element={<NotFound/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
