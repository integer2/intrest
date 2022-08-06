import { MainLayout } from '@/components/layout';
import LikesModule from '@/modules/likes';
import React from 'react';

const LikesPage = () => {
  return (
    <MainLayout>
      <LikesModule />
    </MainLayout>
  );
};

export default LikesPage;
