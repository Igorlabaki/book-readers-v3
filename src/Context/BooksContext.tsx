import { Books } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import usePostsContext from "../Hooks/usePostsContext";

interface BookContextProvider {
  children: ReactNode;
}

interface book {
  id?: string;
  searchInfo: {
    textSnippet?: string;
  };
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];

    imageLinks: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
}

interface BookContext {
  bookBd?: any;
  average?: any;
  getBookBd?: (googleId: string) => void;

  createBook?: (
    bookInput: book,
    userId: string,
    typeList: string,
    rate?: number,
    text?: string
  ) => void;

  updateUserBook?: (userBookId: string, listType: string) => void;
}

const initialState: BookContext = {};

export const BookContext = createContext<BookContext>(initialState);

export function BookContextProvider({ children }: BookContextProvider) {
  const { createBookPost } = usePostsContext();
  const [bookBd, setBookBd] = useState();
  const [average, setAverage] = useState();

  async function getBookBd(googleId) {
    const result = await fetch(`/api/book/${googleId}`, {
      method: "GET",
    });
    const fetchData = await result.json();
    setBookBd(fetchData[0]);
    setAverage(fetchData[1]);
  }

  async function createBook(
    bookInput: book,
    userId: string,
    typeList: string,
    rate?: number,
    text?: string
  ) {
    try {
      const result = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify(bookInput),
      });
      const fetchData = await result.json();
      createBookPost(fetchData.id, userId, typeList, rate, text);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <BookContext.Provider
      value={{
        bookBd,
        average,
        createBook,
        getBookBd,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
