import React, { useState, useEffect } from 'react';
import ClientAddForm from './ClientAddForm';
import clientsService from '../../services/clientsService';
import ClientList from './ClientList';
import ClientSearch from '../reusable/ClientSearch';
import Sidebar from '../reusable/Sidebar';
import SubBanner from '../reusable/subBanner';
import { Plus, X, UserPlus, Mail, Scale, Phone } from "lucide-react"; // Icons for better UI
import './css/clientpage.css';

const ClientHomePage = () => {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedClients, setSelectedClients] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Fetch clients
    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await clientsService.getAll();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle select/unselect logic
    const handleSelectClient = (clientId) => {
        setSelectedClients((prevSelected) => {
            if (prevSelected.includes(clientId)) {
                return prevSelected.filter((id) => id !== clientId); // Unselect client
            } else {
                return [...prevSelected, clientId]; // Select client
            }
        });
    };

    // You can use this selectedClients state for further actions, like sending emails.
    const handleAction = () => {
        console.log('Selected clients:', selectedClients);

    
        const selectedEmails = clients
            .filter((client) => selectedClients.includes(client.id))
            .map((client) => ({
                email: client.email,
                firstName: client.firstName,
                lastName: client.lastName,
                phone: client.phone
            }));
        // loop through selected clients and get their email addresses by id 

        console.log('Selected client emails:', selectedEmails);
        // If there are selected emails, open the user's email client
        if (selectedEmails.length > 0) {
            const mailtoLink = `mailto:${selectedEmails.map(emailObj => emailObj.email)
                .join(',')}?subject=Getting in Touch&body=Hello ${selectedEmails.map(emailObj => emailObj.firstName).join(', ')}`;

            // Open the default email client with the pre-filled email
            window.location.href = mailtoLink;
        }
    };
    // Delete a client
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setLoading(true);
            try {
                await clientsService.delete(id);
                fetchClients(); // Refresh list after deletion
            } catch (error) {
                console.error('Error deleting client:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Search clients by name in the parent
    const handleSearch = async () => {
        if (!searchQuery) {
            fetchClients(); // Reload all clients if search is cleared
            return;
        }
        setLoading(true);
        try {
            const data = await clientsService.search(searchQuery);
            setClients(data); // Update clients list based on search results
        } catch (error) {
            console.error('Error searching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="client-page"> 
        {/* TODO: make this a separate component */}
            <nav className="navbar">

                <h1><Scale size={28}/>Law Firm Manage</h1>

                <ClientSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}  
                />
            </nav>
               {/* Sidebar Navigation */}
             <Sidebar />

             <SubBanner title="Clients" />

                <div className="client-container"> 
                    {showForm && (
                        <div className="client-add-form-container">
                            <ClientAddForm
                                fetchClients={fetchClients}
                                onClientAdded={() => setShowForm(false)}
                                toggleForm={toggleForm}
                            />
                        </div>
                    )}
                <div className="client-list-container"> {/* Client List will be here */}
            
                    {loading ? (
                        <div className="spinner"></div> // Render spinner while loading
                    ) : (
                        <div className={`client-list-container contanier-1 ${showForm ? "shift-down" : ""}`}>
                                    <div className="action-button-group">
                        {!showForm && (
                            <div className="client-header">
                                <button className="add-client-button" onClick={toggleForm}>
                                    <UserPlus size={18} /> Add Client
                                </button>
                                <button className="add-client-button" onClick={toggleForm}>
                                    <UserPlus size={18} /> Edit Client
                                </button>
                                <button
                                    style={{ backgroundColor: selectedClients.length > 0 ? "#21c97a" : "#b1ddb7" }} // Change button color based on selection
                                    className="add-client-button"
                                    onClick={handleAction}
                                >
                                    <Mail size={18} /> Email Client
                                </button>
                            </div>
                        )}

                    </div>
                            <ClientList
                                clients={clients}
                                setClients={setClients}
                                selectedClients={selectedClients}
                                setSelectedClients={setSelectedClients}
                                fetchClients={fetchClients}
                                handleSelectClient={handleSelectClient}
                                handleDelete={handleDelete}
                                handleAction={handleAction}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientHomePage;
