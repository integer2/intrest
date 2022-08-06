import { Button } from '@/components/button';
import SubscriptionButton, {
  FollowButton,
} from '@/components/subscription-button';
import { useAuth } from 'context/auth';
import { useModal } from 'hooks/useModal';
import Image from 'next/image';
import Link from 'next/link';
import FollowedModal from '../followed-modal';
import FollowersModal from '../followers-modal';

export default function ProfileHeader({ profile }) {
  const { user } = useAuth();
  const modal = useModal();

  const closeModal = () => {
    modal.setIsOpen(false);
  };

  const openFollowersModal = () => {
    modal.setIsOpen(true);
    modal.setContent(<FollowersModal closeModal={closeModal} />);
  };

  const openFollowedModal = () => {
    modal.setIsOpen(true);
    modal.setContent(<FollowedModal closeModal={closeModal} />);
  };

  return (
    <div className="flex items-center gap-8">
      <div className="flex-shrink-0 flex-grow-0 w-[120px] h-[120px] relative rounded-full border overflow-hidden">
        <Image
          src={profile?.img_url || '/assets/images/no-profile.jpg'}
          layout="fill"
          objectFit="cover"
          alt="user-profile"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <Link href="/user/[username]" as={`/user/${'ichsnn'}`}>
            <a className="text-2xl font-medium text-dark-1">
              {profile?.username || '{username}'}
            </a>
          </Link>
          {user?.username == profile?.username ? (
            <Link href={'/accounts/edit'}>
              <a>
                <Button
                  type={'button'}
                  className={'border-dark-4 text-dark-4'}
                  isSmall
                >
                  Edit Profile
                </Button>
              </a>
            </Link>
          ) : (
            <SubscriptionButton follower_id={user?.id} user_id={profile?.id} />
          )}
        </div>
        <div className="flex gap-5 text-purple-1 font-medium">
          <p>{profile?.total_post} Post</p>
          <button onClick={openFollowedModal}>
            {profile?.total_followed} Followed
          </button>
          <button onClick={openFollowersModal}>
            {profile?.total_follower} Followers
          </button>
        </div>
        <p className="text-dark-1">
          {
            // parseing newlines to with span
            profile?.bio?.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            )) || ''
          }
        </p>
      </div>
    </div>
  );
}
