
import React, { useState } from 'react';
import { Scale } from "lucide-react";
import ClientSearch from './ClientSearch';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <nav className="navbar">
            <h1><Scale size={28}/>Law Firm Manage</h1>
            <ClientSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
            />
        </nav>
    );
};

export default Navbar;