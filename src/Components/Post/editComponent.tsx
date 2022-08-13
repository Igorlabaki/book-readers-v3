import { Comments, Posts } from "@prisma/client";
import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";

interface editComponentProps {
  post?: Posts;
  comment?: Comments;
  textAreaIsOpen: boolean;
  setTextAreaIsOpen: any;
  type: String;
}

export function EditComponent({
  post,
  type,
  comment,
  textAreaIsOpen,
  setTextAreaIsOpen,
}: editComponentProps) {
  const { updatePost, updateComment } = usePostsContext();
  const { user } = useUserContext();

  const postType = type.includes("post");
  const [textInput, setTextInput] = useState(
    postType ? post?.text : comment?.text
  );
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTextAreaIsOpen(!textAreaIsOpen);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  return (
    <>
      {textAreaIsOpen ? (
        <div className="flex  w-[100%] space-x-1">
          <form
            className={`flex w-full bg-white rounded-b-lg rounded-tr-lg`}
            onSubmit={(e) => {
              e.preventDefault();
              postType
                ? updatePost(post, textInput)
                : updateComment(comment, textInput, user);
              setTextInput("");
            }}
            ref={wrapperRef}
          >
            <input
              placeholder={postType ? post?.text : comment?.text}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full rounded-lg px-3 py-2
              bg-bg-gray
              outline-none resize-none"
            />
          </form>
          <Button
            onClick={() => {
              setTextAreaIsOpen(!textAreaIsOpen);
              setTextInput(() => post.text);
            }}
            title="Cancel"
            className="bg-red-300 w-[80px] h-10 font-semibold text-white flex justify-center 
              items-center rounded-md hover:bg-red-500"
          />
        </div>
      ) : post?.text || comment?.text ? (
        <div
          className={`w-[100%] mt-2 ${
            postType ? "bg-secundary" : "bg-green-200"
          }  py-2 px-4 rounded-b-md rounded-tr-md text-[15px]`}
        >
          <p>{postType ? post?.text : comment?.text}</p>
        </div>
      ) : null}
    </>
  );
}

const MemoizedEditComponent = memo(EditComponent);
export { MemoizedEditComponent };
