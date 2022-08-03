import { Button } from '@/components/button';
import API from '@/services/api';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProfileHeader() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(undefined);

  const handleFirstVisit = async (username) => {
    const result = await API().get(`/user/${username}`);
    setProfile(result.data.result);
  };

  useEffect(() => {
    try {
      handleFirstVisit(router.query.username);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [router.query.username]);

  if (!loading) {
    if (error) {
      return <div>Error</div>;
    }

    if (!profile) {
      return <div>User not found</div>;
    }

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
                {profile?.username}
              </a>
            </Link>
            {isAuthenticated && (
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
            )}
          </div>
          <div className="flex gap-5 text-purple-1 font-medium">
            <span>{profile?.total_post} Post</span>
            <span>{profile?.total_followed} Follow</span>
            <span>{profile?.total_follower} Followers</span>
          </div>
          <p className="text-dark-1">{profile?.bio}</p>
        </div>
      </div>
    );
  }
}
