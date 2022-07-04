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
  book?: any;
  createBook?: (
    bookInput: book,
    text: string,
    userId: string,
    typeList: string
  ) => void;
}

const initialState: BookContext = {};

export const BookContext = createContext<BookContext>(initialState);

export function BookContextProvider({ children }: BookContextProvider) {
  const { createBookPost } = usePostsContext();
  const [book, setBook] = useState();
  const [error, setError] = useState(null);

  function showError(msg, time = 3000) {
    setError(msg);
    setTimeout(() => setError(null), time);
  }

  async function createBook(
    bookInput: book,
    text: string,
    userId: string,
    typeList: string
  ) {
    try {
      const result = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify(bookInput),
      });
      const fetchData = await result.json();
      createBookPost(fetchData.id, userId, text);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <BookContext.Provider
      value={{
        book,
        createBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
