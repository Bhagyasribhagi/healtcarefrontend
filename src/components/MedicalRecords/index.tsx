import { useEffect, useState } from "react";
import './index.css';
import Cookies from "js-cookie";
import Header from "../Header";

interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
    gender: string;
}

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    doctor: Doctor;
}

interface MedicalRecord {
    id: number;
    recordDate: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
    patient: Patient | null;
}

const MedicalRecords: React.FC = () => {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const response = await fetch("https://healthcarebackendproject.onrender.com/medical_records",{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("jwtToken")}`,
                        "Content-Type":"application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: MedicalRecord[] = await response.json();
                setMedicalRecords(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchMedicalRecords();
    }, []);

    return (
        <>
        <Header/>
        <div className="medical-bg">
           
            <hr/>
            <h1 className="medical-title">All Patients Medical Records</h1>
            <div className="table-scrollable">
                <table className="medical-records-table">
                    <thead>
                        <tr>
                            <th>Diagnosis</th>
                            <th>Treatment</th>
                            <th>Prescription</th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Doctor Name</th>
                            <th>Specialization</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecords.map((record) => (
                            <tr key={record.id}>
                                <td>{record.diagnosis}</td>
                                <td>{record.treatment}</td>
                                <td>{record.prescription}</td>
                                {record.patient ? (
                                    <>
                                        <td>{record.patient.name}</td>
                                        <td>{record.patient.age}</td>
                                        <td>{record.patient.gender}</td>
                                        <td>{record.patient.address}</td>
                                        <td>{record.patient.doctor.firstName} {record.patient.doctor.lastName}</td>
                                        <td>{record.patient.doctor.specialization}</td>
                                    </>
                                ) : (
                                    <td colSpan={6} className="no-patient">No patient information available</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
    
    
}

export default MedicalRecords;
