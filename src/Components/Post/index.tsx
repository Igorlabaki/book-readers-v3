import moment from "moment";
import React, { useEffect, useState } from "react";
import { CardComponent } from "../util/Card";

import useUserContext from "../../Hooks/useUserContext";

import usePostsContext from "../../Hooks/usePostsContext";
import { Comments } from "@prisma/client";
import { MenuButtonComponent } from "./MenuButtonComponent";
import { EditComponent } from "./editComponent";
import { LikeComponent } from "./likeComponent";
import { IconCommentComponent } from "./iconComment";
import { CommentComponent } from "./commentComponent";

export function PostComponent({ post }) {
  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);

  const { user } = useUserContext();
  const { createComment } = usePostsContext();

  const [commentText, setcommentText] = useState("");
  const [commentIsOpen, setCommentIsOpen] = useState(Boolean);

  return (
    <CardComponent>
      <div className="flex space-x-4">
        <img
          src={post?.user?.image}
          alt="profile photo"
          className="w-[60px] h-[60px] rounded-full"
        />
        <div className="w-full">
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-md">{post?.user?.username}</p>
            <MenuButtonComponent
              type="post"
              openTextAreaModal={setTextAreaIsOpen}
              post={post}
            />
          </div>
          <div onTouchMoveCapture={() => console.log("jorge")}>
            <p className="text-7xl text-red-900 font bold">Passou</p>
          </div>
          <p className="font-semibold text-[11px] text-gray-400">{`Posted at ${moment(
            post?.created_at
          ).format("MMMM Do YYYY, h:mm a")}`}</p>
          {post?.book_id ? (
            <div>
              <div className="mt-3 flex space-x-3">
                {post?.book?.smallThumbnail ? (
                  <img
                    src={post?.book?.smallThumbnail}
                    alt=""
                    className="w-[200px] shadow-pattern rounded-md"
                  />
                ) : (
                  <img
                    src="/images/photos/book-default.jpg"
                    alt=""
                    className="w-[120px] shadow-pattern rounded-md"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-[20px] w-[90%]">
                    {post?.book?.title}
                  </h3>
                  <p className="text-justify w-[90%]">{`${post?.book?.description}...`}</p>
                  <div className="flex space-x-5">
                    <p className="flex">
                      <span className="font-semibold">Author:&nbsp;</span>
                      {post?.book?.authors}
                    </p>
                    <p className="flex">
                      <span className="font-semibold">Pages:&nbsp;</span>
                      {post?.book?.pageCount}
                    </p>
                  </div>
                  <EditComponent
                    type={"post"}
                    post={post}
                    textAreaIsOpen={textAreaIsOpen}
                    setTextAreaIsOpen={setTextAreaIsOpen}
                  />
                </div>
              </div>
            </div>
          ) : (
            <EditComponent
              type={"post"}
              post={post}
              textAreaIsOpen={textAreaIsOpen}
              setTextAreaIsOpen={setTextAreaIsOpen}
            />
          )}
          <div className="flex justify-start items-center w-[100%] my-1">
            <div className="flex justify-center items-center space-x-2 w-[140px]">
              <LikeComponent post={post} />
              <IconCommentComponent
                post={post}
                setComment={setCommentIsOpen}
                commentIsOpen={commentIsOpen}
              />
            </div>
            <form
              className="flex flex-1 bg-bg-gray py-2 px-1 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                createComment(post, commentText, user.id);
                setcommentText("");
              }}
            >
              <img
                src={user?.image}
                alt="profile photo"
                className="h-8 w-8 rounded-full"
              />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                className=" bg-transparent py-1 px-2 outline-none w-[100%]"
                onChange={(e) => setcommentText(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      {commentIsOpen ? <CommentComponent post={post} /> : null}
    </CardComponent>
  );
}
