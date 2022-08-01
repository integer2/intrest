import { UserAddIcon } from '@heroicons/react/solid';
import dataFollowed from 'data/data-followed';
import React from 'react';
import MenuGroup from './menu-group';

const FollowMenu = () => {
  return (
    <MenuGroup
      title={'Followed'}
      datamenu={dataFollowed}
      addtionalMenu={[
        {
          label: 'Find New',
          link: '/find-new',
          icon: UserAddIcon,
        },
      ]}
      isImage
    />
  );
};

export default FollowMenu;
