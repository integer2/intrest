import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-main">
        <Navbar />
      </div>
    </div>
  );
};

export default MainLayout;
