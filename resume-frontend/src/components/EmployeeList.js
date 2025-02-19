import React, { useEffect, useState } from 'react';
import employeesService from '../services/employeesService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const data = await employeesService.getAll();
      setEmployees(data);
      console.log('Employees:', data);
      
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Search employees by name
  const handleSearch = async () => {
    if (!searchQuery) {
      fetchEmployees(); // Reload all employees if search is cleared
      return;
    }
    try {
      const data = await employeesService.search(searchQuery);
      setEmployees(data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  // Delete an employee
  const handleDelete = async (id) => {
    try {
      await employeesService.delete(id);
      fetchEmployees(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Employee Table */}
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.position} - ${emp.salary}
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
