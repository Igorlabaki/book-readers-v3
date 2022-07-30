import React, { memo, useCallback, useEffect, useState } from "react";
import usePostsContext from "../../Hooks/usePostsContext";
import { MemoizedPostComopnent, PostComponent } from "../Post";
import { LoadingComponent } from "../Post/loading";
import { CardComponent } from "../util/Card";

export function FeedComponent() {
  const [isGetBookLoading, setIsGetBookLoading] = useState(false);
  const { allPosts, getPosts, isLoading } = usePostsContext();

  useEffect(() => {
    setIsGetBookLoading(true);
    getPosts();
    setTimeout(() => setIsGetBookLoading(false), 1000);
  }, []);

  return (
    <>
      <p className="w-[80%] m-auto text-3xl font-bold">Feed</p>
      {isLoading || isGetBookLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {allPosts.length === 0 ? (
            <CardComponent>
              <p className="w-[100%] text-center text-lg text-gray-400">
                No posts register yet
              </p>
            </CardComponent>
          ) : (
            allPosts?.map((post) => {
              return <MemoizedPostComopnent key={post.id} post={post} />;
            })
          )}
        </>
      )}
    </>
  );
}

const MemoizedFeedComopnent = memo(FeedComponent);
export { MemoizedFeedComopnent };
