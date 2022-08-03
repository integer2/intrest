import routes from '@/libs/routes';
import Link from 'next/link';
import React from 'react';

const UserNotFound = () => {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="py-10 text-center">
        <p className="text-2xl font-medium mb-2">
          Upps! Sorry, we can&apos;t find the user you are looking for.
        </p>
        <p className="text-lg font-normal">
          Please check the username and try again.{' '}
          <Link href={routes.home}>Go to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default UserNotFound;
