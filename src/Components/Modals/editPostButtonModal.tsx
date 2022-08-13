import { ReactNode } from "react";

export interface propsEditPostButton {
  onClose: () => void;
  children: ReactNode;
}

export function EditPostButtonModal({
  onClose,
  children,
}: propsEditPostButton) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center absolute">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex w-full h-full fixed top-0 right-0 z-40 bg-transparent opacity-60"
        />
        <div
          id="internal"
          className={`flex justify-center items-center flex-col bg-bg-gray shadow-lg min-w-[150px] z-50 rounded-b-lg rounded-tl-lg overflow-hidden absolute top-[0.15rem] right-2`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
