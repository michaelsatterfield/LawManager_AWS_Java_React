// ClientSearch.js
import React from 'react';
import { Search } from 'lucide-react';
import './css/clientsearch.css';

const ClientSearch = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = () => {
    onSearch(searchQuery);  // Notify the parent component to handle the search
  };

  return (
    <div className="client-search">
         <Search className="search-icon" size={18} />
      <input
        type="text"
        className="search-input"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ClientSearch;
