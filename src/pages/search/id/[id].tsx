import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdKeyboardArrowDown } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import HearderComponent from "../../../Components/Header";
import { ListOptions } from "../../../Components/list/listOptions";
import { propsAddBookModal } from "../../../Components/Modals/addBookModal";
import { propsCancelListModal } from "../../../Components/Modals/cancelListModal";
import { Button } from "../../../Components/util/Button";
import { CardComponent } from "../../../Components/util/Card";
import useBookContext from "../../../Hooks/useBookContext";
import useGoogleBooksContext from "../../../Hooks/useGoogleBooksContext";
import usePostsContext from "../../../Hooks/usePostsContext";
import useUserBookContext from "../../../Hooks/useUserBookContext";
import useUserContext from "../../../Hooks/useUserContext";
import { BsFillChatSquareFill } from "react-icons/bs";
import dynamic from "next/dynamic";

export default function Home() {
  const {
    query: { id },
  } = useRouter();

  const { book, getBook, getBookByAuthor, authorsBooksList } =
    useGoogleBooksContext();
  const { createBookPost } = usePostsContext();
  const { createBook } = useBookContext();
  const { user } = useUserContext();
  const { deleteUserBooks, updateUserBook } = useUserBookContext();
  const [addBookModal, setAddBookModal] = useState(false);

  const [text, setText] = useState("");
  const [selectValue, setSelectValue] = useState("read");
  const [cancelListkModal, setCancelListModal] = useState(false);
  const [showleDeleteIcon, setshowDeleteIcon] = useState(false);
  const [selectRatingModal, setSelectRatingModal] = useState(false);
  const { getBookBd, bookBd } = useBookContext();

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

  function handleCloseSelectRatingModal() {
    setSelectRatingModal(false);
  }

  function handleOpenCancelListModal() {
    setCancelListModal(true);
  }

  function handleCloseCancelListModal() {
    setCancelListModal(false);
  }

  const AddBookModalComponent = dynamic<propsAddBookModal>(() => {
    return import("../../../Components/Modals/addBookModal").then(
      (comp) => comp.AddBookModalComponent
    );
  });

  const CancelListModalComponent = dynamic<propsCancelListModal>(() => {
    return import("../../../Components/Modals/cancelListModal").then(
      (comp) => comp.CancelListModalComponent
    );
  });

  useEffect(() => {
    getBook(id);
    getBookBd(id.toString());
  }, [router.asPath]);

  useEffect(() => {
    getBookByAuthor(book?.volumeInfo?.authors[0]);
  }, [book]);

  const userbook = user?.Books?.filter(
    (item) => item.book?.google === book?.id
  );

  const bookRead = bookBd?.User?.filter((item) => item.listType === "Read");

  return (
    <>
      <div className="w-[100%] min-h-screen bg-bg-gray py-24 space-y-3">
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
              <div className="flex flex-col justify-start items-start mt-5 space-y-4">
                <div className=" relative flex justify-start items-center w-[200px]">
                  {userbook?.length > 0 ? (
                    <p
                      className={` flex justify-start items-center space-x-2 pl-2 w-[100%] bg-gray-200 text-black 
                      rounded-tl-md ${
                        !selectRatingModal ? "rounded-bl-md" : null
                      }`}
                    >
                      {!showleDeleteIcon ? (
                        <MdDone
                          size={16}
                          color={"#8BC34A"}
                          className={`cursor-pointer mr-1`}
                          onMouseOver={() => setshowDeleteIcon(true)}
                        />
                      ) : (
                        <IoMdClose
                          size={12}
                          color={"red"}
                          className={`cursor-pointer mr-1`}
                          onMouseOut={() => setshowDeleteIcon(false)}
                          onClick={() => {
                            handleOpenCancelListModal();
                          }}
                        />
                      )}
                      {userbook[0]?.listType}
                    </p>
                  ) : (
                    <p
                      className={`pl-2 w-[100%]
                      rounded-tl-md bg-blue-900 text-white ${
                        !selectRatingModal ? "rounded-bl-md" : null
                      }`}
                    >
                      Not Read
                    </p>
                  )}
                  <hr className=" border-white h-2 w-[1px]" />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      getBookBd(book?.id);
                      getBook(book?.id);
                      setSelectRatingModal(true);
                    }}
                    icon={<MdKeyboardArrowDown className="" />}
                    className={`flex  hover:brightness-110 text-white justify-center p-1 items-center
                   bg-blue-900 shadow-pattern rounded-tr-md ${
                     !selectRatingModal ? "rounded-br-md" : null
                   }`}
                  />
                  <ListOptions
                    lisOpenIsOpen={selectRatingModal}
                    setlistOptionsClose={() => handleCloseSelectRatingModal()}
                    handleOpenAddBookModal={() => handleOpenAddBookModal()}
                    handleCloseCancelListModal={() =>
                      handleCloseCancelListModal()
                    }
                  />
                </div>
                <div className="flex justify-center items-center space-x-3 w-[100%]">
                  <div className="flex flex-col justify-center items-center">
                    <FaUsers
                      size={25}
                      className={
                        bookRead?.length > 0 ? `text-blue-900` : "text-gray-400"
                      }
                    />
                    <p
                      className={
                        bookRead?.length > 0 ? `text-blue-900` : "text-gray-400"
                      }
                    >
                      {bookRead?.length}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <BsFillChatSquareFill
                      size={25}
                      className={
                        bookBd?.Posts?.length > 0
                          ? `text-blue-900`
                          : "text-gray-400"
                      }
                    />

                    <p
                      className={
                        bookBd?.User?.length > 0
                          ? `text-blue-900`
                          : "text-gray-400"
                      }
                    >
                      {bookBd?.User?.length}
                    </p>
                  </div>
                </div>
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
          <div className="flex space-x-2 py-3 scroll-auto">
            {authorsBooksList.map((book, i) => {
              if (i >= 5) {
                return;
              }
              return (
                <>
                  {book?.volumeInfo?.imageLinks ? (
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail}
                      key={book.id}
                      alt="book cover"
                      className="cursor-pointer w-[100px] h-[160px] rounded-lg shadow-pattern "
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
        {cancelListkModal ? (
          <CancelListModalComponent
            onClose={() => handleCloseCancelListModal()}
          >
            <GrFormClose
              size={20}
              className="absolute right-1 top-1 cursor-pointer hover:scale-125"
              onClick={() => handleCloseCancelListModal()}
            />
            <div className=" bg-white py-3 px-5 space-y-10 rounded-lg">
              <p className="text-md font-semibold">
                Removing a book deletes your rating, review, etc. Remove this
                book from all your shelves?
              </p>
              <div className="w-[100%] flex justify-center items-center space-x-5">
                <button
                  onClick={() => {
                    handleCloseCancelListModal();
                    deleteUserBooks(userbook[0], bookBd.id);
                  }}
                  className="py-2  shadow-pattern hover:brightness-125 w-[100px] rounded-lg text-white font-semibold bg-blue-900"
                >
                  Ok
                </button>
                <button
                  onClick={() => handleCloseCancelListModal()}
                  className="py-2 shadow-pattern hover:brightness-125 w-[100px] rounded-lg text-white font-semibold bg-blue-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </CancelListModalComponent>
        ) : null}
        {addBookModal ? (
          <AddBookModalComponent onClose={handleCloseAddBookModal}>
            <div className="bg-white w-[80%] flex flex-row  justify-start py-5 px-5 rounded-lg  relative ">
              <GrFormClose
                size={20}
                className="absolute right-1 top-1 cursor-pointer hover:scale-125"
                onClick={() => handleCloseAddBookModal()}
              />
              <form className=" space-y-2 w-[98%]">
                <div className=" flex flex-row space-x-3 w-[100%]">
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
                  <div className="space-y-1 w-[100%]">
                    <h2 className="font-semibold text-2xl ">
                      {book?.volumeInfo?.title}
                    </h2>
                    {book?.volumeInfo?.authors?.at(0) ? (
                      <p className="font-light italic">
                        by&nbsp;
                        {book?.volumeInfo?.authors?.at(0)}
                      </p>
                    ) : null}
                    <div className="flex space-x-1">
                      <BsStar className="hover:text-yellow-300" />
                      <BsStar />
                      <BsStar />
                      <BsStar />
                      <BsStar />
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
                      {
                        if (
                          user?.Books?.filter(
                            (item) => item.book?.google === book?.id
                          ).length > 0
                        ) {
                          updateUserBook(
                            user?.Books?.filter(
                              (item) => item.book?.google === book?.id
                            )[0]?.id,
                            "Read",
                            text
                          );
                        } else if (bookBd?.google === book?.id) {
                          createBookPost(bookBd?.id, user?.id, "Read", text);
                        } else {
                          createBook(book, user?.id, "Read", text);
                        }
                      }
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
