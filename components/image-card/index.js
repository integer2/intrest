import Image from 'next/image';
import React from 'react';

const ImageCard = ({post}) => {
  return (
    <div className="aspect-square w-full relative cursor-pointer" onClick={() => {console.log(post)}}>
      <Image
        src={post?.post_img || '/assets/images/image-not-found.png'}
        layout={'fill'}
        objectFit="cover"
        alt="image"
      />
    </div>
  );
};

export default ImageCard;
