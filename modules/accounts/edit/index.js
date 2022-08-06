import API from '@/services/api';
import { useAuth } from 'context/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EditImage from './components/edit-image';
import EditPasswordFrom from './components/edit-password-form';
import EditProfileForm from './components/edit-profile-form';
import { useNewImage } from './hooks';

const EditAccountsModule = () => {
  const { user, getUser } = useAuth();

  const { setNewImage, newImage } = useNewImage();

  const [imgUrl, setImageUrl] = useState(user.img_url);

  const onEditImage = (e) => {
    if (e.target.files[0]) {
      // check file size
      if (e.target.files[0].size > 1000000) {
        toast.error('Image size must be less than 1MB');
        return;
      }
      const image = e.target.files[0];
      setNewImage(image);
      const newImageUrl = URL.createObjectURL(image);
      setImageUrl(newImageUrl);
    }
  };

  const submitEditProfile = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('bio', data.bio);
    formData.append('birthday', data.birthday);
    formData.append('gender', data.gender);
    formData.append('email', data.email);
    formData.append('current_img_url', data.img_url);
    if (newImage) {
      formData.append('file', newImage);
    }
    try {
      await API().post('/accounts/edit-profile', formData);
      await getUser();
      toast.success('Your account has been updated');
    } catch (error) {
      toast.error('Something went wrong');
    }
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
          <EditImage img_url={imgUrl} onEdit={onEditImage} />
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
