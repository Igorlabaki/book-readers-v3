import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdModeComment } from "react-icons/md";

interface EditProps {
  post: any;
  setComment: any;
  commentIsOpen: boolean;
}

export function IconCommentComponent({
  post,
  commentIsOpen,
  setComment,
}: EditProps) {
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
          className={`${
            noComment ? "text-[#d0edad]" : "text-[#8BC34A]"
          } text-sm`}
        >{`(${post?.Comments.length})`}</p>
        <div onClick={() => setComment(!commentIsOpen)}>
          {commentIsOpen ? (
            <IoIosArrowUp
              fontSize={12}
              cursor={"pointer"}
              className="comment-arrow text-[#8BC34A]"
            />
          ) : post.Comments.length > 0 ? (
            <IoIosArrowDown
              fontSize={12}
              cursor={"pointer"}
              className="comment-arrow text-[#8BC34A]"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
