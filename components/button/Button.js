import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  isPrimary,
  isFull,
  isRounded,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'flex px-4 py-2 items-center justify-center font-medium hover:opacity-90',
        isPrimary && 'bg-purple-1 text-white',
        isFull && 'w-full',
        isRounded && 'rounded-full',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
