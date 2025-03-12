import React, { useState } from 'react';
import clientsService from '../../services/clientsService';
import './css/clientForm.css';

const ClientEditForm = ({ fetchClients, onClientAdded, toggleForm}) => {
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

  const [ errors, setErrors ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  //change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validations
  const validateForm = () => {
    const newErrors = {};
  
    // Check each field for validity
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
  
    // If there are any errors, return the error object
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
  
    // If all fields are valid, clear errors and return true
    setErrors({});
    return true;
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validate form
      const isValid = validateForm();
      if (!isValid) {
        return; // Stop if form is invalid
      }

    try {
      await clientsService.add(formData);
      console.log('Added client:', formData);
      onClientAdded(); // Close the Add form
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
    await fetchClients();
  };
  const handleCancel = () => {
    // Reset the form data if you want to clear fields
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });

    // Hide the form when cancel is clicked
    toggleForm(); // This will set showForm to false and hide the form
};


  return (
    <div className="client-form-container">
      <div className="form-box">
        <h2>Edit Client</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
            type="text"
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange} 
              // required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="input-group">
              <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange} 
              // required
              />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="input-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange}
                // required
              />
               {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-group">
                <input
                type="text" 
                name="phone" 
                placeholder="Phone" 
                value={formData.phone} 
                onChange={handleChange} 
                // required
                />
                   {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input type="date" name="dateOfBirth" placeholder='Date of Birth' value={formData.dateOfBirth} onChange={handleChange} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            <input type="text" name="contactType" placeholder="Contact Type" value={formData.contactType} onChange={handleChange} />
            <input type="text" name="leadSource" placeholder="Lead Source" value={formData.leadSource} onChange={handleChange} />
            <input type="text" name="referredBy" placeholder="Referred By" value={formData.referredBy} onChange={handleChange} />
            <div className="form-buttons">
              <button className="addButton" type="submit">Add Client</button>
              <button
                className="cancelButton"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientEditForm;
