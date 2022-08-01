import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Button } from '../button';

const SearchInput = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-[713px] flex gap-7">
      <div className="relative flex items-center gap-6 px-5 py-2 border rounded-md max-w-[573px] flex-1 bg-white">
        <label htmlFor="search">
          <SearchIcon className="h-5 w-5" />
        </label>
        <input
          type="search"
          placeholder="Search..."
          id="search"
          className="focus:outline-none w-full flex-1 bg-transparent"
        />
      </div>
      <Button isPrimary type={'submit'} isLarge>
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
