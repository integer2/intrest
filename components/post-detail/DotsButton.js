import EditPostModule from '@/modules/edit-post';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useModal } from 'hooks/useModal';
import React, { useEffect, useRef, useState } from 'react';

const DotsButton = ({ post }) => {
  const buttonRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const modal = useModal();

  useEffect(() => {
    // close menu when clicked outside of menu
    const handleClickOutside = (e) => {
      if (buttonRef.current.contains(e.target)) {
        return;
      }
      setShowMenu(false);
    };
    // add event listener
    document.addEventListener('mousedown', handleClickOutside);
    // return function to be called when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickEdit = () => {
    modal.setIsOpen(true);
    modal.setContent(<EditPostModule post={post} />);
  };

  const handleClickDelete = () => {
    console.log('delete');
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button onClick={handleClick}>
        <DotsHorizontalIcon className="h-6 w-6" />
      </button>
      {showMenu && (
        <div className="bg-white absolute flex flex-col right-0 whitespace-nowrap border rounded-md divide-y min-w-[125px] shadow-sm">
          <button
            className="text-dark-1 text-left px-2 py-1 hover:bg-gray-100"
            onClick={handleClickEdit}
          >
            Edit Post
          </button>
          <button className="text-red-1 text-left px-2 py-1 hover:bg-gray-100">
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
};

export default DotsButton;
