import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import API from '@/services/api';
import Router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditPasswordFrom = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const changePassword = async (data) => {
    try {
      const response = await API().post('/accounts/update-password', data);
      toast.success(response.data.message);
      Router.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(changePassword)}>
      <div className="flex flex-col gap-5">
        <FormInput
          label={'old password'}
          type="password"
          isFull
          isRequired
          error={errors.oldPassword}
          register={register('oldPassword', {
            required: {
              value: true,
              message: 'Please enter your old password',
            },
          })}
        />
        <FormInput
          label={'new password'}
          type="password"
          isFull
          isRequired
          error={errors.newPassword}
          register={register('newPassword', {
            required: {
              value: true,
              message: 'Please enter your new password',
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            maxLength: {
              value: 16,
              message: 'Password must be at most 16 characters',
            },
          })}
        />
        <FormInput
          label={'confirm password'}
          type="password"
          isFull
          isRequired
          error={errors.confirmPassword}
          register={register('confirmPassword', {
            required: {
              value: true,
              message: 'Please enter your new password',
            },
            validate: (value) =>
              value === getValues('newPassword') ||
              'New password and confirm password must be the same',
          })}
        />
        <div>
          <Button isPrimary isDisabled={loading}>
            Change Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditPasswordFrom;
