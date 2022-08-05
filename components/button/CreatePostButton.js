import CreatePostModule from '@/modules/create-post';
import { PlusIcon } from '@heroicons/react/solid';
import { useModal } from 'hooks/useModal';
import Router from 'next/router';
import React from 'react';
import Button from './Button';

const CreatePostButton = () => {
  const modal = useModal();
  const handleClick = () => {
    modal.setIsOpen(true);
    modal.setContent(<CreatePostModule />);
    // Router.push(Router.pathname);
  };
  return (
    <div>
      <Button onClick={handleClick} isPrimary isRounded className={'px-3 py-3'}>
        <PlusIcon className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default CreatePostButton;
