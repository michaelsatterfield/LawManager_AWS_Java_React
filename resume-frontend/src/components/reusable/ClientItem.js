import React from 'react';

const ClientItem = ({ client, onDelete }) => {
  return (
    <tr className='client-item'>
      <td>{client.firstName}</td>
      <td>{client.lastName}</td>
      <td>{client.phone}</td>
      <td>{client.email}</td>
      {/* <td>{client.address}</td>
      <td>{client.city}</td>
      <td>{client.state}</td>
      <td>{client.dateOfBirth}</td> */}
      <td>{client.contactType}</td>
      <td>{client.leadSource}</td>
      <td>{client.referredBy}</td>
      <td>
        <button className='delete-button' onClick={() => onDelete(client.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ClientItem;
