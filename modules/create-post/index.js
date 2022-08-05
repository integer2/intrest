import { Button } from '@/components/button';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhotographIcon } from '@heroicons/react/outline';
import { useModal } from 'hooks/useModal';
import Router from 'next/router';
import API from '@/services/api';
import { toast } from 'react-toastify';

const CreatePostModule = () => {
  const { user } = useAuth();
  const { setIsOpen } = useModal();

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      desc: '',
      image: FileList,
    },
  });

  const uploadPost = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('desc', data.desc);
    formData.append('file', data.image[0]);
    try {
      const result = await API().post('/post/create', formData);
      console.log(result);
      toast.success('Post created successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  const covertToImageUrl = () => {
    const image = watch('image')[0];
    if (image) {
      return URL.createObjectURL(image);
    }
    return '/assets/images/image-not-found.png';
  };

  return (
    <div
      className="bg-white w-full max-w-5xl rounded-lg p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit(uploadPost)}
        className="flex relative gap-10"
      >
        <div className="h-[450px] w-[450px] relative">
          <label
            htmlFor="upload-image"
            className="relative h-full w-full flex items-center justify-center cursor-pointer"
          >
            {watch('image')[0] ? (
              <Image
                layout="fill"
                src={covertToImageUrl()}
                alt="upload-image"
                objectFit="cover"
              />
            ) : (
              <span className="flex flex-col items-center justify-center">
                <PhotographIcon className="h-20 w-20 text-gray-2" />
                <span className="bg-white border border-purple-1 px-4 py-1 text-purple-1 block rounded-md font-medium mt-6">
                  Select From Computer
                </span>
              </span>
            )}
          </label>
          <input
            type="file"
            id="upload-image"
            className="sr-only"
            accept="image/png, image/jpeg, image/jpg"
            disabled={loading}
            {...register('image', {
              required: { message: 'Image is required', value: true },
            })}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between space-y-3 relative">
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 relative rounded-full overflow-clip">
                <Image
                  src={user?.img_url || '/assets/images/image-not-found.png'}
                  alt="image-profile"
                  layout="fill"
                />
              </div>
              <p className="text-lg font-medium ml-2">{user?.username}</p>
            </div>
            <div className="border-b-2">
              <textarea
                rows={10}
                className="w-full block py-1 resize-none focus:outline-none"
                placeholder="What do you want to talk about?"
                disabled={loading}
                {...register('desc', {
                  required: { message: 'Description is required', value: true },
                  maxLength: {
                    message: 'Description is too long',
                    value: 2200,
                  },
                })}
              ></textarea>
              <div className="flex justify-end py-2">
                {/* create max length counter */}
                <span className="text-sm text-gray-600">
                  {watch('desc')?.length}/2200
                </span>
              </div>
            </div>
            <div className="py-1">
              {errors.desc && (
                <span className="text-red-500 text-sm block">
                  {errors.desc.message}
                </span>
              )}
              {errors.image && (
                <span className="text-red-500 text-sm block">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2 justify-end">
            <Button
              type={'button'}
              onClick={handleCancel}
              isPrimary
              className={'bg-white border-red-1 text-red-1'}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button isPrimary type={'submit'} isDisabled={loading}>
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostModule;
