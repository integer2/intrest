import { Button } from '@/components/button';
import { AuthFormContainer } from '@/components/form-container';
import { FormInput } from '@/components/form-input';
import { LoadingNormal } from '@/components/loading-spinner';
import routes from '@/libs/routes';
import API from '@/services/api';
import formRegister from '@/utils/form-register';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgotPasswordModule = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await API().post('/auth/forgot-password', data);
      Cookies.set('recovery_token', result.data.recovery_token);
      Router.replace(routes.recovery);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-10">
        <div className="text-center">
          <h1 className="text-purple-1 text-3xl font-semibold">
            Forgot Password?
          </h1>
          <p className="text-gray-600 font-medium">Enter your email</p>
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
        </div>
        <div className="space-y-5">
          <Button isPrimary isFull isDisabled={loading} type={'submit'}>
            {loading ? <LoadingNormal /> : 'Recover Password'}
          </Button>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default ForgotPasswordModule;
