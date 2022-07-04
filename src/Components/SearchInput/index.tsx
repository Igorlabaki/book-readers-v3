import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { ReactNode, useEffect, useState } from "react";
import useBookContext from "../../Hooks/useBookContext";
import { Button } from "../util/Button";
import { SearchListDropDownMenu } from "../Modals/serachListDropDown";
import Image from "next/image";
import useGoogleBooksContext from "../../Hooks/useGoogleBooksContext";

export function SearchInput() {
  const { getBooks, booksSearch } = useGoogleBooksContext();

  const [search, setSearch] = useState("");
  const [error, setError] = useState("Sorry we didnt find any book!");

  const [searchListModal, setSearchListModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setSearchListModal(true);
  }, [search]);

  useEffect(() => {
    try {
      if (search != "") {
        getBooks(search, "5");
      }
    } catch (error) {
      setError("Sorry we didnt find any book");
    }
  }, [search]);

  function handleCloseSearchListModal() {
    setSearchListModal(false);
  }

  function handleOpenSearchListModal() {
    setSearchListModal(true);
  }

  function handleResultContainer() {
    if (booksSearch && search != "") {
      return (
        <>
          {booksSearch.map((book, i) => (
            <>
              <div
                className="flex hover:bg-blue-200 w-full cursor-pointer py-3"
                key={book.id}
                onClick={() => {
                  router.push(`/search/id/${book.id}`);
                  setSearch("");
                }}
              >
                <div className="flex justify-center items-center">
                  {book.volumeInfo.imageLinks ? (
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt=""
                      className="h-[80px] w-[70px] ml-1"
                    />
                  ) : (
                    <img
                      src="/images/photos/book-default.jpg"
                      alt=""
                      className="h-[80px] ml-1"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-md font-semibold">
                    {book.volumeInfo.title}
                  </p>
                  <h4 className="text-sm">
                    by {book.volumeInfo?.authors?.at(0)}
                  </h4>
                </div>
              </div>
            </>
          ))}
          <Button
            title="Se all"
            className="flex justify-center items-center text-primary w-full text-[1rem] py-2 hover:bg-blue-200 overflow-hidden"
            onClick={() => {
              router.push(`/search/list/${search}`);
              setSearch("");
            }}
          />
        </>
      );
    } else if (search != "") {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }
  }

  return (
    <form
      action={`/search/list/${search}`}
      className="flex-1 flex  justify-center items-center"
    >
      <div className="w-[80%] flex h-10 relative  bg-bg-gray rounded-t-lg">
        <Button
          title=""
          type="submit"
          onClick={() => {
            router.push(`/search/list/${search}`);
            setSearch("");
          }}
          className="bg-blue-900 h-full w-[40px] flex justify-center 
          items-center rounded-tl-lg selection:overflow-hidden hover:brightness-[1.15]"
          icon={<FiSearch fontSize={20} color="wheat" />}
        />
        <input
          type="text"
          placeholder="Find your book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-2 outline-none bg-bg-gray rounded-tr-lg"
        />
        {search && searchListModal ? (
          <SearchListDropDownMenu onClose={handleCloseSearchListModal}>
            {handleResultContainer()}
          </SearchListDropDownMenu>
        ) : null}
      </div>
    </form>
  );
}
