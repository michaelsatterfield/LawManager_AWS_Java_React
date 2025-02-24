// ClientSearch.js
import React from 'react';
import './css/clientsearch.css';

const ClientSearch = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = () => {
    onSearch(searchQuery);  // Notify the parent component to handle the search
  };

  return (
    <div className="client-search">
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ClientSearch;
