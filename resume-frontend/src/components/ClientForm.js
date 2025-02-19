import React, { useState } from 'react';
import clientsService from '../services/clientsService';

const ClientForm = ({ refreshClients}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    city: '',
    state: '',
    contactType: '',
    leadSource: '',
    referredBy: '',
  });

  //change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientsService.add(formData);
      console.log('Added client:', formData);

      // Reset the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        city: '',
        state: '',
        contactType: '',
        leadSource: '',
        referredBy: '',
      });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };


  return (
    <div>
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        <input type="text" name="contactType" placeholder="Contact Type" value={formData.contactType} onChange={handleChange} />
        <input type="text" name="leadSource" placeholder="Lead Source" value={formData.leadSource} onChange={handleChange} />
        <input type="text" name="referredBy" placeholder="Referred By" value={formData.referredBy} onChange={handleChange} />
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
