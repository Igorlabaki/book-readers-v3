import React, { memo } from "react";
import { Comments, Posts } from "@prisma/client";
import { useState } from "react";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { ModalDropDownMenu } from "../Modals/editPostButton";
import { Button } from "../util/Button";

interface EditProps {
  post?: Posts;
  comment?: Comments;
  openTextAreaModal?: any;
  type: string;
}

export function MenuButtonComponent({
  post,
  openTextAreaModal,
  comment,
  type,
}: EditProps) {
  const { user } = useUserContext();
  const { deletePost, deleteComment } = usePostsContext();

  const [modal, setModal] = useState(false);

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }
  return (
    <div className="relative">
      {post?.user_id == user?.id || comment?.user_id == user?.id ? (
        <div>
          <BsThreeDots onClick={handleOpenModal} className={`cursor-pointer`} />
        </div>
      ) : null}
      {(modal && post) || (modal && comment) ? (
        <ModalDropDownMenu onClose={handleCloseModal}>
          <Button
            title="Edit"
            icon={<MdOutlineModeEditOutline size={19} />}
            className="hover:bg-secundary flex space-x-2 justify-start items-center w-[100%] py-2 px-5"
            onClick={() => {
              openTextAreaModal(true);
              handleCloseModal();
            }}
          />
          <Button
            title="Delete"
            icon={<BsTrash />}
            className="hover:bg-secundary flex space-x-2 justify-start items-center w-[100%] py-2 px-5"
            onClick={
              type.includes("post")
                ? () => deletePost(post.id)
                : () => deleteComment(comment?.id)
            }
          />
        </ModalDropDownMenu>
      ) : null}
    </div>
  );
}

const MemoizedMenuButtonComponent = memo(MenuButtonComponent);
export { MemoizedMenuButtonComponent };
