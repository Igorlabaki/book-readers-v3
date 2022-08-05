import moment from "moment";
import React, { memo, useState } from "react";
import { CardComponent } from "../util/Card";
import useUserContext from "../../Hooks/useUserContext";
import usePostsContext from "../../Hooks/usePostsContext";
import { MenuButtonComponent } from "./MenuButtonComponent";
import { EditComponent } from "./editComponent";
import { LikeComponent } from "./likeComponent";
import { IconCommentComponent } from "./iconComment";
import { CommentComponent } from "./commentComponent";
import { useRouter } from "next/router";

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

  return (
    <CardComponent>
      <div className="flex space-x-4">
        <img
          src={post?.user?.image}
          alt="profile photo"
          className="w-[60px] h-[60px] rounded-full cursor-pointer shadow-pattern"
          onClick={() => {
            router.push(`/profile/${post.user.id}`);
          }}
        />
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
                <p className="italic  text-gray-700 text-sm">
                  {listType[0]?.listType === "Read"
                    ? `has read`
                    : listType[0]?.listType === "Currently Reading"
                    ? `is currently reading`
                    : listType[0]?.listType.includes("Want to Read")
                    ? `wants to read`
                    : null}
                </p>
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

            <MenuButtonComponent
              type="post"
              openTextAreaModal={setTextAreaIsOpen}
              post={post}
            />
          </div>
          <p className="font-semibold text-[11px] text-gray-400">{`Posted at ${moment(
            post?.updatedAt
          ).format("MMMM Do YYYY, h:mm a")}`}</p>
          {post?.book_id ? (
            <div>
              <div className="mt-3 flex space-x-3">
                {post?.book?.smallThumbnail ? (
                  <img
                    src={post?.book?.smallThumbnail}
                    alt=""
                    onClick={() => {
                      router.push(`/search/id/${post.book.google}`);
                    }}
                    className="w-[200px] shadow-pattern rounded-md cursor-pointer"
                  />
                ) : (
                  <img
                    src="/images/photos/book-default.jpg"
                    alt=""
                    className="w-[130px] h-[180] shadow-pattern rounded-md cursor-pointer"
                    onClick={() => {
                      router.push(`/search/id/${post.book.google}`);
                    }}
                  />
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
            <div className="flex justify-center items-center space-x-4 w-[140px]">
              <LikeComponent post={post} />
              <IconCommentComponent
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
