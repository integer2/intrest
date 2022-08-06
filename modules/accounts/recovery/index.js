import { Button } from '@/components/button';
import { AuthFormContainer } from '@/components/form-container';
import { FormInput } from '@/components/form-input';
import { LoadingNormal } from '@/components/loading-spinner';
import formRegister from '@/utils/form-register';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Image from 'next/image';
import API from '@/services/api';
import { toast } from 'react-toastify';
import Router from 'next/router';
import routes from '@/libs/routes';
import { useAuth } from 'context/auth';

const RecoveryAccountModule = () => {
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(null);
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const fetchUserProfile = async () => {
    const cookies = Cookies.get('recovery_token');
    const result = await API(cookies).post('/auth/user');
    setProfile(result.data);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const cookies = Cookies.get('recovery_token');
      await API(cookies).post('/accounts/recovery-password', {
        newPassword: data.password,
      });
      Cookies.remove('recovery_token');
      logout();

      Router.replace(routes.login);
      toast.success('Recovery successful');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetchUserProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-10 justify-center">
        <div className="space-y-5">
          <div className="relative h-28 w-28 rounded-full mx-auto overflow-clip">
            <Image
              src={profile.img_url || '/assets/images/no-profile.jpg'}
              layout="fill"
              objectFit="cover"
              alt="profile"
            />
          </div>
          <h2 className="text-center">
            <span className="text-purple-1 text-xl font-semibold">
              {profile.username}
            </span>
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <FormInput
            type={'password'}
            label={'New Password'}
            id={'password'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.password(register) }}
            error={errors.password}
          />
          <FormInput
            type={'password'}
            label={'Confirm New Password'}
            id={'confirm-password'}
            isBlock
            isRequired
            isFull
            register={{ ...formRegister.confirmPassword(register, getValues) }}
            error={errors.confirmPassword}
          />
        </div>
        <div className="space-y-5">
          <Button isPrimary isFull isDisabled={loading} type={'submit'}>
            {loading ? <LoadingNormal /> : 'Change Password'}
          </Button>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default RecoveryAccountModule;
