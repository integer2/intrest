import routes from '@/libs/routes';
import { useRouter } from 'next/router';
import React from 'react';
import MenuItem from './menu-item';

const MenuGroup = ({ title, datamenu, addtionalMenu = [], isImage }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <div className="text-gray-2">{title}</div>
      {datamenu.map((data, index) => {
        return (
          <MenuItem
            key={index}
            Icon={isImage ? data.avatar : data.icon}
            label={isImage ? data.username : data.label}
            link={isImage ? `${routes.user}/${data.id}` : data.link}
            isActive={router.pathname === (isImage ? '#' : data.link)}
            isImage={isImage}
          />
        );
      })}
      {addtionalMenu.map((data, index) => {
        return (
          <MenuItem
            key={index}
            Icon={data.icon}
            label={data.label}
            link={data.link}
            isActive={router.pathname === data.link}
          />
        );
      })}
    </div>
  );
};

export default MenuGroup;
