import { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
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
import { LoadingListComponent } from "../../../Components/list/listLoadingPage";
import usePostsContext from "../../../Hooks/usePostsContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ModalSelectRating } from "../../../Components/Modals/selectRatingModal";
import { ListOptions } from "../../../Components/list/listOptions";
import { BookCard } from "../../../Components/list/bookCard";

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
  const {
    query: { list },
  } = useRouter();

  const { booksSearch, getBooks } = useGoogleBooksContext();
  const { user } = useUserContext();

  const router = useRouter();

  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState<Number>();

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
    getBooks(list);
    setTotalElements(() => booksSearch.length);
    setTimeout(() => setLoadingPage(false), 1000);
  }, [router.asPath, user?.Books]);

  return (
    <div className="w-[100%] bg-bg-gray py-24 space-y-3">
      <HearderComponent />
      {loadingPage ? (
        <LoadingListComponent />
      ) : (
        currentBooks.map((item) => {
          const userbook = user?.Books?.filter(
            (book) => book.book?.google === item?.id
          );
          return (
            <>
              <BookCard
                userBookFilter={userbook}
                bookUser={item}
                key={item.id}
              />
            </>
          );
        })
      )}
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
