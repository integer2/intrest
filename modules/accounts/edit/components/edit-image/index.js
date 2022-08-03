import { PencilIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';

const EditImage = ({ img_url, onEdit }) => {
  return (
    <div className="relative">
      <div className="h-[150px] w-[150px] relative rounded-full overflow-hidden border-2">
        <Image
          src={img_url || '/assets/images/no-profile.jpg'}
          layout="fill"
          alt="user-image"
          objectFit="cover"
        />
      </div>
      <label
        htmlFor="edit-image"
        className="flex gap-1 absolute -right-4 bottom-4 rounded-md border px-2 py-1 bg-white border-purple-1 text-purple-1 text-sm font-medium items-center cursor-pointer"
      >
        <PencilIcon className="h-4 w-4" />
        Edit
      </label>
      <input
        type="file"
        id="edit-image"
        accept="image/jpeg, image/png, image/webp"
        className="sr-only"
        onChange={onEdit}
      />
    </div>
  );
};

export default EditImage;
