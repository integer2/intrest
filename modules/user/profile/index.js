import React from 'react';
import ProfileHeader from './components/profile-header';
import { ViewGridIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import ImageContainer from '@/components/image-container';
import ImageCard from '@/components/image-card';

const UserProfileModule = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="sticky top-0 border-b-2 py-8 z-10 bg-main w-full">
        <ProfileHeader />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center text-xl gap-2 font-medium">
          <ViewGridIcon className="h-5 w-5" />
          <span>Post</span>
        </div>
        <div>
          <ImageContainer>
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
          </ImageContainer>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModule;
