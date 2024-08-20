import { useState, useEffect } from "react";
import './index.css';
import Cookies from "js-cookie";
import Header from "../Header";

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
}

interface Billing {
    id: number;
    amount: string;
    paymentDate: string;
    status: string;
    patient: Patient; // Assuming each billing entry is associated with one patient
}

const Billing: React.FC = () => {
    const [billing, setBilling] = useState<Billing[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await fetch("https://healthcarebackendproject.onrender.com/billings",{
                    method: "GET",
          headers: {
            "Authorization": `Bearer ${Cookies.get("jwtToken")}`, // Add the Bearer token here
            "Content-Type": "application/json", // Ensure the request is sent as JSON
          },
                });
                if (!response.ok) {
                    throw new Error("Network not ok");
                }
                const data: Billing[] = await response.json();
                console.log(data);
                setBilling(data);
            } catch (error: unknown) {
                console.log(error);
            }
        };
        fetchBillingData();
    }, []);

    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <> <Header/>
        <div className="billing-bg">
           
            <hr/>
            <h1 className="bill-title">Patient's Bill Details</h1>
            <div className="bill-cart">
            <ul>
                {billing.map((bill, index) => (
                    <li key={bill.id} className="billing-item">
                        <div className="billing-info">
                            <h1 className="bill-amount">Amount: {bill.amount}</h1>
                            <h2 className="bill-payment">Payment Date: {bill.paymentDate}</h2>
                            <h3 className="bill-status">Status: {bill.status}</h3>
                            <button 
                                className="toggle-button" 
                                onClick={() => toggleDropdown(index)}
                            >
                                {openIndex === index ? "Hide Patient Details" : "Show Patient Details"}
                            </button>
                        </div>

                        {openIndex === index && bill.patient && (
                            <div className="patient-details-dropdown">
                                <h4>Patient Details:</h4>
                                <p>Name: {bill.patient.name}</p>
                                <p>Age: {bill.patient.age}</p>
                                <p>Gender: {bill.patient.gender}</p>
                                <p>Address: {bill.patient.address}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        </div>
        </>
    );
};

export default Billing;
