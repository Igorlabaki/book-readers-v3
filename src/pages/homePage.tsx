import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect } from "react";
import useUserContext from "../Hooks/useUserContext";
import axios from "axios";
import { LayoutComponent } from "../Components/util/layout";
import { InputPostComponent } from "../Components/inputPost";
import { CardComponent } from "../Components/util/Card";
import usePostsContext from "../Hooks/usePostsContext";
import { PostComponent } from "../Components/Post";

export default function HomePage({ data }) {
  const userId = data.id;

  const { allPosts, getPosts } = usePostsContext();
  const { getUser } = useUserContext();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <div className="w-[100%] bg-bg-gray py-24 space-y-3">
      <HeaderComponent />
      <InputPostComponent />
      <p className="w-[80%] m-auto text-3xl font-bold">Feed</p>
      {allPosts?.map((post) => {
        return <PostComponent key={post.id} post={post} />;
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const user = session.user;

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
