import moment from "moment";
import React, { memo, startTransition, useEffect, useState } from "react";
import { CardComponent } from "../util/Card";

import useUserContext from "../../Hooks/useUserContext";

import usePostsContext from "../../Hooks/usePostsContext";

import {
  MenuButtonComponent,
  MemoizedMenuButtonComponent,
} from "./MenuButtonComponent";
import { EditComponent, MemoizedEditComponent } from "./editComponent";
import { LikeComponent, MemoizedLikeComponent } from "./likeComponent";
import {
  IconCommentComponent,
  MemoizedIconCommentComponent,
} from "./iconComment";
import { CommentComponent, MemoizedCommentComponent } from "./commentComponent";
import { useRouter } from "next/router";
import useNotificationContext from "../../Hooks/useNotificationContext copy";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { toNestError } from "@hookform/resolvers";

export function PostComponent({ post }) {
  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);

  const { user } = useUserContext();
  const { createComment } = usePostsContext();
  const [commentText, setcommentText] = useState("");
  const [commentIsOpen, setCommentIsOpen] = useState(false);

  const router = useRouter();

  const listType = post?.user?.Books?.filter(
    (book) => book.fk_id_book === post?.book?.id
  );

  const stars = [1, 2, 3, 4, 5];
  return (
    <CardComponent>
      <div className="flex space-x-4">
        <figure className="rounded-full w-[60px] h-[60px]  cursor-pointer overflow-hidden relative">
          <img
            src={post?.user?.image}
            alt="avatar user"
            className="w-full h-full"
            onClick={() => {
              router.push(`/profile/${post.user.id}`);
            }}
          />
        </figure>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 justify-center items-center">
              <p
                className="font-semibold text-md cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${post?.user?.id}`);
                }}
              >
                {post?.user?.username}
              </p>
              {post?.book?.id ? (
                <>
                  <p className="italic  text-gray-700 text-sm">
                    {listType[0]?.listType === "Read"
                      ? `has read`
                      : listType[0]?.listType === "Currently Reading"
                      ? `is currently reading`
                      : listType[0]?.listType.includes("Want to Read")
                      ? `wants to read`
                      : null}
                  </p>
                </>
              ) : post?.action ? (
                <div className="flex justify-start items-center space-x-2">
                  <p className="text-sm italic">{post?.action}</p>
                  <p
                    className="font-semibold text-sm cursor-pointer"
                    onClick={() => {
                      router.push(`/profile/${post?.userProfile?.id}`);
                    }}
                  >
                    {post?.userProfile?.username}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex space-x-10">
              {listType[0]?.rate != null ? (
                <p className="flex">
                  {stars.map((item) => {
                    return (
                      <AiFillStar
                        key={item}
                        color={`${
                          item <= listType[0]?.rate ? "#CCCC00" : "#c3c6ca"
                        }`}
                      />
                    );
                  })}
                </p>
              ) : null}
              <MemoizedMenuButtonComponent
                type="post"
                openTextAreaModal={setTextAreaIsOpen}
                post={post}
              />
            </div>
          </div>
          <p className="font-semibold text-[11px] text-gray-400">{`Posted at ${moment(
            post?.updatedAt
          ).format("MMMM Do YYYY, h:mm a")}`}</p>
          {post?.book_id ? (
            <div className=" w-[100%]">
              <div className="mt-3 flex space-x-3 w-[100%]">
                {post?.book?.smallThumbnail ? (
                  <figure className="w-[70%] h-[200px] rounded-md cursor-pointer overflow-hidden relative">
                    <img
                      src={post?.book?.smallThumbnail}
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => {
                        router.push(`/search/id/${post?.book.google}`);
                      }}
                    />
                  </figure>
                ) : (
                  <figure className="w-[70%] shadow-pattern rounded-md overflow-hidden cursor-pointer relative">
                    <img
                      src="/images/photos/book-default.jpg"
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => {
                        router.push(`/search/id/${post?.book.google}`);
                      }}
                    />
                  </figure>
                )}
                <div>
                  <h3
                    onClick={() => {
                      router.push(`/search/id/${post.book.google}`);
                    }}
                    className="font-semibold text-[20px] w-[90%] cursor-pointer"
                  >
                    {post?.book?.title}
                  </h3>
                  <p className="text-justify w-[90%]">{`${post?.book?.description}...`}</p>
                  <div className="flex space-x-5">
                    <p className="text-md font-semibold italic">
                      by &nbsp;
                      {post?.book?.authors}
                    </p>
                  </div>
                  <MemoizedEditComponent
                    type={"post"}
                    post={post}
                    textAreaIsOpen={textAreaIsOpen}
                    setTextAreaIsOpen={setTextAreaIsOpen}
                  />
                </div>
              </div>
            </div>
          ) : (
            <MemoizedEditComponent
              type={"post"}
              post={post}
              textAreaIsOpen={textAreaIsOpen}
              setTextAreaIsOpen={setTextAreaIsOpen}
            />
          )}
          <div className="flex justify-start items-center w-[100%] my-1">
            <div className="flex justify-center items-center space-x-4 w-[140px]">
              <MemoizedLikeComponent post={post} />
              <MemoizedIconCommentComponent
                post={post}
                setComment={setCommentIsOpen}
                commentIsOpen={commentIsOpen}
              />
            </div>
            <form
              className="flex flex-1 justify-start items-center bg-bg-gray py-2 px-1 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                createComment(post, commentText, user.id);
                setcommentText("");
              }}
            >
              <figure className="rounded-full w-10 flex h-10 cursor-pointer overflow-hidden relative">
                <img
                  src={user?.image}
                  alt="avatar user"
                  className="w-full h-full"
                />
              </figure>
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
      {commentIsOpen ? <MemoizedCommentComponent post={post} /> : null}
    </CardComponent>
  );
}

const MemoizedPostComponent = memo(PostComponent);
export { MemoizedPostComponent };
