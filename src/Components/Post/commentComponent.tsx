import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdModeComment } from "react-icons/md";
import usePostsContext from "../../Hooks/usePostsContext";
import { Button } from "../util/Button";

interface EditProps {
  post: any;
}

export function CommentComponent({ post }: EditProps) {
  const noComment = post?.Comments.length == 0;

  return (
    <>
      <div className="flex justify-center items-center">
        {noComment ? (
          <MdModeComment fontSize={20} color={"#d0edad"} />
        ) : (
          <MdModeComment fontSize={20} color={" #8BC34A"} />
        )}
        <p
          className={`${noComment ? "text-[#d0edad]" : "text-[#8BC34A]"}`}
        >{`(${post?.Comments.length})`}</p>
      </div>
    </>
  );
}
