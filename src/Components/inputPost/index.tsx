import { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useSession } from "next-auth/react";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";
import { Console } from "console";
import { CardComponent } from "../util/Card";

interface InputProps {
  post?: Posts;
}

export function InputPostComponent({ post }: InputProps) {
  const [textInput, setTextInput] = useState("");

  const { user } = useUserContext();
  const { createPost } = usePostsContext();
  const [index, setINdex] = useState("");

  const [error, setError] = useState("");

  const postInput = {
    text: textInput,
    user_id: user?.id,
  };

  const phrases = [
    "I Love Books...",
    "Why do you love books?",
    "What`s your favourite book?",
    "What`s your favourite author?",
  ];

  function pickRamdomPhrase(min, max) {
    const ramdomIndex = Math.random() * (max - min) + min;
    setINdex(ramdomIndex.toFixed(0));
  }

  useEffect(() => {
    pickRamdomPhrase(0, phrases.length);
  }, []);

  return (
    <>
      <CardComponent>
        <textarea
          placeholder={phrases[index]}
          value={error ? error : textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className={`w-full rounded-lg px-5 py-5 
          bg-bg-gray
          outline-none mt-5 resize-none`}
        />
        <div className="flex w-[100%] justify-end items-center">
          <Button
            title="Post"
            onClick={(e) => {
              e.preventDefault();
              {
                !textInput ? null : createPost(postInput);
              }
              setTextInput("");
            }}
            className="bg-blue-900 py-2 px-4  hover:brightness-[1.15] text-white rounded-lg mt-2 w-[20%]"
          />
        </div>
      </CardComponent>
    </>
  );
}
