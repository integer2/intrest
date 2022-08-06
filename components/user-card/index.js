import { useAuth } from 'context/auth';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import SubscriptionButton from '../subscription-button';

const UserCard = ({ data }) => {
  const handleClick = () => {
    Router.push('/user/[username]', `/user/${data.username}`);
  };
  const { user } = useAuth();
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
        <SubscriptionButton follower_id={user.id} user_id={data.id} />
      </div>
    </div>
  );
};

export default UserCard;
