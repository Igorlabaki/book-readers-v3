import moment from "moment";
import React, { useEffect, useState } from "react";
import { CardComponent } from "../util/Card";
import { EditButtonComponent } from "./editButton";
import EditComponent from "./editComponent";
import { MdModeComment } from "react-icons/md";
import { LikeComponent } from "./likeComponent";
import { CommentComponent } from "./commentComponent";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";
import usePostsContext from "../../Hooks/usePostsContext";
import { Comments } from "@prisma/client";

export function PostComponent({ post }) {
  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);

  const { user } = useUserContext();
  const { createComment } = usePostsContext();

  const [commentList, setCommentList] = useState<Comments[]>([]);
  const [commentText, setcommentText] = useState("");
  const [commentIsOpen, setCommentIsOpen] = useState(Boolean);

  async function getComments(postId: String) {
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      setCommentList(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComments(post.id);
  }, []);

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
            <EditButtonComponent
              post={post}
              openTextAreaModal={setTextAreaIsOpen}
            />
          </div>
          <p className="font-semibold text-[11px] text-gray-400">{`Posted at ${moment(
            post.created_at
          ).format("MMMM Do YYYY, h:mm a")}`}</p>
          {post.book_id ? (
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
                    post={post}
                    textAreaIsOpen={textAreaIsOpen}
                    onClick={() => setTextAreaIsOpen(false)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <EditComponent
              post={post}
              textAreaIsOpen={textAreaIsOpen}
              onClick={() => setTextAreaIsOpen(false)}
            />
          )}
          <div className="flex justify-start items-center w-[100%] my-1">
            <div className="flex justify-center items-center space-x-2 w-[140px]">
              <LikeComponent post={post} />
              <CommentComponent post={post} />
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
      <div>
        {commentList?.map((comment: Comments) => {
          return (
            <>
              <div
                key={comment?.id}
                className={`ml-[75px] flex space-x-2 my-2`}
              >
                <img
                  src={comment?.user?.image}
                  alt="avatar"
                  className="h-12 w-12 rounded-full"
                />
                <div className="w-[100%]">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-md">
                      {comment?.user.username}
                    </p>
                    <EditButtonComponent comment={comment} />
                  </div>
                  <p className="bg-green-200 py-2 px-4 rounded-b-md rounded-tr-md w-[100%] mt-2">
                    {comment?.text}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </CardComponent>
  );
}
