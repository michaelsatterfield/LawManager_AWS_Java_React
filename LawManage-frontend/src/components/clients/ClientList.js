import React, {useState} from 'react';
import ClientItem from '../reusable/ClientItem';
import './css/ClientList.css';

const ClientList = ({ clients,selectedClients, setSelectedClients, handleSelectClient, handleDelete}) => {




  return (
    <div className="client-list">
      <table className="client-table">
        <thead>
          <tr>
            <th>
          {/* Select All Checkbox (Optional) */}
          <input
                type="checkbox"
                onChange={() => {
                  if (selectedClients?.length === clients?.length) {
                    setSelectedClients([]); // Deselect all if all are selected
                  } else {
                    setSelectedClients(clients?.map((client) => client.id)); // Select all
                  }
                }}
                checked={selectedClients?.length === clients?.length}
              />
              </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            {/* <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Date of Birth</th> */}
            <th>Contact Type</th>
            <th>Lead Source</th>
            <th>Referred By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <ClientItem 
            key={client.id} 
            client={client} 
            onDelete={handleDelete} 
            isSelected={selectedClients?.includes(client.id)}
            onSelect={() => handleSelectClient(client.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
