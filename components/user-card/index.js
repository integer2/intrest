import { UserAddIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { Button } from '../button';

const UserCard = ({ data }) => {
  const handleClick = () => {
    Router.push('/user/[username]', `/user/${data.username}`);
  };
  return (
    <div
      className="flex flex-col bg-white items-center justify-center rounded-lg px-5 py-8 gap-5 cursor-pointer shadow-sm"
      onClick={handleClick}
    >
      <div className="relative h-[100px] w-[100px] rounded-full overflow-clip">
        <Image
          src={data?.img_url || '/assets/images/no-profile.jpg'}
          alt={data.username}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="font-medium text-purple-1">{data.username}</p>
      <div>
        <Button isPrimary className={'px-4 py-2 rounded-md gap-2'}>
          <UserAddIcon className="h-5 w-5" /> Follow
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
