import React from 'react';
import ImageContainer from '../image-container';
import { ImageCardSkeleton } from '../skeleton';

export const LoadingImage = () => {
  return (
    <div className="py-10">
      <ImageContainer>
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
        <ImageCardSkeleton />
      </ImageContainer>
    </div>
  );
};
