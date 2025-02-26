import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import casesService from '../../services/casesServices';
import './css/casedetail.css';

// Dummy data for cases
const dummyCases = [
    { id: 101, clientId: 1, title: "Immigration Appeal", status: "Open", description: "Appealing a visa rejection." },
    { id: 102, clientId: 1, title: "Green Card Renewal", status: "Closed", description: "Renewal process for green card." },
    { id: 201, clientId: 2, title: "Work Visa Application", status: "Pending", description: "Processing work visa application." }
];

const CaseDetailPage = () => {
    const { caseId } = useParams();
    const [caseDetails, setCaseDetails] = useState(null);

    useEffect(() => {
        // Fetch case details
        const foundCase = dummyCases.find(caseItem => caseItem.id === parseInt(caseId));
        setCaseDetails(foundCase);
    }, [caseId]);

    if (!caseDetails) {
        return <div className="loading">Loading case details...</div>;
    }

    return (
        <div className="case-detail-page">
            <nav className="navbar">
                <h1>Case Details</h1>
            </nav>
            <div className="case-info">
                <h2>{caseDetails.title}</h2>
                <p><strong>Status:</strong> {caseDetails.status}</p>
                <p><strong>Description:</strong> {caseDetails.description}</p>
            </div>
            <Link to={`/clients/${caseDetails.clientId}`} className="back-button">Back to Client</Link>
        </div>
    );
};

export default CaseDetailPage;
