import API from '@/services/api';
import { UserAddIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { Button } from '../button';

export default function SubscriptionButton({ follower_id, user_id }) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubscription = async (follower_id, user_id) => {
    const result = await API().post('/user/followed', {
      follower_id,
      user_id,
    });
    setFollowed(result.data.isFollowed);
  };

  const handleClick = async (e) => {
    e.stopPropagation();
    await API().post('/user/follow', {
      user_id,
    });
    setFollowed(!followed);
  };

  useEffect(() => {
    try {
      handleSubscription(follower_id, user_id);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [followed, follower_id, user_id]);

  if (!loading) {
    if (followed) {
      return <UnfollowButton onClick={handleClick} />;
    } else {
      return <FollowButton onClick={handleClick} />;
    }
  } else {
    return <p>Loading</p>;
  }
}

export const FollowButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      isPrimary
      isSmall
      className={'gap-2 rounded-md px-3 py-2'}
    >
      <UserAddIcon className="h-5 w-5" />
      Follow
    </Button>
  );
};

export const UnfollowButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      isSecondary
      isSmall
      className={'gap-2 rounded-md px-3 py-2'}
    >
      <UserAddIcon className="h-5 w-5" />
      Unfollow
    </Button>
  );
};
