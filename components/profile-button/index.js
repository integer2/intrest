import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useAuth } from 'context/auth';
import Router from 'next/router';
import routes from '@/libs/routes';

const ProfileButton = () => {
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const profileDropdown = useRef();

  const toggleDropdown = (e) => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    Router.replace(routes.login);
  };

  useEffect(() => {
    // Close dropdown if user clicks outside of it
    const handleClickOutside = (e) => {
      if (profileDropdown.current.contains(e.target)) {
        return;
      }
      setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="relative" ref={profileDropdown} onClick={toggleDropdown}>
      <button className="flex gap-5 items-center">
        <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden shadow-button">
          <Image
            src={user.img_url || '/assets/images/no-profile.jpg'}
            layout="fill"
            alt="profile"
            objectFit="cover"
          />
        </div>
      </button>
      {showDropdown && (
        <div className="absolute z-50 right-0 top-full mt-2 flex flex-col divide-y-2 min-w-[200px] bg-white shadow-md text-dark-4 rounded-md">
          <div>
            <Link href={'/user/[username]'} as={`/user/${user.username}`}>
              <a className="flex items-center w-full py-2 px-4 gap-2 hover:bg-gray-100">
                <UserCircleIcon className="h-5 w-5" />
                <div>Profile</div>
              </a>
            </Link>
          </div>
          <div>
            <button
              className="flex items-center w-full py-2 px-4 gap-2 hover:bg-gray-100"
              type="button"
              onClick={handleLogout}
            >
              <LogoutIcon className="h-5 w-5" />
              <div>Logout</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
