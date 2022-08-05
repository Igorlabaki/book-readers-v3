import React from "react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import useUserContext from "../../Hooks/useUserContext";
import { BooksCoverComponent } from "../util/booksCover";
import { CardComponent } from "../util/Card";
import { NoRegisterComponent } from "../util/noRegister";

export interface BioComponentProps {
  booksProfileRead: [];
}

export function BioComponent({ booksProfileRead }: BioComponentProps) {
  const {
    getPagesRead,
    getAveragePages,
    getLongestBook,
    getShortestBook,
    getLastRead,
  } = useUserContext();

  const pagesRead = getPagesRead(booksProfileRead);

  return (
    <>
      <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Bio</p>
      <CardComponent classname="mt-5 flex w-[100%] bg-white">
        <div className="w-[45%]">
          <div className="flex space-x-3 w-[100%]">
            <p className="font-semibold w-[50%]">Books read:</p>
            <p className="italic ">{booksProfileRead?.length}</p>
          </div>
          <div className="flex space-x-3 w-[100%]">
            <p className="font-semibold w-[50%]">Average pages:</p>
            <p className="italic ">
              {getAveragePages(booksProfileRead)
                ? getAveragePages(booksProfileRead)
                : 0}
            </p>
          </div>
          <div className="flex space-x-3 w-[100%]">
            <p className="font-semibold w-[50%]">Pages read:</p>
            <p className="italic ">{getPagesRead(booksProfileRead)}</p>
          </div>
          <div className="mt-3 space-y-3">
            <p className="font-semibold">Achievements:</p>
            <div className="flex items-start space-x-5">
              <div className="flex flex-col justify-center items-center">
                <AiTwotoneTrophy
                  size={30}
                  color={
                    pagesRead <= 500
                      ? "#d9d7d7"
                      : pagesRead > 500 && pagesRead <= 1000
                      ? "#80724b"
                      : pagesRead > 1000 && pagesRead <= 2500
                      ? "#aadb9e"
                      : pagesRead > 2500 && pagesRead <= 10000
                      ? "#fcba03"
                      : pagesRead > 10000
                      ? "#4fd9e0"
                      : null
                  }
                />
                <p className="italic text-[12px] text-gray-400">
                  {pagesRead <= 500
                    ? ""
                    : pagesRead > 500 && pagesRead <= 1000
                    ? "+500 pgs"
                    : pagesRead > 1000 && pagesRead <= 5000
                    ? "+1000 pgs"
                    : pagesRead > 5000 && pagesRead <= 10000
                    ? "+2500 pgs"
                    : pagesRead > 10000
                    ? "+10.000 pgs"
                    : null}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <ImBooks
                  size={30}
                  color={
                    booksProfileRead?.length < 5
                      ? "#d9d7d7"
                      : booksProfileRead?.length >= 5 &&
                        booksProfileRead?.length <= 20
                      ? "#80724b"
                      : booksProfileRead?.length > 25 &&
                        booksProfileRead?.length <= 50
                      ? "#aadb9e"
                      : booksProfileRead?.length > 100 &&
                        booksProfileRead?.length <= 500
                      ? "#fcba03"
                      : booksProfileRead?.length > 500
                      ? "#4fd9e0"
                      : null
                  }
                />
                <p className="italic text-[12px] text-gray-400">
                  {booksProfileRead?.length < 5
                    ? ""
                    : booksProfileRead?.length >= 5 &&
                      booksProfileRead?.length <= 20
                    ? "+5 books"
                    : booksProfileRead?.length > 25 &&
                      booksProfileRead?.length <= 50
                    ? "+25 books"
                    : booksProfileRead?.length > 100 &&
                      booksProfileRead?.length <= 500
                    ? "+100 books"
                    : booksProfileRead?.length > 500
                    ? "+500 books"
                    : null}
                </p>
              </div>
            </div>
          </div>
        </div>
        {booksProfileRead?.length > 0 ? (
          <div className="flex justify-start items-center space-x-3">
            <BooksCoverComponent
              element={getLastRead(booksProfileRead)}
              text={"Lasted Read"}
            />
            <BooksCoverComponent
              element={getLongestBook(booksProfileRead)}
              text={"Longest Book"}
            />
            <BooksCoverComponent
              element={getShortestBook(booksProfileRead)}
              text={"Shortest Book"}
            />
          </div>
        ) : (
          <NoRegisterComponent text={"books"} />
        )}
      </CardComponent>
    </>
  );
}
