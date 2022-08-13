import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdKeyboardArrowDown } from "react-icons/md";
import useBookContext from "../../Hooks/useBookContext";
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";
import { ListOptions } from "../list/listOptions";
import { Button } from "./Button";

interface SelectListBookProps {
  handleOpenAddBookModal: any;
  handleCloseCancelListModal: any;
  handleOpenCancelListModal: any;
  bookUser: any;
  userBookFilter: any;
}

export function SelectListBook({
  bookUser,
  userBookFilter,
  handleCloseCancelListModal,
  handleOpenAddBookModal,
  handleOpenCancelListModal,
}: SelectListBookProps) {
  const { getBookBd } = useBookContext();
  const { getBook } = useGoogleBooksContext();

  const [showleDeleteIcon, setshowDeleteIcon] = useState(false);

  const [selectRatingModal, setSelectRatingModal] = useState(false);

  function handleCloseSelectRatingModal() {
    setSelectRatingModal(false);
  }

  return (
    <>
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
          handleCloseCancelListModal={() => handleCloseCancelListModal()}
        />
      </div>
    </>
  );
}
