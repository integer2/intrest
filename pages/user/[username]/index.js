import { MainLayout } from '@/components/layout';
import UserProfileModule from '@/modules/user/profile';
import React from 'react';

const Username = () => {
  return (
    <div>
      <MainLayout>
        <UserProfileModule />
      </MainLayout>
    </div>
  );
};

export default Username;
