import SubscriptionButton from '@/components/subscription-button';
import API from '@/services/api';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React, { useEffect } from 'react';

const FollowedModal = ({ user, closeModal }) => {
  const [followers, setFollowers] = React.useState([]);

  const getFollowers = async () => {
    const res = await API().post('/user/followed/get');
    setFollowers(res.data.followed);
  };

  useEffect(() => {
    try {
      getFollowers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white min-w-[540px] rounded-md min-h-[320px] max-h-[320px] h-full py-5 overflow-y-auto"
    >
      <div className="relative">
        <div className="sticky top-0 flex items-center border-b-2 px-5 pb-5 bg-white z-10">
          <h2 className="font-medium text-xl flex-1">Followed</h2>
          <button onClick={closeModal}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-5 pt-5">
          <div className="space-y-3">
            {followers.map((data, index) => {
              return (
                <div className="flex items-center gap-5" key={index}>
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={data?.img_url || '/assets/images/no-profile.jpg'}
                      layout={'fill'}
                      alt="user_avatar"
                    />
                  </div>
                  <p className="font-medium max-w-[24ch] text-ellipsis whitespace-nowrap overflow-hidden">
                    {data.username}
                  </p>
                  <div className="ml-auto">
                    <SubscriptionButton
                      follower_id={user.id}
                      user_id={data.id}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedModal;
