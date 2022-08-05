import Image from 'next/image';
import React from 'react';
import { Button } from '../button';
import { useAuth } from 'context/auth';
import SubscriptionButton from '../subscription-button';

const PostDetail = ({ post }) => {
  const { user } = useAuth();
  return (
    <div
      className="h-[490px] bg-white flex items-center p-5 gap-8 w-full max-w-6xl relative rounded-lg overflow-hidden"
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
      <div
        id="post-detail"
        className="self-start flex-1 h-full flex flex-col w-full max-w-[500px] min-w-[600px] relative overflow-y-scroll"
      >
        <div className="sticky top-0 bg-white z-50 flex items-center justify-between w-full border-b pb-4">
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
        <div className="text-base py-4 flex gap-2 scroll-smooth">
          <div className="relative h-8 w-8 inline-flex mr-2 shrink-0 rounded-full overflow-clip">
            <Image
              src={post?.profile_img || '/assets/images/no-profile.jpg'}
              layout={'fill'}
              alt={'post'}
            />
          </div>
          <div>
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
        </div>
        {/* Comments */}
        <section>
          <div>

          </div>
        </section>
        <div className="sticky bottom-0 mt-auto bg-white w-full pt-4 border-t">
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
