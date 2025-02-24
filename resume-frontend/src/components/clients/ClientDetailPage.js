import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/clientdetail.css';

œ
const dummyClients = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" }
];

const dummyCases = [
    { id: 101, clientId: 1, title: "Immigration Appeal", status: "Open" },
    { id: 102, clientId: 1, title: "Green Card Renewal", status: "Closed" },
    { id: 201, clientId: 2, title: "Work Visa Application", status: "Pending" }
];

const ClientDetailPage = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        // Fetch client details
        const foundClient = dummyClients.find(client => client.id === parseInt(clientId));
        setClient(foundClient);

        // Fetch cases for the client
        const clientCases = dummyCases.filter(caseItem => caseItem.clientId === parseInt(clientId));
        setCases(clientCases);
    }, [clientId]);

    if (!client) {
        return <div className="loading">Loading client details...</div>;
    }

    return (
        <div className="client-detail-page">
            <nav className="navbar">
                <h1>Client Details</h1>
            </nav>
            <div className="client-info">
                <h2>{client.name}</h2>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Phone:</strong> {client.phone}</p>
            </div>
            <div className="client-cases">
                <h3>Cases</h3>
                {cases.length > 0 ? (
                    <ul>
                        {cases.map(caseItem => (
                            <li key={caseItem.id}>
                                <Link to={`/cases/${caseItem.id}`}>{caseItem.title}</Link> - <span>{caseItem.status}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cases found for this client.</p>
                )}
            </div>
            <Link to="/" className="back-button">Back to Clients List</Link>
        </div>
    );
};

export default ClientDetailPage;
