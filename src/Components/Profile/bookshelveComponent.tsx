import React from "react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import useUserContext from "../../Hooks/useUserContext";
import { BooksCoverComponent } from "../util/booksCover";
import { CardComponent } from "../util/Card";
import { NoRegisterComponent } from "../util/noRegister";
import { ListTypeBook } from "./listTypeBook";

export interface BookShelveComponentProps {
  booksProfileRead: [];
}

export function BookShelveComponent({
  booksProfileRead,
}: BookShelveComponentProps) {
  const { profile } = useUserContext();

  return (
    <>
      <p className="w-[84%] m-auto mt-20 text-3xl font-bold">BookShelve</p>
      {profile?.Books.length == 0 ? (
        <CardComponent classname="mt-5 bg-white">
          <div className="w-[100%] h-[100%] justify-center items-center">
            <p className="w-[100%]  h-[100%] text-center text-lg text-gray-400 ">
              {`No books register yet`}
            </p>
          </div>
        </CardComponent>
      ) : booksProfileRead?.length > 0 ? (
        <ListTypeBook type="Read" list={booksProfileRead} />
      ) : null}
      {profile?.Books?.filter((book) => book.listType === "Currently Reading")
        .length > 0 ? (
        <ListTypeBook
          type="Currently Reading"
          list={profile?.Books?.filter(
            (book) => book.listType === "Currently Reading"
          )}
        />
      ) : null}
      {profile?.Books?.filter((book) => book.listType === "Want to Read")
        .length > 0 ? (
        <ListTypeBook
          type="Want to Read"
          list={profile?.Books?.filter(
            (book) => book.listType === "Want to Read"
          )}
        />
      ) : null}
    </>
  );
}
