import React from 'react';
import classNames from 'classnames';
import inputStyle from './FormInput.module.css';
import { ErrorInputAlert } from '../error-alert';

const FormInput = ({
  label,
  id,
  isBlock,
  register,
  placeholder,
  isRequired,
  isFull,
  type,
  error,
  onClick,
  isDisabled,
  isButton,
  value,
}) => {
  return (
    <div className={classNames(isBlock && inputStyle.inputBlock, 'space-y-1')}>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            'capitalize',
            isRequired && "after:text-red-1 after:content-['*'] after:ml-1"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative" onClick={onClick}>
        <input
          value={value}
          type={type}
          id={id}
          className={classNames(
            'rounded-sm p-3 border border-gray-300 focus:outline-purple-1 focus:outline-8 text-gray-600 disabled:bg-inherit',
            isFull && 'w-full',
            error && 'border-red-600',
            isButton && 'cursor-pointer'
          )}
          disabled={isDisabled}
          placeholder={placeholder}
          {...register}
        />
      </div>
      {error && <ErrorInputAlert message={error.message} />}
    </div>
  );
};

export default FormInput;
