// src/components/Header/NavbarSearch.jsx
import React from 'react';
import { Search } from 'react-feather';
import { useSearch } from './SearchContext';

const NavbarSearch = () => {
    const { searchQuery, setSearchQuery } = useSearch();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className='navbar-Search'>
            <div className='search-container'>
                <form>
                    <Search className='search-icon feather-icon' />
                    <input
                        type="text"
                        className='search-input'
                        placeholder='Chercher ici ... '
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>
        </div>
    );
};

export default NavbarSearch;
