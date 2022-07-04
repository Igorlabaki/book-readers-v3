import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import HearderComponent from "../../../Components/Header";
import { AddBookModalComponent } from "../../../Components/Modals/addBookModal";
import { Button } from "../../../Components/util/Button";
import useGoogleBooksContext from "../../../Hooks/useGoogleBooksContext";

export default function Home() {
  const {
    query: { id },
  } = useRouter();

  const { book, getBook, getBookByAuthor, authorsBooksList } =
    useGoogleBooksContext();

  const [addBookModal, setAddBookModal] = useState(false);

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
      <div className="flex flex-col h-screen lg:w-[80%] w-[100%] m-auto px-2 relative">
        <HearderComponent />
        <div className="flex w-full space-x-4 mt-5">
          {book?.volumeInfo?.imageLinks ? (
            <div className="">
              <img
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt=""
                className="w-[200px]"
              />
            </div>
          ) : (
            <img
              src="/images/photos/book-default.jpg"
              alt=""
              className="w-[200px]"
            />
          )}
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h1 className="text-2xl">{book?.volumeInfo?.title}</h1>
                <Button
                  title="Add in your list"
                  onClick={(e) => {
                    e.preventDefault();
                    getBook(book.id);
                    handleOpenAddBookModal();
                  }}
                  icon={<TiPlus />}
                  className="bg-primary flex text-white p-[10px] rounded-[0.25rem] justify-center items-center space-x-2 right-0 hover:scale-105"
                ></Button>
              </div>
              <h2>{book?.volumeInfo?.subtitle}</h2>
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
              <div>{book?.volumeInfo?.description}</div>
            </div>
            <div className="mt-3">
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
          </div>
        </div>
        {addBookModal ? (
          <AddBookModalComponent onClose={handleCloseAddBookModal}>
            <div className="bg-white flex flex-row  justify-center p-14 rounded-lg gap-5 relative">
              <GrFormClose
                size={20}
                className="absolute right-5 top-5 cursor-pointer hover:scale-125"
                onClick={() => handleCloseAddBookModal()}
              />
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
              <div className="flex-col justify-start items-start flex-1">
                <h2 className="font-semibold text-3xl ">
                  {book?.volumeInfo?.title}
                </h2>
                <p className="font-semibold">
                  by&nbsp;
                  {book?.volumeInfo?.authors?.at(0)}
                </p>
                <div className="">
                  <select
                    id="listTypeSelect"
                    className="cursor-pointer mt-2 border-2"
                  >
                    <option value="read" selected>
                      Read
                    </option>
                    <option value="reading">Reading</option>
                    <option value="wantRead">Want to read</option>
                  </select>
                  <Button
                    title="Ok"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="bg-primary m-auto mt-32 flex text-white p-[10px] rounded-[0.25rem] w-[50%] justify-center items-center hover:scale-105"
                  ></Button>
                </div>
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
