import { Comments, Posts } from "@prisma/client";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
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
                className="h-9 w-9 rounded-full cursor-pointer"
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
