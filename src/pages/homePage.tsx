import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect } from "react";
import useUserContext from "../Hooks/useUserContext";
import { InputPostComponent } from "../Components/inputPost";
import {
  MemoizedMostListComopnent,
  MostListsComponent,
} from "../Components/Home/mostLists";
import { FeedComponent, MemoizedFeedComopnent } from "../Components/Home/feed";

export default function HomePage({ data }) {
  const userId = data.id;

  const { getUser, user } = useUserContext();

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <div className="w-[100%] bg-bg-gray py-20 space-y-3 min-h-screen">
      <HeaderComponent />
      <MemoizedMostListComopnent />
      <InputPostComponent />
      <MemoizedFeedComopnent />
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
