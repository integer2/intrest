import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  isPrimary,
  isFull,
  isRounded,
  className,
  isDisabled,
  isLarge,
  type,
  onClick,
  isSecondary,
  isBorderless,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'flex px-5 py-3 items-center border justify-center font-medium hover:opacity-90 rounded-sm active:opacity-80 disabled:bg-opacity-80 disabled:cursor-not-allowed',
        isPrimary && 'bg-purple-1 text-white border-purple-1',
        isSecondary && 'bg-white text-purple-1 border-purple-1',
        isFull && 'w-full',
        isRounded && 'rounded-full',
        isLarge && 'min-w-[110px]',
        isBorderless && 'border-none',
        className
      )}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
