import { Button } from '@/components/button';
import Image from 'next/image';

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-8">
      <div className="max-w-[120px] aspect-square relative w-full rounded-full border overflow-hidden">
        <Image
          src="/assets/images/no-profile.jpg"
          layout="fill"
          objectFit="cover"
          alt="user-profile"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-medium text-dark-1">ichsnn</h2>
          <Button className={'border-dark-4 text-dark-4 px-2 py-1'}>
            Edit Profile
          </Button>
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
