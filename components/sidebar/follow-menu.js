import API from '@/services/api';
import { UserAddIcon } from '@heroicons/react/solid';
import dataFollowed from 'data/data-followed';
import React, { useEffect } from 'react';
import MenuGroup from './menu-group';

const FollowMenu = () => {
  const [followedList, setFollowedList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [showedList, setShowedList] = React.useState([]);

  const fetchFollowedList = async () => {
    const result = await API().post('/user/followed/get');
    setFollowedList(result.data.followed);
  };

  useEffect(() => {
    try {
      fetchFollowedList();
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    setShowedList(followedList.slice(0, 5));
  }, [followedList]);

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <MenuGroup
      title={'Followed'}
      datamenu={showedList}
      addtionalMenu={[
        {
          label: 'Find New',
          link: '/find-new',
          icon: UserAddIcon,
        },
      ]}
      isImage
    />
  );
};

export default FollowMenu;
