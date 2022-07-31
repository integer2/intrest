import React from 'react';
import classNames from 'classnames';

const Button = ({ children, isPrimary, isFull, isRounded, className }) => {
  return (
    <button
      className={classNames(
        'flex px-4 py-2 items-center justify-center font-medium',
        isPrimary && 'bg-purple text-white',
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
