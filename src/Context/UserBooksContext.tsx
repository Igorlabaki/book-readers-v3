import { Books, UserBooks } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import useBookContext from "../Hooks/useBookContext";
import usePostsContext from "../Hooks/usePostsContext";
import useUserContext from "../Hooks/useUserContext";

interface UserBookContextProvider {
  children: ReactNode;
}

interface UserBookContext {
  mostReadList?: Books[];
  mostPostsList?: Books[];
  ratingBookList?: Books[];
  userBookBd?: UserBooks;
  getMostReadBook?: () => void;
  getMostPostBook?: () => void;
  getUserBook?: (userBookId: String) => void;
  deleteUserBooks?: (userBook: UserBooks, bookId: string) => void;

  loadingTypeList?: boolean;

  updateUserBook?: (
    userBookId: string,
    listType: string,
    rate?: number,
    text?: string
  ) => void;
}

const initialState: UserBookContext = {};

export const UserBookContext = createContext<UserBookContext>(initialState);

export function UserBookContextProvider({ children }: UserBookContextProvider) {
  const { getPosts } = usePostsContext();
  const { getUser } = useUserContext();
  const { getBookBd } = useBookContext();

  const [mostReadList, setMostReadList] = useState<Books[]>([]);
  const [ratingBookList, setRatingBookList] = useState<Books[]>([]);
  const [mostPostsList, setMostPostsList] = useState<Books[]>([]);
  const [userBookBd, setuserBookBd] = useState<UserBooks>();
  const [loadingTypeList, setloadingTypeList] = useState<boolean>();

  async function updateUserBook(
    userBookId: string,
    listType: string,
    rate?: number,
    text?: string
  ) {
    const date = new Date();
    const data = {
      id: userBookId,
      listType: listType,
      rate: rate,
      text: text,
      date: date,
    };

    try {
      const result = await fetch("/api/userBook", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const fetchData = await result.json();
      getUser(fetchData.fk_id_user);
      getPosts(fetchData.fk_id_user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getMostReadBook() {
    setloadingTypeList(true);
    const result = await fetch(`/api/userBook/${"mostReadBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostReadList(fetchData);
    setloadingTypeList(false);
  }

  async function getRatingBook() {
    setloadingTypeList(true);
    const result = await fetch(`/api/userBook/${"ratingBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setRatingBookList(fetchData);
    setloadingTypeList(false);
  }

  async function getMostPostBook() {
    setloadingTypeList(true);
    const result = await fetch(`/api/userBook/${"mostPostsBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostPostsList(fetchData);
    setloadingTypeList(false);
  }

  async function getUserBook() {
    const result = await fetch(`/api/userBook/${"userBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setuserBookBd(fetchData);
  }

  async function deleteUserBooks(userBook: UserBooks, bookId: string) {
    try {
      const response = await fetch("/api/userBook", {
        method: "DELETE",
        body: JSON.stringify(userBook),
      });
      const result = await response.json();
      getUser(result.fk_id_user);
      getBookBd(bookId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserBookContext.Provider
      value={{
        mostReadList,
        mostPostsList,
        ratingBookList,
        userBookBd,
        getUserBook,
        getMostReadBook,
        getMostPostBook,
        deleteUserBooks,
        loadingTypeList,
        updateUserBook,
      }}
    >
      {children}
    </UserBookContext.Provider>
  );
}
