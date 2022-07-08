import { useEffect, useRef, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";

interface likeProps {
  post: any;
}

export function LikeComponent({ post }: likeProps) {
  const { createLike, deleteLike, isLikeLoading } = usePostsContext();
  const [liked, setLiked] = useState<Boolean>(false);

  const { user } = useUserContext();

  const like = post?.Likes.filter((l) => {
    return l.user.id === user.id;
  });

  function handleLikeChange(post) {
    if (like.length > 0) {
      return (
        <div className="flex justify-start items-center">
          <Button
            onClick={() => {
              deleteLike(like[0].id);
              setLiked(() => true);
            }}
            icon={<FcLike fontSize={19} cursor={"pointer"} className={``} />}
            className={`cursor-pointer`}
          />
          <p className="text-red-700">{`(${post?.Likes.length})`}</p>
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
              setLiked(() => false);
            }}
          />
          <p
            className={`text-red-200 text-sm ${
              isLikeLoading ? "animate-pulse" : ""
            }`}
          >{`(${post?.Likes.length})`}</p>
        </div>
      );
    }
  }

  return <>{handleLikeChange(post)}</>;
}
