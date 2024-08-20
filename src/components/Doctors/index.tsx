import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import Cookies from 'js-cookie';
import Header from "../Header";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;  // Fixed typo
}

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  gender: string;
  imageUrl: string;
  patients: Patient[];
}

const Doctors: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = Cookies.get("jwtToken"); // Assuming you store the token under "jwtToken"
        console.log(token);
        const response = await fetch("https://healthcarebackendproject.onrender.com/doctors", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Add the Bearer token here
            "Content-Type": "application/json", // Ensure the request is sent as JSON
          },
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data: Doctor[] = await response.json();
        setDoctor(data);
      } catch (error: unknown) {
        console.log(error);
      }
    };
  
    fetchDoctor();
  }, []);
  

  return (
    <>
     <Header/>
    <div className="doctor-bg">
     
      <h1 className="doctor-title">Doctors with their appointments</h1>
      
      <ul>
        {doctor.map((doc) => (
          <li key={doc.id}>
            <div className="doctor-img">
              <img src={doc.imageUrl} alt="img-doctor" className="doc-img" />
            </div>
            <h3 className="doctor-name">{doc.firstName} {doc.lastName}</h3>
            <p className="spec">Specialization: {doc.specialization}</p>
            <p className="gender">Gender: {doc.gender}</p>
            <Link to={`/doctorpatient/${doc.id}`} className="doc-patient" >
              Appointments <FontAwesomeIcon icon={faCalendarCheck} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Doctors;
