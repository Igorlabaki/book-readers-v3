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
import { CardComponent } from "../../../Components/util/Card";
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
  const [selectValue, setSelectValue] = useState("read");

  const router = useRouter();

  function handleOpenAddBookModal() {
    setAddBookModal(true);
  }

  function handleCloseAddBookModal() {
    setAddBookModal(false);
  }

  function handleChange(event) {
    setSelectValue(event.currentTarget.value);
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
        <CardComponent>
          <div className="flex space-x-4">
            <div className="">
              {book?.volumeInfo?.imageLinks ? (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt=""
                  className="w-[200px] rounded-lg shadow-pattern"
                />
              ) : (
                <img
                  src="/images/photos/book-default.jpg"
                  alt=""
                  className="w-[200px] rounded-lg shadow-pattern"
                />
              )}
              <div className="flex justify-center items-center">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    getBook(book.id);
                    handleOpenAddBookModal();
                  }}
                  icon={
                    <BiBookAdd
                      size={24}
                      className="text-primary hover:brightness-75 hover:scale-110"
                    />
                  }
                  className="flex text-white p-[10px] rounded-[0.5rem] justify-center items-center"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[90%]">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">
                    {book?.volumeInfo?.title}
                  </h1>
                </div>
                <div className="flex justify-between items-center ">
                  <h2 className="font-semibold">
                    {book?.volumeInfo?.subtitle}
                  </h2>
                </div>
                <p className="italic font-light">
                  by &nbsp;{book?.volumeInfo?.authors?.at(0)}
                </p>
                <div className="flex flex-col mt-2">
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
                </div>
                <div className="text-justify">
                  {book?.volumeInfo?.description}
                </div>
              </div>
            </div>
          </div>
        </CardComponent>
        <CardComponent classname="overflow-hidden bg-white">
          <p className="font-semibold">
            Others books wrote by {book?.volumeInfo?.authors[0]}:
          </p>
          <div className="flex space-x-2 py-3">
            {authorsBooksList.map((book) => {
              return (
                <>
                  {book?.volumeInfo?.imageLinks ? (
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail}
                      key={book.id}
                      alt="book cover"
                      className="cursor-pointerw-[80px] h-[170px] rounded-lg shadow-pattern "
                      onClick={() => router.push(`/search/id/${book.id}`)}
                    />
                  ) : (
                    <img
                      src="/images/photos/book-default.jpg"
                      alt=""
                      className="w-[100px] h-[170px] rounded-lg shadow-pattern"
                    />
                  )}
                </>
              );
            })}
          </div>
        </CardComponent>
        {addBookModal ? (
          <AddBookModalComponent onClose={handleCloseAddBookModal}>
            <div className="bg-white w-[80%] flex flex-row  justify-center py-5 px-5 rounded-lg gap-5 relative ">
              <GrFormClose
                size={20}
                className="absolute right-1 top-1 cursor-pointer hover:scale-125"
                onClick={() => handleCloseAddBookModal()}
              />
              <form className=" space-y-2">
                <div className=" flex flex-row space-x-3">
                  {book?.volumeInfo?.imageLinks ? (
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail}
                      alt=""
                      className="w-[150px] h-[200px] shadow-pattern rounded-md"
                    />
                  ) : (
                    <img
                      src="/images/photos/book-default.jpg"
                      alt=""
                      className="w-[160px] h-[200px] shadow-pattern rounded-lg"
                    />
                  )}
                  <div className="space-y-1">
                    <h2 className="font-semibold text-2xl ">
                      {book?.volumeInfo?.title}
                    </h2>
                    {book?.volumeInfo?.authors?.at(0) ? (
                      <p className="font-light italic">
                        by&nbsp;
                        {book?.volumeInfo?.authors?.at(0)}
                      </p>
                    ) : null}
                    <p className="w-[90%] text-justify">{`${book?.volumeInfo?.description?.slice(
                      0,
                      120
                    )}...`}</p>
                    <div className="flex justify-start items-end">
                      <p className="w-[25%] font-semibold">Select list:</p>
                      <select
                        id="listTypeSelect"
                        className="cursor-pointer mt-9 border-2 w-[100%] outline-none rounded-md"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="read" selected>
                          Read
                        </option>
                        <p>{selectValue}</p>
                        <option value="reading">Reading</option>
                        <option value="wantRead">Want to read</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">What do you think about?</p>
                  <textarea
                    placeholder={"Enter your review..."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="resize-none w-[100%] bg-bg-gray
                    rounded-md px-3 py-3 outline-none h-[180px]"
                  ></textarea>
                  <Button
                    title="Post"
                    onClick={(e) => {
                      e.preventDefault();
                      createBook(book, text, user?.id, selectValue);
                      router.push("/homePage");
                    }}
                    disabled={text ? false : true}
                    className={`${
                      !text ? "bg-[#BBBFC1]" : "bg-blue-900"
                    } flex text-white p-[10px] rounded-[0.25rem] w-[100%] justify-center items-center hover:brightness-105`}
                  ></Button>
                </div>
              </form>
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
