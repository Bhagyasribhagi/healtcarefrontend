import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import Header from "../Header";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string; 
}

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  gender: string;
  patients: Patient[];
}

const DoctorPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`https://healthcarebackendproject.onrender.com/doctor/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtToken")}`,
            "Content-Type": "application/json", 
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Doctor = await response.json();
        setDoctor(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctor();
  }, [id]);

  return (
    <>
      <Header />
      <div className="patient-doctor-bg">
        {doctor ? (
          <div>
            <h1 className="patient-doct-title">
              Doctor: <span className="span1"> {doctor.firstName} {doctor.lastName} </span> appointments
            </h1>
            {doctor.patients.length > 0 ? (
              <table className="patient-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {doctor.patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No appointments</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default DoctorPatient;
