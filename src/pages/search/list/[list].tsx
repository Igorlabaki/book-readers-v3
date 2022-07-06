import { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useRouter } from "next/router";
import { Button } from "../../../Components/util/Button";
import useBookContext from "../../../Hooks/useBookContext";
import HearderComponent from "../../../Components/Header";
import { AddBookModalComponent } from "../../../Components/Modals/addBookModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import useGoogleBooksContext from "../../../Hooks/useGoogleBooksContext";
import useUserContext from "../../../Hooks/useUserContext";
import { CardComponent } from "../../../Components/util/Card";
import { LoadingListComponent } from "../../../Components/util/listLoadingPage";

interface SearchProps {
  search?: any;
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

export default function SearchListComponent() {
  const [addBookModal, setAddBookModal] = useState(false);

  const {
    query: { list },
  } = useRouter();

  function handleOpenAddBookModal() {
    setAddBookModal(true);
  }

  function handleCloseAddBookModal() {
    setAddBookModal(false);
  }

  const { booksSearch, getBooks, book, getBook } = useGoogleBooksContext();
  const { createBook } = useBookContext();
  const { user } = useUserContext();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState<Number>();

  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const [text, setText] = useState("");

  const indexOfLastBook = currentPage * elementsPerPage;
  const indexOfFirstPost = indexOfLastBook - elementsPerPage;
  const currentBooks = booksSearch.slice(indexOfFirstPost, indexOfLastBook);

  const pageNumbers = [];
  const totalPages = +totalElements / elementsPerPage;

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  function addPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function downPage() {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setLoadingPage(true);
    getBooks(list, "40");
    setTotalElements(booksSearch.length);
    setTimeout(() => setLoadingPage(false), 2500);
  }, [router.asPath]);

  return (
    <div className="w-[100%] bg-bg-gray py-24 space-y-3">
      <HearderComponent />
      {loadingPage ? (
        <LoadingListComponent />
      ) : (
        currentBooks.map((book) => {
          return (
            <>
              <CardComponent key={book?.id}>
                <div className="flex space-x-3">
                  {book?.volumeInfo?.imageLinks ? (
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail}
                      alt="book cover"
                      className="h-min-[200px] cursor-pointer"
                      onClick={() => router.push(`/search/id/${book.id}`)}
                    />
                  ) : (
                    <img
                      src="/images/photos/book-default.jpg"
                      alt=""
                      className="h-[200px] cursor-pointer"
                      onClick={() => router.push(`/search/id/${book.id}`)}
                    />
                  )}
                  <div className="w-[100%] ">
                    <div className="flex justify-between">
                      <h2 className="font-bold">{book?.volumeInfo?.title}</h2>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          getBook(book.id);
                          handleOpenAddBookModal();
                        }}
                        icon={<BiBookAdd size={20} className="text-primary" />}
                        className="flex text-white p-[10px] rounded-[0.5rem] justify-center items-center right-0 hover:scale-105"
                      />
                    </div>
                    <p>
                      <strong>Author:</strong>&nbsp;
                      {book?.volumeInfo?.authors?.at(0)}
                    </p>
                    <p>
                      <strong>Category:</strong>&nbsp;
                      {book?.volumeInfo?.categories?.at(0)}
                    </p>
                    <div className="flex space-x-2">
                      <p>
                        <strong>Published:</strong>
                        &nbsp;{book?.volumeInfo?.publishedDate}
                      </p>
                      <p>
                        <strong>Pages:</strong>
                        &nbsp;{book?.volumeInfo?.pageCount}
                      </p>
                    </div>
                    <div className="text-justify w-[90%]">
                      {book?.volumeInfo?.description?.slice(0, 300)}...
                    </div>
                  </div>
                </div>
              </CardComponent>
            </>
          );
        })
      )}
      {addBookModal ? (
        <AddBookModalComponent onClose={handleCloseAddBookModal}>
          <div className="bg-white flex flex-row  justify-center py-10 px-10 rounded-lg gap-5 relative ">
            <GrFormClose
              size={20}
              className="absolute right-2 top-2 cursor-pointer hover:scale-125"
              onClick={() => handleCloseAddBookModal()}
            />
            {book?.volumeInfo?.imageLinks ? (
              <img
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt=""
                className="w-[200px] shadow-pattern rounded-md"
              />
            ) : (
              <img
                src="/images/photos/book-default.jpg"
                alt=""
                className="w-[200px]"
              />
            )}
            <div className="flex-col justify-start items-start flex-1 space-y-4">
              <h2 className="font-semibold text-3xl ">
                {book?.volumeInfo?.title}
              </h2>
              {book?.volumeInfo?.authors?.at(0) ? (
                <p className="font-semibold">
                  by&nbsp;
                  {book?.volumeInfo?.authors?.at(0)}
                </p>
              ) : null}
              <form className="space-y-3">
                <select
                  id="listTypeSelect"
                  className="cursor-pointer mt-2 border-2 w-[80%]"
                >
                  <option value="read" selected>
                    Read
                  </option>
                  <option value="reading">Reading</option>
                  <option value="wantRead">Want to read</option>
                </select>
                <p>What do you think about?</p>
                <textarea
                  placeholder={"Enter your review..."}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="resize-none w-[80%] bg-bg-gray
                  rounded-md px-3 py-3 outline-none h-[180px]"
                ></textarea>
                <Button
                  title="Confirm"
                  onClick={(e) => {
                    e.preventDefault();
                    createBook(book, text, user?.id, "read");
                    router.push("/homePage");
                  }}
                  disabled={text ? false : true}
                  className={`${
                    !text ? "bg-[#BBBFC1]" : "bg-blue-900"
                  } mt-24 flex text-white p-[10px] rounded-[0.25rem] w-[50%] justify-center items-center hover:brightness-105`}
                ></Button>
              </form>
            </div>
          </div>
        </AddBookModalComponent>
      ) : null}
      {totalPages > 1 ? (
        <div className="flex justify-center items-center gap-1">
          {currentPage > 1 ? (
            <Button
              onClick={() => downPage()}
              icon={<IoIosArrowBack fontSize={15} />}
              className="flex justify-center items-center"
            />
          ) : (
            ""
          )}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`decoration-none flex justify-center items-center rounded-sm overflow-hidden bg-black`}
            >
              <a
                onClick={() => setCurrentPage(number)}
                className={`
                ${
                  currentPage === number
                    ? "bg-primary text-secundary border-black"
                    : "bg-blue-100 text-primary border-primary"
                }
                 border-[1px]  cursor-pointer p-1  w-[1.5rem] h-[1.5rem] hover:brightness-110 flex justify-center items-center`}
              >
                {number}
              </a>
            </li>
          ))}
          {currentPage < totalPages ? (
            <Button
              onClick={() => addPage()}
              icon={<IoIosArrowForward fontSize={15} />}
              className="flex justify-center items-center"
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
};
