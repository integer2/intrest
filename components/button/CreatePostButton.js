import CreatePostModule from '@/modules/create-post';
import { PlusIcon } from '@heroicons/react/solid';
import { useModal } from 'hooks/useModal';
import React from 'react';
import Button from './Button';

const CreatePostButton = () => {
  const modal = useModal();
  const handleClick = () => {
    modal.setIsOpen(true);
    modal.setContent(<CreatePostModule />);
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
