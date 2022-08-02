import { Button } from '@/components/button';
import { MainLayout } from '@/components/layout';
import { authPage } from '@/middlewares/authorizationPage';
import Image from 'next/image';
import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import { FormInput } from '@/components/form-input';

export const getServerSideProps = async (ctx) => {
  const auth = await authPage(ctx);

  return {
    props: {},
  };
};

const AccountPage = () => {
  return (
    <MainLayout>
      <div className="border-2 px-20 py-10 rounded-md bg-white mb-10">
        <h1 className='text-3xl mb-5 border-b ml-56 py-2 font-semibold'>My Profile</h1>
        <div className="flex gap-20 ">
          <div className="relative">
            <h3 className="mb-4 font-medium text-dark-1 text-center">
              Profile Picture
            </h3>
            <div className="relative">
              <div className="h-[150px] w-[150px] relative rounded-full overflow-hidden">
                <Image
                  src={'/assets/images/no-profile.jpg'}
                  layout="fill"
                  alt="user-image"
                />
              </div>
              <Button
                className="absolute -right-4 bottom-4 px-2 py-1 rounded-lg gap-1"
                isSecondary
              >
                <PencilIcon className="w-4 h-4" /> Edit
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <form className="w-full">
              <div className="flex flex-col gap-5">
                <FormInput label={'name'} isFull />
                <FormInput label={'username'} isFull isRequired/>
                <FormInput label={'bio'} isFull />
                <FormInput label={'birthday'} isFull />
                <FormInput label={'email'} isFull isRequired/>
                <div>
                  <Button isPrimary>Save</Button>
                </div>
              </div>
            </form>
            <div className="mt-8 pt-8 border-t-2">
              <h2 className="text-xl font-medium mb-4">Change Password</h2>
              <form className="w-full">
                <div className="flex flex-col gap-5">
                  <FormInput label={'old password'} isFull isRequired/>
                  <FormInput label={'new password'} isFull isRequired/>
                  <FormInput label={'confirm password'} isFull isRequired/>
                  <div>
                    <Button isPrimary isDisabled>Change Password</Button>
                  </div>
                </div>
              </form>
              <button className="text-purple-1 font-medium mt-5">
                Forgot Password ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
