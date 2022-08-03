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
  userBookBd?: UserBooks;
  getMostReadBook?: () => void;
  getMostPostBook?: () => void;
  getUserBook?: (userBookId: String) => void;
  deleteUserBooks?: (userBook: UserBooks, bookId: string) => void;

  updateUserBook?: (
    userBookId: string,
    listType: string,
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
  const [mostPostsList, setMostPostsList] = useState<Books[]>([]);
  const [userBookBd, setuserBookBd] = useState<UserBooks>();

  async function updateUserBook(
    userBookId: string,
    listType: string,
    text?: string
  ) {
    const date = new Date();
    const data = {
      id: userBookId,
      listType: listType,
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
    const result = await fetch(`/api/userBook/${"mostReadBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostReadList(fetchData);
  }

  async function getMostPostBook() {
    const result = await fetch(`/api/userBook/${"mostPostsBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostPostsList(fetchData);
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
        userBookBd,
        getUserBook,
        getMostReadBook,
        getMostPostBook,
        deleteUserBooks,

        updateUserBook,
      }}
    >
      {children}
    </UserBookContext.Provider>
  );
}
