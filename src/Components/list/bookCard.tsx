import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsStar } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdDoneOutline, MdKeyboardArrowDown } from "react-icons/md";
import useBookContext from "../../Hooks/useBookContext";
import useUserBookContext from "../../Hooks/useUserBookContext";
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { propsAddBookModal } from "../Modals/addBookModal";
import { propsCancelListModal } from "../Modals/cancelListModal";
import { Button } from "../util/Button";
import { CardComponent } from "../util/Card";
import { ListOptions } from "./listOptions";
import dynamic from "next/dynamic";

interface BookCardProps {
  bookUser: any;
  userBookFilter: any;
}

export function BookCard({ bookUser, userBookFilter }: BookCardProps) {
  const { user } = useUserContext();
  const { bookBd, createBook, getBookBd } = useBookContext();
  const { updateUserBook, deleteUserBooks } = useUserBookContext();
  const { book, getBook } = useGoogleBooksContext();
  const { createBookPost } = usePostsContext();

  const [selectRatingModal, setSelectRatingModal] = useState(false);

  function handleCloseSelectRatingModal() {
    setSelectRatingModal(false);
  }

  const [addBookModal, setAddBookModal] = useState(false);
  const [cancelListkModal, setCancelListModal] = useState(false);
  const [showleDeleteIcon, setshowDeleteIcon] = useState(false);

  const [text, setText] = useState("");

  function handleOpenAddBookModal() {
    setAddBookModal(true);
  }

  function handleCloseAddBookModal() {
    setAddBookModal(false);
  }

  function handleOpenCancelListModal() {
    setCancelListModal(true);
  }

  function handleCloseCancelListModal() {
    setCancelListModal(false);
  }

  const CancelListModalComponent = dynamic<propsCancelListModal>(() => {
    return import("../Modals/cancelListModal").then(
      (comp) => comp.CancelListModalComponent
    );
  });

  const AddBookModalComponent = dynamic<propsAddBookModal>(() => {
    return import("../Modals/addBookModal").then(
      (comp) => comp.AddBookModalComponent
    );
  });

  const router = useRouter();

  return (
    <>
      <CardComponent key={bookUser?.id}>
        <div className="flex space-x-3">
          {bookUser?.volumeInfo?.imageLinks ? (
            <img
              src={bookUser?.volumeInfo?.imageLinks?.thumbnail}
              alt="book cover"
              className="h-[200px] w-[150px] cursor-pointer shadow-pattern rounded-lg "
              onClick={() => router.push(`/search/id/${bookUser?.id}`)}
            />
          ) : (
            <img
              src="/images/photos/book-default.jpg"
              alt=""
              className="h-[200px]  w-[160px cursor-pointer shadow-pattern rounded-lg "
              onClick={() => router.push(`/search/id/${bookUser?.id}`)}
            />
          )}
          <div className="w-[100%] ">
            <div className="flex justify-between">
              <h2
                className="font-bold w-[50%] cursor-pointer"
                onClick={() => router.push(`/search/id/${bookUser?.id}`)}
              >
                {bookUser?.volumeInfo?.title}
              </h2>
              <div className=" relative flex justify-start items-center w-[200px]">
                {userBookFilter?.length > 0 ? (
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
                    {userBookFilter[0]?.listType}
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
                    getBookBd(bookUser?.id);
                    getBook(bookUser?.id);
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
            </div>
            <p className="italic font-ligth text-sm">
              by&nbsp;
              {bookUser?.volumeInfo?.authors?.at(0)}
            </p>
            <p>
              <span className="font-semibold text-sm">Category:</span>
              &nbsp;
              {bookUser?.volumeInfo?.categories?.at(0)}
            </p>
            <div className="flex space-x-2">
              <p>
                <span className="font-semibold text-sm">Published:</span>
                &nbsp;{bookUser?.volumeInfo?.publishedDate}
              </p>
              <p>
                <span className="font-semibold text-sm">Pages:</span>
                &nbsp;{bookUser?.volumeInfo?.pageCount}
              </p>
            </div>
            <div className="text-justify w-[90%]">
              {bookUser?.volumeInfo?.description?.slice(0, 300)}...
            </div>
          </div>
        </div>
      </CardComponent>
      {cancelListkModal ? (
        <CancelListModalComponent onClose={() => handleCloseCancelListModal()}>
          <GrFormClose
            size={20}
            className="absolute right-1 top-1 cursor-pointer hover:scale-125"
            onClick={() => handleCloseCancelListModal()}
          />
          <div className=" bg-white py-3 px-5 space-y-10 rounded-lg">
            <p className="text-md font-semibold">
              Removing a book deletes your rating, review, etc. Remove this book
              from all your shelves?
            </p>
            <div className="w-[100%] flex justify-center items-center space-x-5">
              <button
                onClick={() => {
                  handleCloseCancelListModal();
                  deleteUserBooks(userBookFilter[0], bookBd?.id);
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
    </>
  );
}
