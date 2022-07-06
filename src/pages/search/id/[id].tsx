import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import HearderComponent from "../../../Components/Header";
import { AddBookModalComponent } from "../../../Components/Modals/addBookModal";
import { Button } from "../../../Components/util/Button";
import useBookContext from "../../../Hooks/useBookContext";
import useGoogleBooksContext from "../../../Hooks/useGoogleBooksContext";
import useUserContext from "../../../Hooks/useUserContext";

export default function Home() {
  const {
    query: { id },
  } = useRouter();

  const { book, getBook, getBookByAuthor, authorsBooksList } =
    useGoogleBooksContext();
  const { createBook } = useBookContext();
  const { user } = useUserContext();
  const [addBookModal, setAddBookModal] = useState(false);

  const [text, setText] = useState("");

  const router = useRouter();

  function handleOpenAddBookModal() {
    setAddBookModal(true);
  }

  function handleCloseAddBookModal() {
    setAddBookModal(false);
  }

  useEffect(() => {
    getBook(id);
  }, [router.asPath]);

  useEffect(() => {
    getBookByAuthor(book?.volumeInfo?.authors[0]);
  }, [book]);

  return (
    <>
      <div className="w-[100%] bg-bg-gray py-24 space-y-3">
        <HearderComponent />
        <div className="flex space-x-4 mt-5 w-[90%] m-auto">
          <div className="">
            {book?.volumeInfo?.imageLinks ? (
              <img
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt=""
                className="w-[200px]"
              />
            ) : (
              <img
                src="/images/photos/book-default.jpg"
                alt=""
                className="w-[200px]"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="w-[90%]">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">
                  {book?.volumeInfo?.title}
                </h1>
              </div>
              <div className="flex justify-between items-center ">
                <h2 className="font-semibold">{book?.volumeInfo?.subtitle}</h2>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    getBook(book.id);
                    handleOpenAddBookModal();
                  }}
                  icon={
                    <BiBookAdd
                      size={24}
                      className="text-primary hover:animate-pulse"
                    />
                  }
                  className="flex text-white p-[10px] rounded-[0.5rem] justify-center items-center right-0 hover:scale-105"
                />
              </div>
              <p>
                <strong>by</strong>&nbsp;{book?.volumeInfo?.authors?.at(0)}
              </p>
              <p>
                <strong>Category:</strong>&nbsp;
                {book?.volumeInfo?.categories?.at(0)}
              </p>
              <div className="flex space-x-2">
                <p>
                  <strong>Published:</strong>
                  &nbsp;{book?.volumeInfo?.publishedDate}
                </p>
                <p>
                  <strong>Pages:</strong>
                  &nbsp;{book?.volumeInfo?.pageCount}
                </p>
              </div>
              <div className="text-justify">
                {book?.volumeInfo?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 w-[90%] m-auto">
          <hr className="w-[50%] m-auto mb-3" />
          <p className="font-semibold">
            Others books wrote by {book?.volumeInfo?.authors[0]}:
          </p>
          <div className="flex space-x-2 py-3">
            {authorsBooksList.map((book) => {
              return (
                <>
                  {book?.volumeInfo?.imageLinks ? (
                    <div className="w-m-[100px]">
                      <img
                        src={book?.volumeInfo?.imageLinks?.thumbnail}
                        key={book.id}
                        alt="book cover"
                        className="cursor-pointer h-full "
                        onClick={() => router.push(`/search/id/${book.id}`)}
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/photos/book-default.jpg"
                      alt=""
                      className="w-[100px]"
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
        {addBookModal ? (
          <AddBookModalComponent onClose={handleCloseAddBookModal}>
            <div className="bg-white flex flex-row  justify-center py-5 px-5 rounded-lg gap-5 relative ">
              <GrFormClose
                size={20}
                className="absolute right-3 top-3 cursor-pointer hover:scale-125"
                onClick={() => handleCloseAddBookModal()}
              />
              {book?.volumeInfo?.imageLinks ? (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt=""
                  className="w-[200px] shadow-pattern rounded-md"
                />
              ) : (
                <img
                  src="/images/photos/book-default.jpg"
                  alt=""
                  className="w-[200px]"
                />
              )}
              <div className="flex-col justify-start items-start flex-1 space-y-4">
                <h2 className="font-semibold text-3xl ">
                  {book?.volumeInfo?.title}
                </h2>
                {book?.volumeInfo?.authors?.at(0) ? (
                  <p className="font-semibold">
                    by&nbsp;
                    {book?.volumeInfo?.authors?.at(0)}
                  </p>
                ) : null}
                <form className="space-y-3">
                  <select
                    id="listTypeSelect"
                    className="cursor-pointer mt-2 border-2 w-[80%]"
                  >
                    <option value="read" selected>
                      Read
                    </option>
                    <option value="reading">Reading</option>
                    <option value="wantRead">Want to read</option>
                  </select>
                  <p>What do you think about?</p>
                  <textarea
                    placeholder={"Enter your review..."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="resize-none w-[80%] bg-bg-gray
                  rounded-md px-3 py-3 outline-none h-[180px]"
                  ></textarea>
                  <Button
                    title="Confirm"
                    onClick={(e) => {
                      e.preventDefault();
                      createBook(book, text, user?.id, "read");
                    }}
                    disabled={text ? false : true}
                    className={`${
                      !text ? "bg-[#BBBFC1]" : "bg-blue-900"
                    } mt-24 flex text-white p-[10px] rounded-[0.25rem] w-[50%] justify-center items-center hover:brightness-105`}
                  ></Button>
                </form>
              </div>
            </div>
          </AddBookModalComponent>
        ) : null}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

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
      session,
    },
  };
};
