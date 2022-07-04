import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CardComponent } from "../util/Card";
import { EditButtonComponent } from "./editButton";
import EditComponent from "./editComponent";
import { MdModeComment } from "react-icons/md";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { LikeComponent } from "./likeComponent";

export function PostComponent({ post }) {
  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);
  const router = useRouter();

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
          <p className="font-semibold text-[12px] text-gray-400">{`Posted at ${moment(
            post.created_at
          ).format("MMMM Do YYYY, h:mm a")}`}</p>
          {post.book_id ? (
            <div className="mt-3 flex space-x-3">
              <img
                src={post?.book?.smallThumbnail}
                onClick={() => router.push(`/search/id/${post.book.id}`)}
                alt="book-cover"
                className="h-[200px]"
              />
              <div>
                <h3 className="font-semibold text-[20px]">
                  {post?.book?.title}
                </h3>
                <p>{`${post?.book?.description}...`}</p>
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
          ) : (
            <EditComponent
              post={post}
              textAreaIsOpen={textAreaIsOpen}
              onClick={() => setTextAreaIsOpen(false)}
            />
          )}
        </div>
      </div>
      <div className="flex w-[80%] m-auto my-2 space-x-4 pl-2">
        <MdModeComment size={22} color="#d0edad" />
      </div>
    </CardComponent>
  );
}
