import { Button } from '@/components/button';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileHeader({ profile }) {
  const { user, isAuthenticated } = useAuth();
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
          {
            (user?.username == profile?.username && (
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
            ))
          }
        </div>
        <div className="flex gap-5 text-purple-1 font-medium">
          <button>{profile?.total_post} Post</button>
          <button>{profile?.total_followed} Follow</button>
          <button>{profile?.total_follower} Followers</button>
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
