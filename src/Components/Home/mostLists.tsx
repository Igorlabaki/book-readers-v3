import dynamic from "next/dynamic";
import React, { memo, useEffect, useState } from "react";
import useUserBookContext from "../../Hooks/useUserBookContext";
import { CardComponent } from "../util/Card";
import { PropsListType } from "./listType";

export function MostListsComponent() {
  const { getMostReadBook, getMostPostBook, mostReadList, mostPostsList } =
    useUserBookContext();

  const [listType, setListType] = useState("Most Read");

  useEffect(() => {
    getMostReadBook();
  }, []);

  console.log("Minha prima", listType);

  const ListTypeComponent = dynamic<PropsListType>(() => {
    return import("./listType").then((comp) => comp.ListTypeComponent);
  });

  return (
    <CardComponent>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between w-[80%] m-auto text-gray-500 font-semibold">
          <p
            className={`cursor-pointer px-3 py-3 ${
              listType.includes("Most Read")
                ? "text-blue-600 border-b-2 border-blue-600 scale"
                : "hover:bg-gray-200 rounded-md "
            }`}
            onClick={() => setListType(() => "Most Read")}
          >
            Most Read
          </p>
          <p
            className={`cursor-pointer px-3 py-3 ${
              listType.includes("Most Posted")
                ? "text-blue-600 border-b-2 border-blue-600 scale"
                : "hover:bg-gray-200 rounded-md "
            }`}
            onClick={() => setListType(() => "Most Posted")}
          >
            Most Posted
          </p>
          <p
            className={`cursor-pointer px-3 py-3 ${
              listType.includes("Rating Rank")
                ? "text-blue-600 border-b-2 border-blue-600 scale"
                : "hover:bg-gray-200 rounded-md "
            }`}
            onClick={() => setListType(() => "Rating Rank")}
          >
            Rating rank
          </p>
        </div>
        <div className="flex space-x-2 justify-start items-center overflow-hidden">
          {listType.includes("Most Read") ? (
            <ListTypeComponent
              listType={mostReadList}
              text={"No books register yet"}
              type="books"
            />
          ) : listType.includes("Most Posted") ? (
            <ListTypeComponent
              listType={mostPostsList}
              text={`No post register yet`}
              type="post"
            />
          ) : listType.includes("Rating Rank") ? (
            <>
              <ListTypeComponent
                listType={[]}
                text={`No rating register yet`}
                type="Rating rank"
              />
            </>
          ) : null}
        </div>
      </div>
    </CardComponent>
  );
}

const MemoizedMostListComopnent = memo(MostListsComponent);
export { MemoizedMostListComopnent };
