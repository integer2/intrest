import { useAuth } from 'context/auth';
import React from 'react';
import EditImage from './components/edit-image';
import EditPasswordFrom from './components/edit-password-form';
import EditProfileForm from './components/edit-profile-form';

const EditAccountsModule = () => {
  const { user } = useAuth();
  const submitEditProfile = (data) => {
    console.log(data);
  };

  const submitEditPassword = (data) => {
    console.log(data);
  };

  return (
    <div className="border-2 px-20 py-10 rounded-md bg-white mb-10">
      <h1 className="text-3xl mb-5 border-b ml-56 py-2 font-semibold">
        Edit Profile
      </h1>
      <div className="flex gap-20 ">
        <div className="relative">
          <h3 className="mb-4 font-medium text-dark-1 text-center">
            Profile Picture
          </h3>
          <EditImage img_url={user.img_url} />
        </div>
        <div className="flex-1">
          <EditProfileForm onSubmit={submitEditProfile} user={user} />
          <div className="mt-8 pt-8 border-t-2">
            <h2 className="text-xl font-medium mb-4">Change Password</h2>
            <EditPasswordFrom onSubmit={submitEditPassword} />
            <button className="text-purple-1 font-medium mt-5">
              Forgot Password ?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountsModule;
