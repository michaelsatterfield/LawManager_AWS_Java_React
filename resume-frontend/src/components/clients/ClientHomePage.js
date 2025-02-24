import React, { useState, useEffect } from 'react';
import ClientAddForm from './ClientAddForm';
import clientsService from '../../services/clientsService';
import ClientList from './ClientList';
import ClientSearch from '../reusable/ClientSearch';
import './css/clientpage.css';

const ClientHomePage = () => {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="client-page"> {/* Apply the client-page class */}
            <nav className="navbar">
                <h1>Client Management</h1>
            </nav>
            <div className="client-container"> {/* Wrapper for side-by-side layout */}
                <div className="client-add-form-container">
                    <ClientAddForm fetchClients={fetchClients} />
                </div>
                <div className="client-list-container"> {/* Client List will be here */}
                    <ClientSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearch={handleSearch}  // Passing down search function to ClientSearch
                    />
                    {loading ? (
                        <div className="spinner">Loading...</div> // Render spinner while loading
                    ) : (
                        <ClientList 
                            clients={clients} 
                            setClients={setClients} 
                            fetchClients={fetchClients} 
                            handleDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientHomePage;
