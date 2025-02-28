import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clientsService from '../../services/clientsService';
import casesService from '../../services/casesServices';
import './css/clientdetail.css';


const ClientDetailPage = () => {
    const { clientId } = useParams(); //takes the id from the url rather that storing it in a state
    const [client, setClient] = useState(null);
    const [cases, setCases] = useState([]);

   const [loading, setLoading] = useState(false);

   const fetchClientData = async () => {
    console.log(clientId);
        
        try {
            setLoading(true);
            const data = await clientsService.getById(clientId);
            setClient(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
       // setCases(clientCases);
    }
    
    console.log(client);
    const fetchCases = async () => {
        setLoading(true);
        try {
            const data = await casesService.getByClientId(clientId);
            console.log("cases data",data);
            
            setCases(data);
        } catch (error) {
            console.error('Error fetching cases:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchClientData();
        fetchCases();
    }, [clientId]);

    if (!client) {
        return  <div className="spinner"></div>;
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
                                <p>Case Type: <span><em>{caseItem.caseType}</em></span></p>
                                <Link to={`/cases/${caseItem.id}`}>{caseItem.caseType}{caseItem.caseName}</Link> - <span>{caseItem.caseDescription}</span>
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
