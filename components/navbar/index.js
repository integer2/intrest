import routes from '@/libs/routes';
import { BellIcon, PlusIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useAuth } from 'context/auth';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, CreatePostButton } from '../button';
import ProfileButton from '../profile-button';
import SearchInput from '../search-input';

const Navbar = () => {
  const auth = useAuth();
  const [isScroll, setIsScroll] = useState(false);

  const onScroll = (e) => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <div
      className={classNames(
        'sticky top-0 z-20 bg-main flex gap-7 justify-between items-center container py-7 px-10',
        isScroll && 'border-b-2 shadow-sm'
      )}
    >
      <div className="flex-1">
        <SearchInput />
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
      <CreatePostButton />
      {/* <div>
        <Button isRounded className={'px-3 py-3 bg-white shadow-button'}>
          <div className="relative">
            <BellIcon className="h-6 w-6 text-purple-1" />
            <div className="h-3 w-3 absolute bg-red-1 rounded-full top-0 right-0"></div>
          </div>
        </Button>
      </div> */}
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
