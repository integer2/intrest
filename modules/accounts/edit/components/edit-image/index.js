import { PencilIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';

const EditImage = () => {
  return (
    <div className="relative">
      <div className="h-[150px] w-[150px] relative rounded-full overflow-hidden">
        <Image
          src={'/assets/images/no-profile.jpg'}
          layout="fill"
          alt="user-image"
        />
      </div>
      <label
        htmlFor="edit-image"
        className="flex gap-1 absolute -right-4 bottom-4 rounded-md border px-2 py-1 bg-white border-purple-1 text-purple-1 text-sm font-medium items-center"
      >
        <PencilIcon className="h-4 w-4" />
        Edit
      </label>
      <input
        type="file"
        id="edit-image"
        accept="image/jpeg, image/png, image/webp"
        className="sr-only"
      />
    </div>
  );
};

export default EditImage;
