import Image from 'next/image';
import React from 'react';

const ProfileButton = ({ imgUrl, username }) => {
  return (
    <button className="flex gap-5 items-center">
      <div className="relative h-10 w-10 rounded-full overflow-hidden">
        <Image
          src={'/assets/images/no-profile.jpg'}
          layout="fill"
          alt="profile"
        />
      </div>
      <p className="font-medium min-w-[8ch] max-w-[8ch] whitespace-nowrap overflow-hidden text-ellipsis">
        {username}
      </p>
    </button>
  );
};

export default ProfileButton;
