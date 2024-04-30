import React from 'react';
import {Search} from "react-feather";

const NavbarSearch = () => {
    return (
        <div className='navbar-Search'>
            <div className='search-container'>
                <form>
                    <Search className='search-icon feather-icon' />
                    <input type={'text'} className='search-input' placeholder='Search here ...' />
                </form>
            </div>
        </div>
    );
};

export default NavbarSearch;