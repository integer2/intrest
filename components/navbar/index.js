import React from 'react';
import SearchInput from '../search-input';

const Navbar = () => {
  const searchSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex py-7 px-10 justify-between">
      <div className='flex-1'>
        <SearchInput onSubmit={searchSubmit} />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Navbar;
