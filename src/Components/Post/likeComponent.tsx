import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";

interface likeProps {
  post: any;
}

export function LikeComponent({ post }: likeProps) {
  const { liked, likeId, createLike, deleteLike, getLike } = usePostsContext();
  const { user } = useUserContext();

  useEffect(() => {}, []);

  function handleLikeChange(post) {
    getLike(post?.id, user?.id);
    console.log(liked);

    if (liked) {
      return (
        <div
          className="cursor-pointer"
          onClick={() => {
            deleteLike(likeId);
          }}
        >
          <FcLike fontSize={20} cursor={"pointer"} />{" "}
          {`(${post?.Likes.length})`}
        </div>
      );
    } else {
      return (
        <div className="flex space-x-[0.05rem]">
          <FcLikePlaceholder
            fontSize={20}
            className="cursor-pointer"
            onClick={() => {
              createLike(post, user?.id);
            }}
          />
          <p className="text-red-200 text-sm">{`(${post?.Likes.length})`}</p>
        </div>
      );
    }
  }

  return <>{handleLikeChange(post)}</>;
}
