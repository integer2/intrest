import UserCard from '@/components/user-card';
import API from '@/services/api';
import { useAuth } from 'context/auth';
import React, { useEffect, useState } from 'react';

const FindNewModule = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [error, setError] = useState(null);

  const handleNewProfile = async () => {
    const result = await API().post('/find-new');
    setListUser(result.data);
  };

  useEffect(() => {
    try {
      handleNewProfile();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className='py-10'>
      <h1 className='font-medium text-dark-1 text-xl'>Find New</h1>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10'>
        {listUser.map((data, index) => {
          return <UserCard key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default FindNewModule;
