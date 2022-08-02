import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { AuthFormContainer } from '@/components/form-container';
import { FormInput } from '@/components/form-input';
import formRegister from '@/utils/form-register';
import routes from '@/libs/routes';
import { toast } from 'react-toastify';
import { LoadingNormal } from '@/components/loading-spinner';
import useLoading from 'hooks/useLoading';
import Router from 'next/router';
import { useAuth } from 'context/auth';

const LoginModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = useAuth();

  const [loading, setLoading] = useLoading(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await auth.login(data);
      Router.replace(routes.home);
    } catch (error) {
      console.log(error)
      toast.error('Login unsuccessful');
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
            type={'email'}
            label={'Email'}
            id={'email'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.email(register) }}
            error={errors.email}
          />
          <FormInput
            type={'password'}
            label={'Password'}
            id={'password'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.password(register) }}
            error={errors.password}
          />
        </div>
        <div className="space-y-5">
          <Button
            isPrimary
            isFull
            isDisabled={loading}
            type={'submit'}
          >
            {loading ? <LoadingNormal /> : 'Login'}
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
