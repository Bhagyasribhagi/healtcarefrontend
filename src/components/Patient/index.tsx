import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import Header from "../Header";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
}

const Patient: React.FC = () => {
    const token = Cookies.get("jwtToken");
    const [patients, setPatients] = useState<Patient[]>([]);
    const [newPatient, setNewPatient] = useState<Partial<Patient>>({
        name: '',
        age: 0,
        gender: '',
        address: ''
    });
    const [selectedPatient, setSelectedPatient] = useState<Partial<Patient> | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchPatients = async () => {
        try {
            const response = await fetch("https://healthcarebackendproject.onrender.com/patients", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: Patient[] = await response.json();
            setPatients(data);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = (patient: Patient) => {
        setSelectedPatient(patient);
        setNewPatient({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            address: patient.address
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            const method = selectedPatient?.id ? 'PUT' : 'POST';
            const url = selectedPatient?.id
                ? `https://healthcarebackendproject.onrender.com/update_patient/${selectedPatient.id}`
                : `https://healthcarebackendproject.onrender.com/add_patient`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwtToken")}`
                },
                body: JSON.stringify(newPatient)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Refresh the patient list
            fetchPatients();
            // Close the modal
            setShowModal(false);
            setSelectedPatient(null); // Reset selected patient
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const handleDeleteClick = async (patient: Patient) => {
        try {
            const response = await fetch(`https://healthcarebackendproject.onrender.com/patient/${patient.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Remove the deleted patient from the list
            setPatients(patients.filter(p => p.id !== patient.id));
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return (
        <><Header />
        <div className="patient-bg">
            
            <div className="patient-cart">
                <h1 className="patient-title">Patients details</h1>
                <button type="button" className="add-patient" onClick={() => setShowModal(true)}>
                    Add Patient
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="input-p"
                                name="name"
                                placeholder="Name"
                                value={newPatient.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                className="input-p"
                                name="age"
                                placeholder="Age"
                                value={newPatient.age}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                className="input-p"
                                name="gender"
                                placeholder="Gender"
                                value={newPatient.gender}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                className="input-p"
                                name="address"
                                placeholder="Address"
                                value={newPatient.address}
                                onChange={handleInputChange}
                                required
                            />

                            <button type="submit" className="submit-pa">Submit</button>
                            <button type="button" onClick={() => setShowModal(false)} className="cancel-pa">Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Medical Records</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>
                                <Link to={`/patientmedicalrecord/${patient.id}`}><FontAwesomeIcon icon={faArrowRight} /></Link>
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(patient)}  className="edit-patient">
                                    <FaUserEdit />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(patient)}  className="edit-patient">
                                    <RiDeleteBin6Line />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Patient;
