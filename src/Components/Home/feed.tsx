import React, { memo, useCallback, useEffect, useState } from "react";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { InputPostComponent } from "../inputPost";
import { PostComponent } from "../Post";
import { LoadingComponent } from "../Post/loading";
import { CardComponent } from "../util/Card";

export function FeedComponent() {
  const [isGetBookLoading, setIsGetBookLoading] = useState(false);
  const { allPosts, getPosts, isLoading } = usePostsContext();
  const { user } = useUserContext();

  useEffect(() => {
    setIsGetBookLoading(true);
    getPosts(user?.id);
    setTimeout(() => setIsGetBookLoading(false), 1000);
  }, [user?.id]);

  return (
    <>
      <p className="w-[80%] m-auto text-3xl font-bold">Feed</p>
      {isLoading || isGetBookLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <InputPostComponent />
          {allPosts.length === 0 ? (
            <CardComponent>
              <p className="w-[100%] text-center text-lg text-gray-400">
                No posts register yet
              </p>
            </CardComponent>
          ) : (
            allPosts?.map((post) => {
              return <PostComponent key={post.id} post={post} />;
            })
          )}
        </>
      )}
    </>
  );
}
