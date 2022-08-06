import { MainLayout } from '@/components/layout';
import ExploreModule from '@/modules/explore';
import React, { useState } from 'react';

const ExplorePage = () => {
  return (
    <MainLayout>
      <ExploreModule />
    </MainLayout>
  );
};

export default ExplorePage;
