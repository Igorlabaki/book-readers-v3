import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsChatDotsFill, BsFillChatSquareFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcComments, FcReading } from "react-icons/fc";
import { UserBookContext } from "../../Context/UserBooksContext";
import useBookContext from "../../Hooks/useBookContext";

interface bookStatusProps {
  bookUser?: any;
  average?: any;
}

export function BookStatus({ bookUser }: bookStatusProps) {
  const { bookBd } = useBookContext();

  const [selectBook, setSelectBook] = useState(null);
  const [average, setAvarage] = useState(null);

  useEffect(() => {
    const teste = async () => {
      const result = await fetch(`/api/book/${bookUser?.id}`, {
        method: "GET",
      });
      const fetchData = await result.json();
      setSelectBook(() => fetchData[0]);
      setAvarage(fetchData[1]);
    };
    teste();
  }, []);

  const bookRead = selectBook?.User?.filter((item) => item.listType === "Read");

  const router = useRouter();

  return (
    <div className="flex justify-center items-center space-x-3 w-[100%]">
      <div className="flex flex-col justify-center items-center space-y-1">
        <FcReading
          size={22}
          className={bookRead?.length > 0 ? `text-blue-900` : "text-gray-400"}
        />
        <p
          className={
            bookRead?.length > 0
              ? `text-blue-900 font-semibold`
              : "text-gray-400 font-semibold"
          }
        >
          {bookRead?.length ? bookRead?.length : 0}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  space-y-[0.35rem]">
        <FcComments
          size={20}
          className={`
            ${
              selectBook?.Posts?.length > 0
                ? `text-blue-900 cursor-pointer`
                : "text-gray-400"
            }`}
          onClick={() => {
            if (selectBook?.Posts?.length > 0) {
              router.push(`/allBookPosts/${selectBook.google}`);
            }
          }}
        />

        <p
          className={`font-semibold
            ${selectBook?.Posts?.length > 0 ? `text-blue-900` : "text-gray-400"}
          `}
        >
          {selectBook?.Posts?.length ? selectBook?.User?.length : 0}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  space-y-1">
        <AiFillStar size={20} className={`text-yellow-400`} />
        <p
          className={`font-semibold
            ${average?._avg?.rate > 0 ? `text-blue-900` : "text-gray-400"}
          `}
        >
          {average?._avg?.rate ? average?._avg?.rate : 0}
        </p>
      </div>
    </div>
  );
}
