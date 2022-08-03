import { Button } from '@/components/button';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex-shrink-0 flex-grow-0 w-[120px] h-[120px] relative rounded-full border overflow-hidden">
        <Image
          src="/assets/images/no-profile.jpg"
          layout="fill"
          objectFit="cover"
          alt="user-profile"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <Link href="/user/[username]" as={`/user/${'ichsnn'}`}>
            <a className="text-2xl font-medium text-dark-1">ichsnn</a>
          </Link>
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
        </div>
        <div className="flex gap-5 text-purple-1 font-medium">
          <span>6 Post</span>
          <span>2 Follow</span>
          <span>2 Followers</span>
        </div>
        <div className="text-dark-1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
          possimus, delectus obcaecati tempore hic eaque quia quo fuga
          dignissimos voluptatem nobis? Eos quam nostrum dignissimos aliquid
          deserunt cumque molestiae mollitia!
        </div>
      </div>
    </div>
  );
}
