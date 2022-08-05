import EditPostModule from '@/modules/edit-post';
import API from '@/services/api';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useModal } from 'hooks/useModal';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../button';

const DotsButton = ({ post }) => {
  const buttonRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  const handleClickDelete = async () => {
    try {
      await API().post('/post/delete', post);
      toast.success('Post deleted successfully');
      Router.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDelete(false);
    }
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
          <button
            className="text-red-1 text-left px-2 py-1 hover:bg-gray-100"
            onClick={() => setShowDelete(true)}
          >
            Delete Post
          </button>
        </div>
      )}
      {showDelete && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 h-screen w-full flex items-center justify-center"
          onClick={() => setShowDelete(false)}
        >
          <div
            className="bg-white p-5 min-w-[320px] rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-semibold mb-2 text-lg">Delete this post?</h2>
            <p className="mb-4">Post will delete permanently!</p>
            <div className="flex justify-end gap-3">
              <Button
                isSmall
                className={'bg-white border-purple-1 text-purple-1'}
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </Button>
              <Button
                isSmall
                className={'bg-red-1 text-white border-red-1'}
                onClick={handleClickDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DotsButton;
