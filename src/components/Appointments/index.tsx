import { useEffect, useState } from "react";
import './index.css';
import Header from "../Header";
import Cookies from "js-cookie";
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

interface Appointment {
    id: number;
    appointmentDate: string;
    appointmentTime: string;
    createdAt: string;
    status: string;
    patient: Patient;
}

const Appointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const token=Cookies.get("jwtToken");
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("https://healthcarebackendproject.onrender.com/appointments",{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "Content-Type":"application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Appointment[] = await response.json();
                console.log("Fetched Appointments:", data);  // Debugging line
                setAppointments(data);
            } catch (error: unknown) {
                console.log("Fetch Error:", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <>
        <Header/>
        <div className="appointment-bg">
            
            <h2 className="appointment-title">Appointments</h2>

            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <div className="appointment-con">
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                           
                            <th>Created At</th>
                            <th>Patient Name</th>
                            <th>Patient Age</th>
                            <th>Patient Gender</th>
                            <th>Patient Address</th>
                            <th>Status</th>
                            <th>Doctor Name</th>
                            <th>Doctor Specialization</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app) => (
                            <tr key={app.id}>
                                <td>{app.appointmentDate}</td>
                                <td>{app.appointmentTime}</td>
                               
                                <td>{new Date(app.createdAt).toLocaleString()}</td>
                                <td>{app.patient.name}</td>
                                <td>{app.patient.age}</td>
                                <td>{app.patient.gender}</td>
                                <td>{app.patient.address}</td>
                                <td className="status-app">{app.status}</td>
                                <td>{app.patient.doctor.firstName} {app.patient.doctor.lastName}</td>
                                <td>{app.patient.doctor.specialization}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
        </>
    );
};

export default Appointments;
