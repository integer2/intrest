import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  isPrimary,
  isFull,
  isRounded,
  className,
  isLarge,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'flex px-5 py-3 items-center justify-center font-medium hover:opacity-90 rounded-sm',
        isPrimary && 'bg-purple-1 text-white',
        isFull && 'w-full',
        isRounded && 'rounded-full',
        isLarge && 'min-w-[110px]',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
