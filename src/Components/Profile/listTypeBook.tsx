import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserContext from "../../Hooks/useUserContext";
import { CardComponent } from "../util/Card";
import { SearchInput } from "../SearchInput";
import { Button } from "../util/Button";
import { FiSearch } from "react-icons/fi";
import { BookContext } from "../../Context/BooksContext";

interface listTypeBookProps {
  type: string;
  list: [];
}

export function ListTypeBook({ type, list }: listTypeBookProps) {
  const { loadingProfile } = useUserContext();

  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <>
      <CardComponent classname="mt-5 bg-white">
        <div className="flex justify-start space-x-2 w-[100%]">
          <div className="flex justify-start items-center space-x-2">
            <p className="font-bold text-lg">{`${type}`}</p>
            {!loadingProfile ? (
              <p className="font-semibold text-md">{`(${list?.length})`}</p>
            ) : null}
          </div>
          <div className="flex-1">
            <div className="flex pl-2 h-7 relative  bg-bg-gray rounded-lg">
              <Button
                title=""
                type="submit"
                onClick={() => {
                  router.push(`/search/list/${search}`);
                  setSearch("");
                }}
                className=""
                icon={<FiSearch fontSize={20} className="text-gray-800" />}
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full ml-2 outline-none bg-bg-gray rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          {loadingProfile ? (
            <div className="flex space-x-3">
              <div className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern animate-pulse" />
              <div className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern animate-pulse" />
              <div className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern animate-pulse" />
              <div className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern animate-pulse" />
              <div className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern animate-pulse" />
            </div>
          ) : (
            <div className="flex space-x-3 overflow-hidden scroll-auto">
              {list
                .filter((item) => item?.book?.title.includes(search))
                .map((item) => {
                  return (
                    <>
                      {item?.book?.smallThumbnail ? (
                        <img
                          src={item?.book?.smallThumbnail}
                          alt=""
                          className="h-[220px] w-[135px] bg-gray-300 rounded-lg shadow-pattern cursor-pointer"
                          key={item?.book?.id}
                          onClick={() => {
                            router.push(`/search/id/${item?.book?.google}`);
                          }}
                        />
                      ) : (
                        <img
                          src="/images/photos/book-default.jpg"
                          alt=""
                          className="w-[130px] h-[180] shadow-pattern rounded-md cursor-pointer"
                          onClick={() => {
                            router.push(`/search/id/${post.book.google}`);
                          }}
                        />
                      )}
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </CardComponent>
    </>
  );
}
