import { Posts } from "@prisma/client";
import React from "react";
import useUserContext from "../../Hooks/useUserContext";
import { PostComponent } from "../Post";
import { CardComponent } from "../util/Card";

export interface UserComponentProps {}

export function UserPostComponent() {
  const { profile } = useUserContext();
  return profile?.Posts.length === 0 ? (
    <>
      <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Feed</p>
      <CardComponent classname="mt-5 bg-white">
        <div className="w-[100%] h-[100%] justify-center items-center">
          <p className="w-[100%]  h-[100%] text-center text-lg text-gray-400 ">
            {`No posts register yet`}
          </p>
        </div>
      </CardComponent>
    </>
  ) : (
    <>
      <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Feed</p>
      <div className="mt-5 space-y-3">
        {profile?.Posts?.map((post: Posts) => {
          return <PostComponent key={post?.id} post={post} />;
        })}
      </div>
    </>
  );
}
