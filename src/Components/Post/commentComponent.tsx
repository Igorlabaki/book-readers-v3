import { Comments, Posts } from "@prisma/client";
import { useEffect, useState } from "react";
import { EditComponent } from "./editComponent";
import { MenuButtonComponent } from "./MenuButtonComponent";

interface PropsInterface {
  post?: Posts;
}

export function CommentComponent({ post }: PropsInterface) {
  const [commentList, setCommentList] = useState<Comments[]>([]);

  async function getComments(postId: String) {
    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      setCommentList(result);
    } catch (error) {
      console.log(error);
    }
  }

  const [textAreaIsOpen, setTextAreaIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getComments(post?.id);
  }, []);

  return (
    <>
      {post?.Comments?.map((comment: Comments) => {
        return (
          <>
            <div key={comment?.id} className={`ml-[75px] flex space-x-2 my-2`}>
              <img
                src={comment?.user?.image}
                alt="avatar"
                className="h-12 w-12 rounded-full"
              />
              <div className="w-[100%]">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">
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
