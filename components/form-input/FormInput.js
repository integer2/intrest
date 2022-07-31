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
}) => {
  return (
    <div className={classNames(isBlock && inputStyle.inputBlock, 'space-y-1')}>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            'capitalize',
            isRequired && "after:text-red-500 after:content-['*'] after:ml-1"
          )}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={classNames(
          'rounded-sm p-3 border border-gray-300 focus:outline-purple text-gray-600',
          isFull && 'w-full',
          error && 'border-red-600'
        )}
        placeholder={placeholder}
        {...register}
      />
      {error && <ErrorInputAlert message={error.message} />}
    </div>
  );
};

export default FormInput;
