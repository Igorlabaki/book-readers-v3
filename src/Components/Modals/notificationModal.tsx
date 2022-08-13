import { ReactNode } from "react";

export interface propsNotificationModal {
  onClose: () => void;
  children: ReactNode;
}

export function NotificationModalComponent({
  onClose,
  children,
}: propsNotificationModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id) onClose();
  };

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div
          id="external"
          onClick={handleOutsideClick}
          className="flex w-full h-full fixed top-0 right-0 z-40 bg-transparent opacity-60"
        />
        <div
          id="internal"
          className={`flex justify-center items-center flex-col bg-white shadow-lg min-w-[250px]
           z-50 rounded-b-lg 
           absolute top-7
           -translate-x-32
          rounded-tl-lg overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
