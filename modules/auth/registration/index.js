import React from 'react';
import { AuthFormContainer } from '../../../components/form-container';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/button';

const RegistrationModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-10">
        <div className="text-center">
          <h1 className="text-purple text-2xl font-semibold">Welcome</h1>
          <p className="text-gray-600">Share With Community</p>
        </div>
        <div className="flex flex-col gap-5"></div>
        <div>
          <Button isPrimary isFull isRounded></Button>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default RegistrationModule;
