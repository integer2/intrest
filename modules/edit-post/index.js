import { Button } from '@/components/button';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhotographIcon } from '@heroicons/react/outline';
import { useModal } from 'hooks/useModal';
import API from '@/services/api';
import { toast } from 'react-toastify';

const EditPostModule = ({ post }) => {
  const { user } = useAuth();
  const { setIsOpen } = useModal();

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  console.log(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      desc: post.desc,
    },
  });

  const editPost = async (data) => {
    console.log(data);
    try {
      // const result = await API().post('/post/create', formData);
      // console.log(result);
      toast.success('Post created successfully');
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-white w-full max-w-5xl rounded-lg p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(editPost)} className="flex relative gap-10">
        <div className="h-[450px] w-[450px] relative">
          <label
            htmlFor="upload-image"
            className="relative h-full w-full flex items-center justify-center"
          >
            <Image
              layout="fill"
              src={post.post_img}
              alt="upload-image"
              objectFit="cover"
            />
          </label>
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
              isLarge
            >
              Cancel
            </Button>
            <Button isPrimary type={'submit'} isDisabled={loading} isLarge>
              Edit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPostModule;
