import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const BackButton = ({ className }) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onClick}
      className={classNames('h-6 w-6', className)}
      type="button"
    >
      <ArrowLeftIcon />
    </button>
  );
};

export default BackButton;
