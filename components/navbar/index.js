import { BellIcon, PlusIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { Button } from '../button';
import SearchInput from '../search-input';

const Navbar = () => {
  const searchSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex py-7 px-10 gap-7 justify-between items-center">
      <div className="flex-1">
        <SearchInput onSubmit={searchSubmit} />
      </div>
      <div className="flex gap-7">
        <Button isPrimary isRounded className={'px-2 py-2'}>
          <PlusIcon className="h-6 w-6 text-white" />
        </Button>
        <Button isRounded className={'px-2 py-2 bg-white shadow-button'}>
          <div className="relative">
            <BellIcon className="h-6 w-6 text-purple-1" />
            <div className="h-3 w-3 absolute bg-red-1 rounded-full top-0 right-0"></div>
          </div>
        </Button>
        <div className="flex gap-5 items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={'/assets/images/no-profile.jpg'}
              layout="fill"
              alt="profile"
            />
          </div>
          <p className="font-medium min-w-[8ch] max-w-[8ch] whitespace-nowrap overflow-hidden text-ellipsis">
            Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
