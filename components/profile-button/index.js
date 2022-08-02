import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const ProfileButton = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileDropdown = useRef();

  const toggleDropdown = (e) => {
    setShowDropdown(!showDropdown);
  };


  return (
    <div className="relative" ref={profileDropdown} onClick={toggleDropdown}>
      <button className="flex gap-5 items-center">
        <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden shadow-button">
          <Image
            src={'/assets/images/no-profile.jpg'}
            layout="fill"
            alt="profile"
          />
        </div>
        {/* <p className="font-medium min-w-[8ch] max-w-[8ch] whitespace-nowrap overflow-hidden text-ellipsis">
          {username}
        </p> */}
      </button>
      {showDropdown && (
        <div className="absolute z-50 right-0 top-full mt-2 flex flex-col divide-y-2 min-w-[200px] bg-white shadow-md text-dark-4 rounded-md">
          <div>
            <Link href={'/user/[username]'} as={`/user/${user.username}`}>
              <a className="flex items-center w-full py-2 px-4 gap-2 hover:bg-gray-6">
                <UserCircleIcon className="h-5 w-5" />
                <div>Profile</div>
              </a>
            </Link>
          </div>
          <div>
            <button
              className="flex items-center w-full py-2 px-4 gap-2 hover:bg-gray-6"
              type="button"
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
