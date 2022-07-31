import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { AuthFormContainer } from '@/components/form-container';
import FormInput from '@/components/form-input/FormInput';
import formRegister from '@/utils/form-register';
import routes from '@/libs/routes';

const LoginModule = () => {
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
        <div className="flex flex-col gap-5">
          <FormInput
            type={'email'}
            label={'Email'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.email(register) }}
            error={errors.email}
          />
          <FormInput
            type={'password'}
            label={'Password'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.password(register) }}
            error={errors.password}
          />
        </div>
        <div className="space-y-5">
          <Button isPrimary isFull isRounded type={'submit'}>
            Login
          </Button>
          <p className="text-gray-600 text-center">
            Don&#39;t have an account yet?{' '}
            <Link href={routes.registration}>
              <a className="font-semibold">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default LoginModule;
