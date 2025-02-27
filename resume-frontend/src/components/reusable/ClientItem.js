import React from 'react';

const ClientItem = ({ client, onDelete, isSelected, onSelect }) => {
  console.log(client);
  
  return (
    <tr className='client-item'>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect} // Calls the onSelect function passed as a prop
        />
      </td>
      <td><a href={`/clients/${client.id}`}>{client.firstName}</a></td>
      <td><a href={`/clients/${client.id}`}>{client.lastName}</a></td>
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
