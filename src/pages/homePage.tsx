import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect, useState } from "react";
import useUserContext from "../Hooks/useUserContext";
import { InputPostComponent } from "../Components/inputPost";
import usePostsContext from "../Hooks/usePostsContext";
import { PostComponent } from "../Components/Post";
import { LoadingComponent } from "../Components/Post/loading";

export default function HomePage({ data }) {
  const userId = data.id;

  const { allPosts, getPosts, isLoading } = usePostsContext();
  const { getUser } = useUserContext();
  const [isGetBookLoading, setIsGetBookLoading] = useState(false);

  useEffect(() => {
    setIsGetBookLoading(true);
    getPosts();
    setTimeout(() => setIsGetBookLoading(false), 1500);
  }, []);

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <div className="w-[100%] bg-bg-gray py-24 space-y-3 h-[100%]">
      <HeaderComponent />
      <InputPostComponent />
      <p className="w-[80%] m-auto text-3xl font-bold">Feed</p>
      {isLoading || isGetBookLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {allPosts?.map((post) => {
            return <PostComponent key={post.id} post={post} />;
          })}
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const user = session?.user;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      data: user,
    },
  };
};
