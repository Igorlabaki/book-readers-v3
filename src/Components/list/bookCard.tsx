import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
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
import Image from "next/image";
import { BsFillChatSquareFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { SelectListBook } from "../util/selectListBook";
import { BookStatus } from "../util/bookStatus";
import { RatingModals } from "../util/RatingModals";

interface BookCardProps {
  bookUser: any;
  userBookFilter: any;
}

export function BookCard({ bookUser, userBookFilter }: BookCardProps) {
  const [cancelListkModal, setCancelListModal] = useState(false);
  const [addBookModal, setAddBookModal] = useState(false);
  const [selectBook, setSelectBook] = useState(null);
  const [average, setAvarage] = useState(null);

  const router = useRouter();
  const { user } = useUserContext();
  const { book, getBook } = useGoogleBooksContext();

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

  useEffect(() => {
    const teste = async () => {
      const result = await fetch(`/api/book/${bookUser.id}`, {
        method: "GET",
      });
      const fetchData = await result.json();
      setSelectBook(fetchData[0]);
      setAvarage(fetchData[1]);
    };
    teste();
  }, []);

  const userbook = user?.Books?.filter(
    (item) => item.book?.google === book?.id
  );

  return (
    <>
      <CardComponent key={bookUser?.id}>
        <div className="flex space-x-3">
          <div className="flex flex-col space-y-2 justify-center items-center">
            {bookUser?.volumeInfo?.imageLinks ? (
              <figure className="h-[200px] w-[150px] overflow-hidden cursor-pointer shadow-pattern rounded-lg  relative">
                <img
                  src={bookUser?.volumeInfo?.imageLinks?.thumbnail}
                  alt="book cover"
                  className="w-full h-full"
                  onClick={() => router.push(`/search/id/${bookUser?.id}`)}
                />
              </figure>
            ) : (
              <figure className="h-[200px] overflow-hidden  w-[160px] cursor-pointer shadow-pattern rounded-lg  relative">
                <img
                  src={"/images/photos/book-default.jpg"}
                  alt="book cover"
                  className="w-full h-full"
                  onClick={() => router.push(`/search/id/${bookUser?.id}`)}
                />
              </figure>
            )}
            <BookStatus bookUser={bookUser} />
          </div>
          <div className="w-[100%] ">
            <div className="flex justify-between">
              <h2
                className="font-bold w-[50%] cursor-pointer"
                onClick={() => router.push(`/search/id/${bookUser?.id}`)}
              >
                {bookUser?.volumeInfo?.title}
              </h2>
              <div className="flex flex-col space-y-2">
                <SelectListBook
                  bookUser={bookUser}
                  userBookFilter={userBookFilter}
                  handleOpenAddBookModal={handleOpenAddBookModal}
                  handleCloseCancelListModal={handleCloseCancelListModal}
                  handleOpenCancelListModal={handleOpenCancelListModal}
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
      <RatingModals
        addBookModal={addBookModal}
        cancelListkModal={cancelListkModal}
        handleCloseAddBookModal={handleCloseAddBookModal}
        handleCloseCancelListModal={handleCloseCancelListModal}
        userbook={userbook}
      />
    </>
  );
}
