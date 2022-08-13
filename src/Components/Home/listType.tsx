import { Books } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { type } from "os";
import React, { memo } from "react";

interface Props {
  listType: Books[];
  text: string;
  type: string;
}

export function ListType({ listType, text, type }: Props) {
  const router = useRouter();

  return (
    <>
      {listType?.length === 0 ? (
        <div className="text-lg font-semibold h-[100px] flex justify-center items-center text-gray-300 text-center w-[100%]">
          <p>{text}</p>
        </div>
      ) : (
        listType?.map((book: any, i) => {
          return (
            <>
              <div
                onClick={() => {
                  router.push(`/search/id/${book?.google}`);
                }}
                className="relative h-[200px] w-[120px] cursor-pointer rounded-md overflow-hidden shadow-pattern flex justify-center items-center text-center text-stone-100 bg-gray-300"
              >
                <p className="absolute left-1 z-20 top-1 text-white font-semibold bg-black p-1 rounded-full h-6 w-6 flex justify-center items-center text-md">
                  {i + 1}
                </p>
                <p className="absolute bottom-2 z-20 right-2 text-[10px] flex justify-center items-center h-5 w-5 bg-black p-1 rounded-full">
                  {type.includes("books")
                    ? `${
                        book?.User?.filter((book) => book?.listType === "Read")
                          .length
                      }x`
                    : `${book?.Posts?.length}x`}
                </p>
                {book?.smallThumbnail ? (
                  <figure className="w-full h-full rounded-md cursor-pointer overflow-hidden relative">
                    <img
                      src={book?.smallThumbnail}
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => {
                        router.push(`/search/id/${book?.google}`);
                      }}
                    />
                  </figure>
                ) : (
                  <figure className="h-full  w-full shadow-pattern rounded-md cursor-pointer relative">
                    <img
                      src="/images/photos/book-default.jpg"
                      alt="book cover"
                      className="w-full h-full"
                      onClick={() => {
                        router.push(`/search/id/${book?.google}`);
                      }}
                    />
                  </figure>
                )}
              </div>
            </>
          );
        })
      )}
    </>
  );
}

const MemoizedListType = memo(ListType);
export { MemoizedListType };
