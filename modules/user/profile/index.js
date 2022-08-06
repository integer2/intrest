import React, { useEffect, useState } from 'react';
import ProfileHeader from './components/profile-header';
import { ViewGridIcon } from '@heroicons/react/outline';
import ImageContainer from '@/components/image-container';
import { useRouter } from 'next/router';
import API from '@/services/api';
import ImageCard from '@/components/image-card';
import UserNotFound from '@/components/user-not-found';

const UserProfileModule = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(undefined);
  const [post, setPost] = useState([]);

  const handleFetchProfile = async (username) => {
    const result = await API().get(`/user/${username}`);
    setProfile(result.data.result);
  };

  const handleFetchPost = async (username) => {
    const result = await API().get(`/user/${username}/post`);
    setPost(result.data.result);
  };

  useEffect(() => {
    try {
      handleFetchProfile(router.query.username).then(() => {
        handleFetchPost(router.query.username);
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [router.query.username]);

  // update post every time user create new post on the same page
  useEffect(() => {
    handleFetchPost(router.query.username);
  } ,[router.query.username]);

  if (!loading) {
    if (!profile) {
      return <UserNotFound />;
    }
    return (
      <div className="flex flex-col gap-16">
        <div className=" top-0 py-8 z-10 bg-main w-full">
          <ProfileHeader profile={profile} />
        </div>
        <div className="flex flex-col gap-8 pb-10">
          <div className="flex items-center text-xl gap-2 font-medium">
            <ViewGridIcon className="h-5 w-5" />
            <span>Post</span>
          </div>
          <div>
            <ImageContainer>
              {post?.map((data, index) => {
                return <ImageCard key={index} profile={profile} post={data} />;
              }) || 'No Post'}
            </ImageContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfileModule;
