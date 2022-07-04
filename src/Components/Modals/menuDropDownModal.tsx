import { ReactNode } from "react";

interface propsNewModal {
  onClose: () => void;
  children: ReactNode;
}

export function ModalDropDownMenu({ onClose, children }: propsNewModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center absolute top-12 right-20">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex w-full h-full fixed top-0 right-0 z-40 bg-transparent opacity-60"
        />
        <div
          id="internal"
          className={`flex justify-center items-center flex-col bg-white shadow-lg min-w-[150px] z-50 rounded-b-lg rounded-tl-lg overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
