import { useRouter } from "next/router";
import React from "react";

interface Props {
  element: any;
  wSize?: string;
  hSize?: string;
  text?: string;
}

export function BooksCoverComponent({ element, wSize, hSize, text }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-1 justify-center items-center">
      {element?.book?.smallThumbnail ? (
        <img
          src={element?.book?.smallThumbnail}
          alt=""
          onClick={() => {
            router.push(`/search/id/${element?.book?.google}`);
          }}
          className={`h-[150px] w-[100px] shadow-pattern rounded-md cursor-pointer`}
        />
      ) : (
        <img
          src="/images/photos/book-default.jpg"
          alt=""
          className="w-[130px] h-[180] shadow-pattern rounded-md cursor-pointer"
          onClick={() => {
            router.push(`/search/id/${element?.book?.google}`);
          }}
        />
      )}
      <div className="flex flex-col justify-center items-center">
        <p className={`text-sm ${text.includes("Lasted") ? "mb-4" : null}`}>
          {text}
        </p>
        {!text.includes("Lasted") ? (
          <p className="text-gray-500 text-[12px] ">{`${element?.book?.pageCount} pages`}</p>
        ) : null}
      </div>
    </div>
  );
}
