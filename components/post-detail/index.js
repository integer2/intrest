import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { useAuth } from 'context/auth';
import SubscriptionButton from '../subscription-button';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import DotsButton from './DotsButton';
import API from '@/services/api';
import LikeButton from '../like-button';
import { HeartIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const PostDetail = ({ post }) => {
  const { user } = useAuth();

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [isLiked, setIsLiked] = React.useState(false);
  const [showLove, setShowLove] = React.useState(false);

  const fetchPost = async (post) => {
    try {
      const result = await API().post(`/post/get`, {
        post_id: post?.post_id || post.id,
      });
      setPostData(result.data);
    } catch (error) {}
  };

  const fetchProfile = async (username) => {
    try {
      const result = await API().get(`/user/${username}`);
      setProfile(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDoubleTap = (e) => {
    if (e.detail === 2) {
      clearTimeout(() => {
        setShowLove(false);
      }, 1000);
      setShowLove(false);
      setIsLiked(true);
      setShowLove(true);
      setTimeout(() => {
        setShowLove(false);
      }, 1000);
    }
  };

  useEffect(() => {
    try {
      if (!post) {
        setError('Post not found');
      }
      fetchPost(post);
      fetchProfile(post.username);
    } catch (error) {}
    setLoading(false);
  }, [post]);

  if (loading) {
    return <p>Loading</p>;
  }
  if (!post) {
    return <p>No post found</p>;
  }

  if (!postData) {
    return <p>No post found</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="h-[490px] bg-white flex items-center p-5 gap-8 w-full max-w-6xl relative rounded-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="max-w-[450px] max-h-[450px] aspect-square relative h-full w-full flex-1"
        onClick={handleDoubleTap}
      >
        <Image
          src={postData?.img_url || '/assets/images/image-not-found.png'}
          alt=""
          layout="fill"
          objectFit="cover"
        />
        {showLove && (
          <div className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <LikedPopUp />
          </div>
        )}
      </div>
      <div
        id="post-detail"
        className="self-start flex-1 h-full flex flex-col w-full max-w-[500px] min-w-[600px] relative overflow-y-scroll"
      >
        <div className="sticky top-0 bg-white z-50 flex items-center justify-between w-full border-b pb-4">
          <div className="flex">
            <div className="flex gap-4 items-center font-medium text-lg">
              <div className="h-10 w-10 relative rounded-full overflow-clip ">
                <Image
                  src={profile?.img_url || '/assets/images/no-profile.jpg'}
                  alt={'alt'}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {profile?.username}
            </div>
          </div>
          {user?.username !== postData?.username && (
            <SubscriptionButton
              follower_id={user?.id}
              user_id={post?.author_id || post?.user_id}
            />
          )}
          {postData?.username === user.username && (
            <>
              <DotsButton post={postData} />
            </>
          )}
        </div>
        <div className="text-base py-4 flex gap-2 scroll-smooth">
          <div className="relative h-8 w-8 inline-flex mr-2 shrink-0 rounded-full overflow-clip">
            <Image
              src={profile?.img_url || '/assets/images/no-profile.jpg'}
              layout={'fill'}
              alt={'post'}
            />
          </div>
          <div>
            <span className="font-semibold">{postData?.username}</span>{' '}
            {postData?.desc?.split('\n').map((item, index) => {
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
          <div></div>
        </section>
        <div className="sticky bottom-0 mt-auto bg-white w-full pt-4 border-t">
          <div className="flex items-center gap-5">
            <div>
              <LikeButton onClick={handleLike} isLiked={isLiked} />
            </div>
            <form
              className="flex group px-4 bg-gray-6 flex-1"
              onClick={(e) => e.preventDefault()}
            >
              <textarea
                rows={1}
                type={'text'}
                className="w-full bg-gray-6 rounded-sm placeholder:text-gray-1 py-2 focus:outline-none focus:group-focus:outline-purple-1 resize-none"
                placeholder="Add a Comment..."
              ></textarea>
              <Button
                isSmall
                className={'bg-gray-6 text-purple-1'}
                isBorderless
              >
                Comment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

const LikedPopUp = () => {
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <HeartIcon
      className={classNames(
        'h-20 w-20 transition-all ease-in text-purple-1',
        show ? 'scale-100' : 'scale-125'
      )}
    />
  );
};
