import { Posts } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import usePostsContext from "../../Hooks/usePostsContext";
import { Button } from "../util/Button";

interface editComponentProps {
  post?: Posts;
  textAreaIsOpen?: boolean;
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditComponent({
  post,
  textAreaIsOpen,
  onClick,
}: editComponentProps) {
  const [textInput, setTextInput] = useState(post?.text);
  const { updatePost } = usePostsContext();

  return (
    <>
      {textAreaIsOpen ? (
        <>
          <div className="w-full mt-2 bg-white rounded-b-lg rounded-tr-lg">
            <textarea
              placeholder={post?.text}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full rounded-lg px-3 py-2
              bg-bg-gray
              outline-none resize-none"
            />
          </div>
          <div className="flex gap-x-2 mt-[10px]">
            <Button
              title="Update"
              onClick={() => {
                updatePost(post, textInput, "text");
                onClick(false);
              }}
              className="bg-blue-900  w-[80px] font-semibold text-white flex justify-center items-center rounded-md py-1 hover:brightness-110"
            />
            <Button
              onClick={() => onClick(false)}
              title="Cancel"
              className="bg-red-300 w-[80px] font-semibold text-white flex justify-center items-center rounded-md py-1 hover:bg-red-400"
            />
          </div>
        </>
      ) : (
        <div className="w-full mt-2 bg-secundary py-2 px-4 rounded-b-md rounded-tr-md">
          <p>{post?.text}</p>
        </div>
      )}
    </>
  );
}
