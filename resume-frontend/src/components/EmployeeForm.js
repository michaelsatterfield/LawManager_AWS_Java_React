import React, { useState } from 'react';
import employeesService from '../services/employeesService';

const EmployeeForm = ({ refreshEmployees }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('100000');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position) return alert("Both fields are required!");

    try {
      let addObject = await employeesService.add({ name, position, salary });
      console.log('Added employee:', addObject);
      
      setName('');
      setPosition('');
      //refreshEmployees(); // Refresh the employee list
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Position" 
          value={position} 
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
