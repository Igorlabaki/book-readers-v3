import { ReactNode } from "react";

interface propsNewModal {
  onClose: () => void;
  children: ReactNode;
}

export function SearchListDropDownMenu({ onClose, children }: propsNewModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full absolute top-[2.50rem]">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex w-full h-full fixed top-0 right-0 z-20 bg-transparent opacity-60"
        />
        <div
          id="internal"
          className={`flex justify-center items-start flex-col bg-bg-gray  w-full h-fit z-50 rounded-b-lg overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
