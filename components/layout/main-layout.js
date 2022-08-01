import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';

const MainLayout = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 bg-main">
        <Navbar />
      </div>
    </div>
  );
};

export default MainLayout;
