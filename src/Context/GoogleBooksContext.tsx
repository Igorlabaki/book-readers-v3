import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface GoogleBookContextProvider {
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

interface GoogleBookContext {
  book?: book;
  getBook?: (bookSearch: any) => void;

  getBooks?: (bookSearch: any, maxResult?: any) => void;
  booksSearch?: book[];

  authorsBooksList?: book[];
  getBookByAuthor?: (author: string) => void;
}

const initialState: GoogleBookContext = {};

export const GoogleBookContext = createContext<GoogleBookContext>(initialState);

export function GoogleBookContextProvider({
  children,
}: GoogleBookContextProvider) {
  const [booksSearch, setBooksSearch] = useState<book[]>([]);
  const [book, setBook] = useState<book | null>(null);

  const [authorsBooksList, setAuthorBooksList] = useState<book[]>([]);

  async function getBooks(bookSearch: any, maxResults: any) {
    const resp = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/?q=${bookSearch}&key=AIzaSyCQPpX0QFUTs45EhUe1Ou5FNjEAjjvtYRQ&maxResults=${
          maxResults ? maxResults : "40"
        }`
      )
      .then((resp) => resp.data.items);
    setBooksSearch(() => resp);
  }

  async function getBook(id: any) {
    const resp = await axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((resp) => resp.data);
    setBook(resp);
  }

  async function getBookByAuthor(author: string) {
    const list = [];
    setAuthorBooksList(list);
    const authorTrim = author?.replace(" ", "+");
    const url = `q=a+inauthor:${authorTrim}`;

    const resp = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?${url}&key=AIzaSyCQPpX0QFUTs45EhUe1Ou5FNjEAjjvtYRQ`
      )
      .then((resp) => setAuthorBooksList(resp.data.items));
  }

  return (
    <GoogleBookContext.Provider
      value={{
        booksSearch,
        getBooks,

        book,
        getBook,

        authorsBooksList,
        getBookByAuthor,
      }}
    >
      {children}
    </GoogleBookContext.Provider>
  );
}
