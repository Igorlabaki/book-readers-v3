import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import HeaderComponent from "../Components/Header";
import { useEffect, useState } from "react";
import useUserContext from "../Hooks/useUserContext";
import { InputPostComponent } from "../Components/inputPost";
import usePostsContext from "../Hooks/usePostsContext";
import { PostComponent } from "../Components/Post";
import { LoadingComponent } from "../Components/Post/loading";
import { CardComponent } from "../Components/util/Card";
import { useRouter } from "next/router";
import useUserBookContext from "../Hooks/useBookContext copy";

export default function HomePage({ data }) {
  const userId = data.id;

  const { allPosts, getPosts, isLoading } = usePostsContext();
  const { getUser, user } = useUserContext();
  const [isGetBookLoading, setIsGetBookLoading] = useState(false);
  const { getMostReadBook, getMostPostBook, mostReadList, mostPostsList } =
    useUserBookContext();

  const [listType, setListType] = useState("Most Read");

  const router = useRouter();

  useEffect(() => {
    setIsGetBookLoading(true);
    getPosts();
    setTimeout(() => setIsGetBookLoading(false), 1500);
  }, []);

  useEffect(() => {
    getUser(userId);
  }, []);

  useEffect(() => {
    getMostReadBook();
    getMostPostBook();
  }, [listType]);

  return (
    <div className="w-[100%] bg-bg-gray py-20 space-y-3 h-full">
      <HeaderComponent />
      <CardComponent>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between w-[80%] m-auto text-gray-500 font-semibold">
            <p
              className={`cursor-pointer px-3 py-3 ${
                listType.includes("Most Read")
                  ? "text-blue-600 border-b-2 border-blue-600 scale"
                  : "hover:bg-gray-200 rounded-md "
              }`}
              onClick={() => setListType(() => "Most Read")}
            >
              Most Read
            </p>
            <p
              className={`cursor-pointer px-3 py-3 ${
                listType.includes("Most Posts")
                  ? "text-blue-600 border-b-2 border-blue-600 scale"
                  : "hover:bg-gray-200 rounded-md "
              }`}
              onClick={() => setListType(() => "Most Posts")}
            >
              Most Posts
            </p>
            <p
              className={`cursor-pointer px-3 py-3 ${
                listType.includes("Rating rank")
                  ? "text-blue-600 border-b-2 border-blue-600 scale"
                  : "hover:bg-gray-200 rounded-md "
              }`}
              onClick={() => setListType(() => "Rating rank")}
            >
              Rating rank
            </p>
          </div>
          <div className="flex space-x-2 justify-start items-center overflow-hidden">
            {listType.includes("Most Read")
              ? mostReadList?.map((book: any, i) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          router.push(`/search/id/${book.google}`);
                        }}
                        className="relative h-[200px] w-[120px] cursor-pointer rounded-md overflow-hidden shadow-pattern flex justify-center items-center text-center bg-black text-stone-100"
                      >
                        <p className="absolute left-1 top-1 text-white font-semibold bg-black p-1 rounded-full h-6 w-6 flex justify-center items-center text-md">
                          {i + 1}
                        </p>
                        <p className="absolute bottom-2 right-2 text-[10px] flex justify-center items-center h-5 w-5 bg-black p-1 rounded-full">
                          {book.User.length}x
                        </p>
                        {book?.smallThumbnail ? (
                          <img
                            src={book?.smallThumbnail}
                            alt=""
                            className="w-full h-full"
                          />
                        ) : (
                          <img
                            src="/images/photos/book-default.jpg"
                            alt=""
                            className="h-full shadow-pattern rounded-md cursor-pointer"
                            onClick={() => {
                              router.push(`/search/id/${book.google}`);
                            }}
                          />
                        )}
                      </div>
                    </>
                  );
                })
              : listType.includes("Most Posts")
              ? mostPostsList?.map((book: any, i) => {
                  if (book.Posts.length === 0) {
                    return;
                  }
                  return (
                    <>
                      <div
                        onClick={() => {
                          router.push(`/search/id/${book.google}`);
                        }}
                        className="relative h-[200px] w-[120px] cursor-pointer rounded-md overflow-hidden shadow-pattern flex justify-center items-center text-center bg-black text-stone-100"
                      >
                        <p className="absolute left-1 top-1 text-white font-semibold bg-black p-1 rounded-full h-6 w-6 flex justify-center items-center text-md">
                          {i + 1}
                        </p>
                        <p className="absolute bottom-2 right-2 text-[10px] flex justify-center items-center h-5 w-5 bg-black p-1 rounded-full">
                          {book.Posts.length}x
                        </p>
                        <img
                          src={book?.smallThumbnail}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </CardComponent>
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
