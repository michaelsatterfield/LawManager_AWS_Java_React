import React from 'react';
import ClientItem from '../reusable/ClientItem';
import './css/ClientList.css';

const ClientList = ({ clients, handleDelete }) => {
  return (
    <div className="client-list">
      <h2>Client List</h2>
      <table className="client-table">
        <thead>
          <tr>
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
            <ClientItem key={client.id} client={client} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
