import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import useBookContext from "../../Hooks/useBookContext";
import useUserBookContext from "../../Hooks/useBookContext copy";
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import {
  AddBookModalComponent,
  propsAddBookModal,
} from "../Modals/addBookModal";
import {
  CancelListModalComponent,
  propsCancelListModal,
} from "../Modals/cancelListModal";
import { Button } from "./Button";

interface RatingModalsProps {
  cancelListkModal: any;
  addBookModal: any;
  userbook: any;
  handleCloseAddBookModal: () => void;
  handleCloseCancelListModal: () => void;
}

export function RatingModals({
  cancelListkModal,
  handleCloseAddBookModal,
  handleCloseCancelListModal,
  addBookModal,
  userbook,
}: RatingModalsProps) {
  const AddBookModalComponent = dynamic<propsAddBookModal>(() => {
    return import("../Modals/addBookModal").then(
      (comp) => comp.AddBookModalComponent
    );
  });

  const CancelListModalComponent = dynamic<propsCancelListModal>(() => {
    return import("../Modals/cancelListModal").then(
      (comp) => comp.CancelListModalComponent
    );
  });

  const { deleteUserBooks, updateUserBook } = useUserBookContext();
  const { createBookPost } = usePostsContext();
  const { createBook } = useBookContext();
  const { bookBd } = useBookContext();
  const { book } = useGoogleBooksContext();
  const { user } = useUserContext();

  const [selectRate, setSelectRate] = useState(null);
  const [hoverdRate, setHoverdRate] = useState(null);
  const [selectValue, setSelectValue] = useState("read");

  const [text, setText] = useState<string>("");

  const router = useRouter();
  const possibleRates = [1, 2, 3, 4, 5];

  return (
    <div>
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
            <div className=" space-y-2 w-[98%]">
              <div className=" flex flex-row space-x-3 w-[100%]">
                {book?.volumeInfo?.imageLinks ? (
                  <figure className="h-[200px] w-[160px] overflow-hidden cursor-pointer shadow-pattern rounded-lg  relative">
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail}
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => router.push(`/search/id/${book?.id}`)}
                    />
                  </figure>
                ) : (
                  <figure className="h-[200px] w-[160px] overflow-hidden cursor-pointer shadow-pattern rounded-lg  relative">
                    <img
                      src="/images/photos/book-default.jpg"
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => router.push(`/search/id/${book?.id}`)}
                    />
                  </figure>
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
                    {possibleRates.map((rate) => {
                      return (
                        <>
                          <AiFillStar
                            size={20}
                            key={rate}
                            className={`cursor-pointer`}
                            color={`${
                              rate <= selectRate || rate <= hoverdRate
                                ? "#CCCC00"
                                : "#C3C6CA"
                            }`}
                            onClick={() => {
                              setSelectRate(rate);
                            }}
                            onMouseOver={() => setHoverdRate(rate)}
                            onMouseOut={() => setHoverdRate(null)}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">What do you think about?</p>
                <textarea
                  placeholder={"Enter your review..."}
                  onChange={(e) => setText(e.target.value)}
                  className="resize-none w-[100%] bg-bg-gray
                  rounded-md px-3 py-3 outline-none h-[180px]"
                  value={text}
                />
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
                          selectRate,
                          text
                        );
                      } else if (bookBd?.google === book?.id) {
                        createBookPost(
                          bookBd?.id,
                          user?.id,
                          "Read",
                          selectRate,
                          text
                        );
                      } else {
                        createBook(book, user?.id, "Read", selectRate, text);
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
            </div>
          </div>
        </AddBookModalComponent>
      ) : null}
    </div>
  );
}
