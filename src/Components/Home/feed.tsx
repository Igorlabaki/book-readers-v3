import React, { memo, useCallback, useEffect, useState } from "react";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { InputPostComponent } from "../inputPost";
import { MemoizedPostComponent } from "../Post";
import { LoadingComponent } from "../Post/loading";
import { CardComponent } from "../util/Card";

export function FeedComponent() {
  const [isGetBookLoading, setIsGetBookLoading] = useState(false);
  const { allPosts, isLoading } = usePostsContext();

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
              return <MemoizedPostComponent key={post.id} post={post} />;
            })
          )}
        </>
      )}
    </>
  );
}

const MemoizedFeedComponent = memo(FeedComponent);
export { MemoizedFeedComponent };
