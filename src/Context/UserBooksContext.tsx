import { Books, UserBooks } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import usePostsContext from "../Hooks/usePostsContext";

interface UserBookContextProvider {
  children: ReactNode;
}

interface UserBookContext {
  mostReadList?: Books[];
  mostPostsList?: Books[];
  getMostReadBook?: () => void;
  getMostPostBook?: () => void;
  deleteUserBooks?: (userBook: UserBooks) => void;

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
  const [mostReadList, setMostReadList] = useState<Books[]>([]);
  const [mostPostsList, setMostPostsList] = useState<Books[]>([]);

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
      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getMostReadBook() {
    const result = await fetch(`/api/userBook/${"mostReadBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostReadList(
      fetchData.filter((item) => item?.User[0]?.listType === "Read")
    );
  }

  async function getMostPostBook() {
    const result = await fetch(`/api/userBook/${"mostPostsBook"}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setMostPostsList(fetchData);
  }

  async function deleteUserBooks(userBook: UserBooks) {
    try {
      const response = await fetch("/api/userBook", {
        method: "DELETE",
        body: JSON.stringify(userBook),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserBookContext.Provider
      value={{
        mostReadList,
        mostPostsList,
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
