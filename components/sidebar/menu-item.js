import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

const MenuItem = ({ Icon, label, link, isActive, isImage }) => {
  return (
    <Link href={link}>
      <a
        className={classNames(
          'flex items-center gap-5 font-medium',
          isActive ? 'text-purple-1' : 'text-dark-1'
        )}
      >
        {isImage ? <ImageIcon imgUrl={Icon} /> : <Icon className={'h-5 w-5'} />}
        <span className='max-w-[12ch] overflow-hidden text-ellipsis'>{label}</span>
      </a>
    </Link>
  );
};

export default MenuItem;

const ImageIcon = ({ imgUrl }) => {
  return (
    <div className="relative h-5 w-5 rounded-full overflow-hidden">
      <Image
        src={imgUrl ? imgUrl : '/assets/images/no-profile.jpg'}
        layout={'fill'}
        alt="user_avatar"
      />
    </div>
  );
};
