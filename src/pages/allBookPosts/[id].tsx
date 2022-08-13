import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HeaderComponent from "../../Components/Header";
import { PostComponent } from "../../Components/Post";
import usePostsContext from "../../Hooks/usePostsContext";

export default function AllBookPost() {
  const {
    query: { id },
  } = useRouter();

  const { getAllBookPost, allBookPost } = usePostsContext();

  useEffect(() => {
    getAllBookPost(id?.toString());
  }, []);

  return (
    <>
      <div className="w-[100%] bg-bg-gray py-20 space-y-3 min-h-screen">
        <HeaderComponent />
        <p className="w-[80%] m-auto text-3xl font-bold">Book feed</p>
        <div className="lg:w-[60%] m-auto space-y-3 flex justify-center items-center flex-col">
          {allBookPost.map((post) => {
            return (
              <div key={post.id}>
                <PostComponent post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
