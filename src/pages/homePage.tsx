import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect } from "react";
import useUserContext from "../Hooks/useUserContext";
import { MemoizedMostListComopnent } from "../Components/Home/mostLists";
import { FeedComponent } from "../Components/Home/feed";
import { UsersListComponent } from "../Components/Home/userList";
import usePostsContext from "../Hooks/usePostsContext";

export default function HomePage({ data }) {
  const userId = data.id;

  const { getUser, getAllUser } = useUserContext();
  const { getPosts } = usePostsContext();

  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    getAllUser(userId);
  }, []);

  useEffect(() => {
    getPosts(userId);
  }, []);

  return (
    <div className="w-[100%] bg-bg-gray py-20 space-y-3 min-h-screen">
      <HeaderComponent />
      <div className="lg:w-[60%] m-auto space-y-3 flex justify-center items-center flex-col">
        <MemoizedMostListComopnent />
        <UsersListComponent />
        <FeedComponent />
      </div>
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
