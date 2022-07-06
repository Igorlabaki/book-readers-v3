import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";

interface likeProps {
  post: any;
}

export function LikeComponent({ post }: likeProps) {
  const { createLike, deleteLike } = usePostsContext();
  const [liked, setLiked] = useState<Boolean>(false);
  const [likeId, setLikeId] = useState<String>();

  const { user } = useUserContext();

  async function getLike(postId: String, userId: String) {
    const info = {
      idP: postId,
      idU: userId,
    };

    try {
      const response = await fetch(`/api/like/${postId}/${userId}`, {
        method: "GET",
      });

      const result = await response.json();

      if (result) {
        setLiked(true);
        setLikeId(result.id);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLikeChange(post) {
    getLike(post?.id, user?.id);
    if (liked) {
      return (
        <div className="flex justify-start items-center">
          <Button
            onClick={() => {
              deleteLike(likeId);
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
          <p className="text-red-200 text-sm">{`(${post?.Likes.length})`}</p>
        </div>
      );
    }
  }

  return <>{handleLikeChange(post)}</>;
}
