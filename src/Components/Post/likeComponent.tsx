import { Likes } from "@prisma/client";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";

interface likeProps {
  post: any;
}

export function LikeComponent({ post }: likeProps) {
  const { createLike, deleteLike, isLikeLoading } = usePostsContext();
  const [liked, setLiked] = useState<Boolean>(false);
  const [likeModal, setLikeModal] = useState<Boolean>(false);

  const { user } = useUserContext();

  const like = post?.Likes.filter((l) => {
    return l?.user?.id === user?.id;
  });

  function handleLikeChange(post) {
    if (like?.length > 0) {
      return (
        <div
          className="flex justify-start items-center relative"
          onMouseOver={() => setLikeModal(!likeModal)}
          onMouseDown={() => {
            setLikeModal(!likeModal);
          }}
        >
          {likeModal ? (
            <>
              <div className="bg-black opacity-50 absolute top-[1.75rem] left-1 rounded-md p-2">
                {post?.Likes?.map((like: Likes) => {
                  return (
                    <>
                      <p key={like.id} className={`text-white text-sm`}>
                        {like?.user?.username.slice(0, 11)}
                      </p>
                    </>
                  );
                })}
              </div>
            </>
          ) : null}
          <Button
            onClick={() => {
              deleteLike(like[0]?.id);
              setLiked(() => true);
            }}
            icon={
              <AiFillLike
                fontSize={19}
                cursor={"pointer"}
                color={`text-blue-md`}
                fill={"rgb(26 110 216)"}
              />
            }
            className={`cursor-pointer`}
          />
          <p className="text-blue-md text-sm">{`(${post?.Likes?.length})`}</p>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-[0.5px]">
          <AiFillLike
            fontSize={20}
            className="cursor-pointer text-gray-300"
            onClick={() => {
              createLike(post, user?.id);
              setLiked(() => false);
            }}
            color={"text-gray-300"}
          />
          <p
            className={`text-gray-300 text-sm ${
              isLikeLoading ? "animate-pulse" : ""
            }`}
          >{`(${post?.Likes?.length})`}</p>
        </div>
      );
    }
  }

  return <>{handleLikeChange(post)}</>;
}
