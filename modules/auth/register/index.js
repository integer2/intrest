import React from 'react';
import { AuthFormContainer } from '@/components/form-container';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import Link from 'next/link';
import routes from '@/libs/routes';
import { FormInput } from '@/components/form-input';
import formRegister from '@/utils/form-register';
import API from '@/services/api';
import { toast } from 'react-toastify';
import useLoading from 'hooks/useLoading';
import { LoadingNormal } from '@/components/loading-spinner';
import Router from 'next/router';

const RegisterModule = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useLoading(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await API().post('/auth/register', data);
      toast.success(result.data.message);
      Router.push(routes.login);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
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
          <Button isPrimary isFull isDisabled={loading}>
            {loading ? <LoadingNormal /> : 'Register'}
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

export default RegisterModule;
