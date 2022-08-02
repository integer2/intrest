import Image from 'next/image';
import React from 'react';

const ImageCard = () => {
  return (
    <div className="aspect-square w-full relative">
      <Image
        src={'/assets/images/no-profile.jpg'}
        layout={'fill'}
        objectFit="cover"
        alt="image"
      />
    </div>
  );
};

export default ImageCard;
