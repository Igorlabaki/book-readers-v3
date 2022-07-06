import React from "react";
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
}

export function EditButtonComponent({
  post,
  openTextAreaModal,
  comment,
}: EditProps) {
  const { user } = useUserContext();
  const { deletePost, updatePost } = usePostsContext();

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
              handleCloseModal();
              openTextAreaModal(true);
            }}
          />
          <Button
            title="Delete"
            icon={<BsTrash />}
            className="hover:bg-secundary flex space-x-2 justify-start items-center w-[100%] py-2 px-5"
            onClick={() => deletePost(post)}
          />
        </ModalDropDownMenu>
      ) : null}
    </div>
  );
}
