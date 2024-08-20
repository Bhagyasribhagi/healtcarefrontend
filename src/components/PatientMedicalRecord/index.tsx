import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './index.css';
import Cookies from "js-cookie";
import Header from "../Header";

interface MedicalRecord {
    id: number;
    recordDate: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
}

interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    specialization: string;
    gender: string;
}

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    medicalRecords: MedicalRecord[];
    doctor: Doctor;
}

const PatientMedicalRecord: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
   // const [isDoctorDetailsOpen, setIsDoctorDetailsOpen] = useState(false);

    const fetchPatientData = async () => {
        try {
            const response = await fetch(`https://healthcarebackendproject.onrender.com/patient/${id}`,{
                method: "GET",
          headers: {
            "Authorization": `Bearer ${Cookies.get("jwtToken")}`, // Add the Bearer token here
            "Content-Type": "application/json", // Ensure the request is sent as JSON
          },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: Patient = await response.json();
            setPatient(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatientData();
    }, [id]);

    
    if (!patient) return <div>Loading...</div>;

    return (
        <><Header/>
        <div className="medical-records">
            
            <h1 className="med-rec"><span className="pat-name">{patient.name}'s</span> Medical Records</h1>

            <div className="records-container">
                <h2 className="medical-record-title">Medical Records</h2>
                {patient.medicalRecords.length === 0 ? (
                    <div className="no-records">No records found</div>
                ) : (
                    <table className="records-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Diagnosis</th>
                                <th>Treatment</th>
                                <th>Prescription</th>
                                <th>Specialist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.medicalRecords.map(record => (
                                <tr key={record.id}>
                                    <td>{record.recordDate}</td>
                                    <td>{record.diagnosis}</td>
                                    <td>{record.treatment}</td>
                                    <td>{record.prescription}</td>
                                    <td>{patient.doctor.firstName} {patient.doctor.lastName} {patient.doctor.specialization} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            
        </div>
        </>
    );
};

export default PatientMedicalRecord;
