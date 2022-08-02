import { useAuth } from 'context/auth';
import React from 'react';
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import { NavbarSkeleton, SidebarSkeleton } from '../skeleton';

const MainLayout = ({ children }) => {
  const auth = useAuth();
  return (
    <div className="flex">
      <div>
        {!auth.loading ? <Sidebar /> : <SidebarSkeleton />}
      </div>
      <div className="flex-1 bg-main">
        {!auth.loading ? <Navbar /> : <NavbarSkeleton />}
        <div className='container'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
