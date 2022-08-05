import Image from 'next/image';
import React from 'react';
import { Button } from '../button';
import { useAuth } from 'context/auth';
import { useModal } from 'hooks/useModal';
import SubscriptionButton from '../subscription-button';

const PostDetail = ({ post }) => {
  const { user } = useAuth();
  return (
    <div
      className="h-[490px] bg-white flex items-center p-5 gap-14 w-full max-w-6xl relative rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-w-[450px] max-h-[450px] aspect-square relative h-full w-full flex-1">
        <Image
          src={post?.post_img || '/assets/images/image-not-found.png'}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="self-start flex-1 h-full flex flex-col w-full max-w-[500px] min-w-[600px] relative">
        <div className="flex items-center justify-between w-full border-b pb-4">
          <div className="flex gap-4 items-center font-medium text-lg">
            <div className="h-10 w-10 relative rounded-full overflow-clip ">
              <Image
                src={post?.profile_img || '/assets/images/no-profile.jpg'}
                alt={'alt'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {post?.username}
          </div>
          {user?.username !== post?.username && <SubscriptionButton />}
        </div>
        <div className="text-lg py-4 flex">
          <div className="relative h-6 w-6 inline-flex mr-2 rounded-full overflow-clip">
            <Image
              src={post?.profile_img || '/assets/images/no-profile.jpg'}
              layout={'fill'}
              alt={'post'}
            />
          </div>
          <span className="font-semibold">{post?.username}</span>{' '}
          {post?.desc?.split('\n').map((item, index) => {
            return (
              <span key={index}>
                {item}
                <br />{' '}
              </span>
            );
          }) || 'No Description'}
        </div>
        <div className="absolute bottom-0 bg-white w-full">
          <form
            className="flex group px-4 bg-gray-6"
            onClick={(e) => e.preventDefault()}
          >
            <textarea
              rows={1}
              type={'text'}
              className="w-full bg-gray-6 rounded-sm placeholder:text-gray-1 py-2 focus:outline-none focus:group-focus:outline-purple-1 resize-none"
              placeholder="Add a Comment..."
            ></textarea>
            <Button isSmall className={'bg-gray-6 text-purple-1'} isBorderless>
              Comment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
