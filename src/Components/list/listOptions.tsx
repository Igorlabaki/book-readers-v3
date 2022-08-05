import { useRouter } from "next/router";
import React from "react";
import useBookContext from "../../Hooks/useBookContext";
import useUserBookContext from "../../Hooks/useUserBookContext";
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { propsSelectListModal } from "../Modals/selectListModal";
import dynamic from "next/dynamic";

interface Props {
  lisOpenIsOpen: boolean;
  setlistOptionsClose: () => any;
  handleOpenAddBookModal: () => any;
  handleCloseCancelListModal: () => any;
}

export function ListOptions({
  lisOpenIsOpen,
  setlistOptionsClose,
  handleOpenAddBookModal,
  handleCloseCancelListModal,
}: Props) {
  const { user } = useUserContext();
  const { bookBd, createBook } = useBookContext();
  const { updateUserBook } = useUserBookContext();
  const { book } = useGoogleBooksContext();
  const { createBookPost } = usePostsContext();

  const router = useRouter();

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

  const SelectListModal = dynamic<propsSelectListModal>(() => {
    return import("../Modals/selectListModal").then(
      (comp) => comp.SelectListModal
    );
  });

  return (
    <>
      {lisOpenIsOpen ? (
        <SelectListModal onClose={() => setlistOptionsClose()}>
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
                  handleCloseCancelListModal();
                  handleUpdate(e, "Currently Reading");
                }}
              >
                Currently Reading
              </p>
              <p
                className="cursor-pointer pl-2 hover:bg-secundary"
                onClick={(e) => {
                  handleCloseCancelListModal();
                  handleUpdate(e, "Want to Read");
                }}
              >
                Want to Read
              </p>
            </div>
          </div>
        </SelectListModal>
      ) : null}
    </>
  );
}
