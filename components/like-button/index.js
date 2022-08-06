import React, { useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

const LikeButton = ({ isLiked, onClick }) => {
  return <button onClick={onClick}>{isLiked ? <Liked /> : <Like />}</button>;
};

export default LikeButton;

const Like = () => {
  const [isShowed, setIsShowed] = React.useState(false);
  useEffect(() => {
    setIsShowed(true);
  }, []);
  return <HeartIcon className={classNames('h-6 w-6 text-purple-1')} />;
};

const Liked = () => {
  const [isShowed, setIsShowed] = React.useState(false);
  useEffect(() => {
    setIsShowed(true);
  }, []);
  return (
    <HeartIcon
      className={classNames(
        'h-6 w-6 text-purple-1 fill-purple-1 transition-all ease-in-out duration-300',
        isShowed ? 'scale-100' : 'scale-125'
      )}
    />
  );
};
