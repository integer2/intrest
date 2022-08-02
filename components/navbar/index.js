import routes from '@/libs/routes';
import { BellIcon, PlusIcon } from '@heroicons/react/solid';
import { useAuth } from 'context/auth';
import Router from 'next/router';
import React from 'react';
import { Button } from '../button';
import ProfileButton from '../profile-button';
import SearchInput from '../search-input';

const Navbar = () => {
  const auth = useAuth();

  const searchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-7 justify-between items-center container py-7 px-10">
      <div className="flex-1">
        <SearchInput onSubmit={searchSubmit} />
      </div>
      <div className="flex gap-7">
        {auth.user && <AuthNavbarMenu />}
        {!auth.user && <UnauthNavbarMenu />}
      </div>
    </div>
  );
};

export default Navbar;

export const AuthNavbarMenu = () => {
  const auth = useAuth();
  return (
    <>
      <div>
        <Button isPrimary isRounded className={'px-3 py-3'}>
          <PlusIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
      <div>
        <Button isRounded className={'px-3 py-3 bg-white shadow-button'}>
          <div className="relative">
            <BellIcon className="h-6 w-6 text-purple-1" />
            <div className="h-3 w-3 absolute bg-red-1 rounded-full top-0 right-0"></div>
          </div>
        </Button>
      </div>
      <ProfileButton user={auth.user} />
    </>
  );
};

export const UnauthNavbarMenu = () => {
  return (
    <>
      <Button
        isSecondary
        isLarge
        type={'button'}
        className="bg-transparent"
        onClick={() => Router.push(routes.login)}
      >
        Register
      </Button>
      <Button
        isPrimary
        isLarge
        type={'button'}
        onClick={() => Router.push(routes.login)}
      >
        Login
      </Button>
    </>
  );
};
