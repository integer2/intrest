import assets from '@/libs/assets';
import DataSidebarMenu from 'data/data-sidebar-menu';
import Image from 'next/image';
import React from 'react';
import MenuGroup from './menu-group';
import FollowMenu from './follow-menu';

import styles from './Sidebar.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import routes from '@/libs/routes';
import { useAuth } from 'context/auth';

const Sidebar = () => {
  const auth = useAuth();
  return (
    <div
      className={classNames(
        ' bg-white w-[255px] sticky top-0 h-screen shadow-sidebar overflow-y-scroll',
        styles.container
      )}
    >
      <div className="px-10 flex flex-col gap-8 h-full">
        <div className="bg-white sticky top-0 z-10 pt-7 pb-2">
          <Link href={routes.home}>
            <a>
              <Image src={assets.logo} width={165} height={41} alt="intrest" />
            </a>
          </Link>
        </div>
        <div className="flex flex-col gap-10 justify-between h-full">
          <div className="flex flex-col gap-10">
            <MenuGroup title={'Menu'} datamenu={DataSidebarMenu} />

            {auth.user && <FollowMenu />}
          </div>
          <div className="pb-7 text-gray-4 font-medium text-sm">
            © 2022 IntegerTeam
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
