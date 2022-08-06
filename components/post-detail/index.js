import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { useAuth } from 'context/auth';
import SubscriptionButton from '../subscription-button';
import DotsButton from './DotsButton';
import API from '@/services/api';
import LikeButton from '../like-button';
import { HeartIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { useModal } from 'hooks/useModal';

const PostDetail = ({ post }) => {
  const { user } = useAuth();

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [isLiked, setIsLiked] = React.useState(false);
  const [showLove, setShowLove] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [deleteComment, setDeleteComment] = React.useState({
    show: false,
    comment_id: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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

  const fetchComments = async (post_id) => {
    try {
      const result = await API().post(`/post/comments/get`, {
        post_id,
      });
      setComments(result.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsLiked = async (post) => {
    const result = await API().post('/post/liked', {
      post_id: post?.post_id || post.id,
    });
    setIsLiked(result.data.isLiked);
  };

  const handleLike = async () => {
    await API().post('/post/like-post', {
      post_id: post?.post_id || post.id,
    });
    setIsLiked(!isLiked);
  };

  const clickDeleteCommentButton = (comment_id) => {
    setDeleteComment({
      show: true,
      comment_id,
    });
  };

  const handleClickDeleteComment = async (comment_id) => {
    await API().post('/post/comments/delete', {
      comment_id,
    });
    setDeleteComment({
      show: false,
      comment_id: '',
    });
    await fetchComments(post?.post_id || post.id);
  };

  const handleDoubleTap = (e) => {
    if (e.detail === 2) {
      clearTimeout(() => {
        setShowLove(false);
      }, 1000);
      setShowLove(false);
      setIsLiked(true);
      setShowLove(true);
      if (!isLiked) {
        handleLike();
      }
      setTimeout(() => {
        setShowLove(false);
      }, 1000);
    }
  };

  const handleAddComments = async (data) => {
    const result = await API().post('/post/comments/add', {
      post_id: post?.post_id || post.id,
      comment: data.comment,
    });
    await fetchComments(post?.post_id || post.id);
    setValue('comment', '');
  };

  useEffect(() => {
    try {
      if (!post) {
        setError('Post not found');
      }
      fetchPost(post);
      fetchProfile(post.username);
      checkIsLiked(post);
      fetchComments(post.post_id || post.id);
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
        <div className="text-base py-4 flex gap-5 scroll-smooth">
          <div className="relative h-8 w-8 shrink-0 rounded-full overflow-clip">
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
            <div>
              <span className="text-sm text-gray-600">
                {moment(postData?.created_at).fromNow()}
              </span>
            </div>
          </div>
        </div>
        {/* Comments */}
        <section>
          <div>
            {comments.map((comment, index) => {
              return (
                <div
                  className="text-base py-4 flex gap-5 scroll-smooth"
                  key={index}
                >
                  <div className="relative h-8 w-8 shrink-0 rounded-full overflow-clip">
                    <Image
                      src={comment?.img_url || '/assets/images/no-profile.jpg'}
                      layout={'fill'}
                      alt={'post'}
                    />
                  </div>
                  <div>
                    <span className="font-semibold">{comment?.username}</span>{' '}
                    {comment?.comment?.split('\n').map((item, index) => {
                      return (
                        <span key={index}>
                          {item}
                          <br />{' '}
                        </span>
                      );
                    }) || 'No Description'}
                    <div className="flex gap-2 items-center">
                      {comment.id === user.id && (
                        <button
                          onClick={() =>
                            clickDeleteCommentButton(comment.comment_id)
                          }
                          className="text-sm text-red-1 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                      <span className="text-sm text-gray-600">
                        {moment(comment?.comment_updated).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div className="sticky bottom-0 mt-auto bg-white w-full pt-4 border-t">
          <div className="flex items-center gap-5">
            <div>
              <LikeButton onClick={handleLike} isLiked={isLiked} />
            </div>
            <form
              className="flex group px-4 bg-gray-6 flex-1"
              onSubmit={handleSubmit(handleAddComments)}
            >
              <textarea
                rows={1}
                type={'text'}
                className="w-full bg-gray-6 rounded-sm placeholder:text-gray-1 py-2 focus:outline-none focus:group-focus:outline-purple-1 resize-none"
                placeholder="Add a Comment..."
                {...register('comment', { required: true, maxLength: 200 })}
              ></textarea>
              <Button
                isSmall
                className={classNames(
                  'bg-gray-6 text-purple-1',
                  errors.comment && 'text-red-1'
                )}
                isBorderless
                type={'submit'}
              >
                Comment
              </Button>
            </form>
          </div>
        </div>
      </div>
      {deleteComment.show && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 h-screen w-full flex items-center justify-center z-50"
          onClick={() => setDeleteComment({ show: false })}
        >
          <div
            className="bg-white p-5 min-w-[320px] rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-semibold mb-2 text-lg">Delete this comment?</h2>
            <p className="mb-4">The comment delete permanently!</p>
            <div className="flex justify-end gap-3">
              <Button
                isSmall
                className={'bg-white border-purple-1 text-purple-1'}
                onClick={() => setDeleteComment({ show: false })}
              >
                Cancel
              </Button>
              <Button
                isSmall
                className={'bg-red-1 text-white border-red-1'}
                onClick={() =>
                  handleClickDeleteComment(deleteComment.comment_id)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
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
        'h-20 w-20 transition-all ease-in text-purple-1 text-opacity-70',
        show ? 'scale-100' : 'scale-125'
      )}
    />
  );
};
