import React, { useEffect, useState } from 'react';
import clientsService from '../services/clientsService';
import './css/ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch clients
  const fetchClients = async () => {
    try {
      const data = await clientsService.getAll();
      setClients(data);
      console.log('clients:', data);
      
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Search clients by name
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchClients(); // Reload all clients if search is cleared
      return;
    }
    try {
      const data = await clientsService.search(searchQuery);
      setClients(data);
    } catch (error) {
      console.error('Error searching clients:', error);
    }
  };

  // Delete an client
  const handleDelete = async (id) => {
    try {
      await clientsService.delete(id);
      fetchClients(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className='client-list'>
      <h2>Client List</h2>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Client Table */}
      <ul>
        {clients.map(emp => (
          <li key={emp.id} className='client-item'>
            <div className='client-detail'>First Name: {emp.firstName}</div>
            <div className='client-detail'>Last Name: {emp.lastName}</div>
            <div className='client-detail'>Phone: {emp.phone}</div>
            <div className='client-detail'>Email: {emp.email}</div>
            <div className='client-detail'>Address: {emp.address}</div>
            <div className='client-detail'>City: {emp.city}</div>
            <div className='client-detail'>State: {emp.state}</div>
            <div className='client-detail'>Date of Birth: {emp.dateOfBirth}</div>
            <div className='client-detail'>Contact Type: {emp.contactType}</div>
            <div className='client-detail'>Lead Source: {emp.leadSource}</div>
            <div className='client-detail'>Referred By: {emp.referredBy}</div>
            <button className='delete-button' onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
