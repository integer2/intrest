import ImageCard from '@/components/image-card';
import ImageContainer from '@/components/image-container';
import { LoadingImage } from '@/components/loading';
import { ImageCardSkeleton } from '@/components/skeleton';
import API from '@/services/api';
import React, { useEffect, useState } from 'react';

const ExploreModule = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const result = await API().get('/post/get/all', {
      params: {
        limit: 15,
        offset: 0,
      },
    });
    setPosts(result.data.result);
  };

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingImage />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="py-10">
      <h1 className='font-medium text-dark-1 text-xl'>Explore</h1>
      <div className='py-10'>
        <ImageContainer>
          {posts.map((post, index) => {
            return <ImageCard key={index} post={post} />;
          })}
        </ImageContainer>
      </div>
    </div>
  );
};

export default ExploreModule;
