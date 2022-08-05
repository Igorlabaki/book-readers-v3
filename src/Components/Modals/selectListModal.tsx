import { ReactNode } from "react";

export interface propsSelectListModal {
  onClose: () => void;
  children: ReactNode;
}

export function SelectListModal({ onClose, children }: propsSelectListModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex  h-full justify-center items-center absolute top-12 right-0">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex w-full h-full fixed top-40 right-0 z-20 bg-transparent opacity-60"
        />
        <div
          id="internal"
          className={`flex justify-start items-center flex-col bg-gray-200 shadow-lg min-w-[200px] z-50 rounded-b-md overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
