import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdKeyboardArrowDown } from "react-icons/md";
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
import { BsBookshelf, BsFillChatSquareFill } from "react-icons/bs";
import dynamic from "next/dynamic";
import { AiFillStar } from "react-icons/ai";
import { RatingModals } from "../../../Components/util/RatingModals";
import { FcComments, FcReading } from "react-icons/fc";

export default function Home() {
  const {
    query: { id },
  } = useRouter();

  const { book, getBook, getBookByAuthor, authorsBooksList } =
    useGoogleBooksContext();

  const { user } = useUserContext();

  const [addBookModal, setAddBookModal] = useState(false);
  const [cancelListkModal, setCancelListModal] = useState(false);
  const [showleDeleteIcon, setshowDeleteIcon] = useState(false);
  const [selectRatingModal, setSelectRatingModal] = useState(false);
  const { getBookBd, bookBd, average } = useBookContext();

  function handleOpenAddBookModal() {
    setAddBookModal(true);
  }

  function handleCloseAddBookModal() {
    setAddBookModal(false);
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
  const router = useRouter();

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
                    <FcReading
                      size={22}
                      className={
                        bookRead?.length > 0 ? `text-blue-900` : "text-gray-400"
                      }
                    />
                    <p
                      className={`font-semibold
                        ${
                          bookRead?.length > 0
                            ? `text-blue-900`
                            : "text-gray-400"
                        }
                      `}
                    >
                      {bookRead?.length}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <FcComments
                      size={20}
                      className={
                        bookBd?.Posts?.length > 0
                          ? `text-blue-900`
                          : "text-gray-400"
                      }
                      onClick={() => {
                        router.push(`/allBookPosts/${book.id}`);
                      }}
                    />

                    <p
                      className={`font-semibold
                       ${
                         bookBd?.User?.length > 0
                           ? `text-blue-900`
                           : "text-gray-400"
                       }`}
                    >
                      {bookBd?.User?.length}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <AiFillStar
                      size={20}
                      className={
                        average?._avg?.rate > 0
                          ? `text-yellow-400`
                          : "text-gray-400"
                      }
                    />
                    <p
                      className={`font-semibold
                       ${
                         average?._avg?.rate > 0
                           ? `text-blue-900`
                           : "text-gray-400"
                       }
                      `}
                    >
                      {average?._avg?.rate ? average?._avg?.rate : 0}
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
        <RatingModals
          addBookModal={addBookModal}
          cancelListkModal={cancelListkModal}
          handleCloseAddBookModal={handleCloseAddBookModal}
          handleCloseCancelListModal={handleCloseCancelListModal}
          userbook={userbook}
        />
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
