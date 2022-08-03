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
  isSmall,
  isBorderless,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'flex items-center border justify-center font-medium hover:opacity-90 active:opacity-80 disabled:bg-opacity-80 disabled:cursor-not-allowed',
        className,
        isPrimary && 'bg-purple-1 text-white border-purple-1',
        isSecondary && 'bg-white text-purple-1 border-purple-1',
        isSmall ? 'px-2 py-1' : 'px-5 py-3',
        isFull && 'w-full',
        isLarge && 'min-w-[110px]',
        isBorderless && 'border-none',
        isRounded ? 'rounded-full' : 'rounded-sm'
      )}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
