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
      <div className="flex justify-center items-center space-x-[0.5px]">
        {noComment ? (
          <MdModeComment fontSize={18} color={"#D1D5DB"} />
        ) : (
          <MdModeComment fontSize={18} color={" #8BC34A"} />
        )}
        <p
          className={`${
            noComment ? "text-[#D1D5DB]" : "text-[#8BC34A]"
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
