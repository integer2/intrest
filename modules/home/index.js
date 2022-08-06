import ImageCard from '@/components/image-card';
import ImageContainer from '@/components/image-container';
import API from '@/services/api';
import { useAuth } from 'context/auth';
import React, { useEffect, useState } from 'react';

const HomeModule = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const handleFetchPosts = async () => {
    const response = await API().post('/post/home');
    setPosts(response.data.posts);
  };

  useEffect(() => {
    try {
      handleFetchPosts();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="py-10">
      <ImageContainer>
        {posts.map((post, index) => {
          return <ImageCard key={index} post={post} profile={user} />;
        })}
      </ImageContainer>
    </div>
  );
};

export default HomeModule;
