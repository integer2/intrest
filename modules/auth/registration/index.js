import React from 'react';
import { AuthFormContainer } from '@/components/form-container';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import Link from 'next/link';
import routes from '@/libs/routes';
import { FormInput } from '@/components/form-input';
import formRegister from '@/utils/form-register';

const RegistrationModule = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-10">
        <div className="text-center">
          <h1 className="text-purple-1 text-4xl font-bold">
            <Link href={routes.home}>
              <a>INTREST</a>
            </Link>
          </h1>
          <p className="text-gray-600">Share With Community</p>
        </div>
        <div className="flex flex-col gap-5">
          <FormInput
            isBlock
            isFull
            isRequired
            id={'username'}
            label={'Username'}
            type={'text'}
            register={{ ...formRegister.username(register) }}
            error={errors.username}
          />
          <FormInput
            isBlock
            isFull
            id={'email'}
            label={'Email'}
            isRequired
            type={'email'}
            register={{ ...formRegister.email(register) }}
            error={errors.email}
          />
          <FormInput
            isBlock
            isFull
            id={'password'}
            label={'Password'}
            isRequired
            type={'password'}
            register={{ ...formRegister.password(register) }}
            error={errors.password}
          />
          <FormInput
            isBlock
            isFull
            id={'confirmPassword'}
            label={'Confirm Password'}
            isRequired
            type={'password'}
            register={{ ...formRegister.confirmPassword(register, getValues) }}
            error={errors.confirmPassword}
          />
        </div>
        <div className="space-y-5">
          <Button isPrimary isFull isRounded>
            Register
          </Button>
          <p className="text-gray-600 text-center">
            Have an account?{' '}
            <Link href={routes.login}>
              <a className="font-semibold">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default RegistrationModule;
