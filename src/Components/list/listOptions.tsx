import { useRouter } from "next/router";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
import { BsStar } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { BookContext } from "../../Context/BooksContext";
import useBookContext from "../../Hooks/useBookContext";
<<<<<<< HEAD
import useUserBookContext from "../../Hooks/useUserBookContext";
=======
import useUserBookContext from "../../Hooks/useBookContext copy";
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { AddBookModalComponent } from "../Modals/addBookModal";
import { ModalSelectRating } from "../Modals/selectRatingModal";
import { Button } from "../util/Button";

interface Props {
  lisOpenIsOpen: boolean;
  setlistOptionsClose: () => any;
  handleOpenAddBookModal: () => any;
<<<<<<< HEAD
  handleCloseCancelListModal: () => any;
=======
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
}

export function ListOptions({
  lisOpenIsOpen,
  setlistOptionsClose,
  handleOpenAddBookModal,
<<<<<<< HEAD
  handleCloseCancelListModal,
=======
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
}: Props) {
  const { user } = useUserContext();
  const { bookBd, createBook } = useBookContext();
  const { updateUserBook } = useUserBookContext();
  const { book } = useGoogleBooksContext();
  const { createBookPost } = usePostsContext();

  const router = useRouter();

<<<<<<< HEAD
  useEffect(() => {}, []);

=======
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
  function handleUpdate(e, selectValue) {
    e.preventDefault();
    if (
      user?.Books?.filter((item) => item.book?.google === book?.id).length > 0
    ) {
      updateUserBook(
        user?.Books?.filter((item) => item.book?.google === book?.id)[0]?.id,
        selectValue
      );
    } else if (bookBd?.google === book?.id) {
      createBookPost(bookBd?.id, user?.id, selectValue);
    } else {
      createBook(book, user?.id, selectValue);
    }
    router.push("/homePage");
  }

  return (
    <>
      {lisOpenIsOpen ? (
        <ModalSelectRating onClose={() => setlistOptionsClose()}>
          <div className="w-[100%]">
            <div className="flex flex-col justify-start w-[100%]  border-gray-500">
              <p
                className="cursor-pointer pl-2 hover:bg-secundary w-[100%] "
                onClick={() => handleOpenAddBookModal()}
              >
                Read
              </p>
              <p
                className="cursor-pointer pl-2 hover:bg-secundary"
                onClick={(e) => {
<<<<<<< HEAD
                  handleCloseCancelListModal();
=======
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
                  handleUpdate(e, "Currently Reading");
                }}
              >
                Currently Reading
              </p>
              <p
                className="cursor-pointer pl-2 hover:bg-secundary"
                onClick={(e) => {
<<<<<<< HEAD
                  handleCloseCancelListModal();
                  handleUpdate(e, "Want to Read");
                }}
              >
                Want to Read
=======
                  handleUpdate(e, "Want to Read");
                }}
              >
                Wanto to Read
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
              </p>
            </div>
          </div>
        </ModalSelectRating>
      ) : null}
    </>
  );
}
