import React, { useEffect, useState } from 'react';
import clientsService from '../services/clientsService';

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
    <div>
      <h2>client List</h2>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* client Table */}
      <ul>
        {clients.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.position} - ${emp.salary}
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
