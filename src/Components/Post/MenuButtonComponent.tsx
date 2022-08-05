import React, { memo } from "react";
import { Comments, Posts } from "@prisma/client";
import { useState } from "react";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import usePostsContext from "../../Hooks/usePostsContext";
import useUserContext from "../../Hooks/useUserContext";
import { propsEditPostButton } from "../Modals/editPostButtonModal";
import { Button } from "../util/Button";
import dynamic from "next/dynamic";

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

  const EditPostButtonModalComponent = dynamic<propsEditPostButton>(() => {
    return import("../Modals/editPostButtonModal").then(
      (comp) => comp.EditPostButtonModal
    );
  });

  return (
    <div className="relative">
      {post?.user_id == user?.id || comment?.user_id == user?.id ? (
        <div>
          <BsThreeDots onClick={handleOpenModal} className={`cursor-pointer`} />
        </div>
      ) : null}
      {(modal && post) || (modal && comment) ? (
        <EditPostButtonModalComponent onClose={handleCloseModal}>
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
        </EditPostButtonModalComponent>
      ) : null}
    </div>
  );
}

const MemoizedMenuButtonComponent = memo(MenuButtonComponent);
export { MemoizedMenuButtonComponent };
