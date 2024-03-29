import React from 'react';
import { BackButton } from '../button';

const AuthLayout = ({ isBackButton, children }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-5 py-16 bg-purple-1">
      {isBackButton && (
        <BackButton className={'absolute top-5 left-5 text-white'} />
      )}
      {children}
    </div>
  );
};

export default AuthLayout;
