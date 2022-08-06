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

export const LoadingFollowedSidebar = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full shrink-0"></div>
        <div className="w-full h-5 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-5">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full shrink-0"></div>
        <div className="w-full h-5 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-5">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full shrink-0"></div>
        <div className="w-full h-5 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-5">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full shrink-0"></div>
        <div className="w-full h-5 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-5">
        <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full shrink-0"></div>
        <div className="w-full h-5 rounded-md bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};
