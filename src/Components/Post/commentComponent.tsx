import { Comments, Posts } from "@prisma/client";
import { useRouter } from "next/router";
<<<<<<< HEAD
import React, { memo, useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
import { EditComponent } from "./editComponent";
import { MenuButtonComponent } from "./MenuButtonComponent";

interface PropsInterface {
  post?: any;
}

export function CommentComponent({ post }: PropsInterface) {
  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      {post?.Comments?.map((comment: any) => {
        return (
          <>
            <div key={comment?.id} className={`ml-[75px] flex space-x-2 my-2`}>
              <img
                src={comment?.user?.image}
                alt="avatar"
<<<<<<< HEAD
                className="h-9 w-9 rounded-full cursor-pointer"
=======
                className="h-12 w-12 rounded-full cursor-pointer"
>>>>>>> 77f78236076e25f231f0787412c3bc29c1d4cf25
                onClick={() => {
                  router.push(`/profile/${comment?.user?.id}`);
                }}
              />
              <div className="w-[100%]">
                <div className="flex justify-between items-center cursor cursor-pointer">
                  <p
                    onClick={() => {
                      router.push(`/profile/${comment?.user?.id}`);
                    }}
                    className="font-semibold text-sm"
                  >
                    {comment?.user?.username}
                  </p>
                  <MenuButtonComponent
                    comment={comment}
                    type="comment"
                    openTextAreaModal={setTextAreaIsOpen}
                  />
                </div>
                <EditComponent
                  type={"comment"}
                  comment={comment}
                  textAreaIsOpen={textAreaIsOpen}
                  setTextAreaIsOpen={setTextAreaIsOpen}
                />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

const MemoizedCommentComponent = memo(CommentComponent);
export { MemoizedCommentComponent };
