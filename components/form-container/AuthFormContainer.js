import React from 'react';

const AuthFormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="px-[70px] py-16 bg-white shadow-form rounded-[10px]"
    >
      {children}
    </form>
  );
};

export default AuthFormContainer;
