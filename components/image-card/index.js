import { useModal } from 'hooks/useModal';
import Image from 'next/image';
import React from 'react';
import PostDetail from '../post-detail';

const ImageCard = ({ post }) => {
  const modal = useModal();

  const handleOnClick = (e) => {
    modal.setIsOpen(true);
    modal.setContent(<PostDetail post={post} />);
  };

  return (
    <div
      className="aspect-square w-full relative cursor-pointer bg-gray-300"
      onClick={handleOnClick}
    >
      <Image
        src={
          post?.post_img ||
          post?.img_url ||
          '/assets/images/image-not-found.png'
        }
        layout={'fill'}
        objectFit="cover"
        alt="image"
      />
    </div>
  );
};

export default ImageCard;
