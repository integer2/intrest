import { useModal } from 'hooks/useModal';
import React from 'react';

const ModalLayer = () => {
  const { setIsOpen, content } = useModal();

  return (
    <div
      className="fixed bg-black inset-0 z-50 flex items-center justify-center bg-opacity-20 w-full"
      onClick={() => setIsOpen(false)}
    >
      {content}
    </div>
  );
};

export default ModalLayer;
