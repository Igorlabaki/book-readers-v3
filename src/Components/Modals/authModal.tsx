import { ReactNode } from "react";


interface propsNewModal {
  onClose: () => void;
  children: ReactNode;
}

export function ModalEditComponent({onClose, children}: propsNewModal){

  const handleOutsideClick = (e:any) => {
    if(e.target.id) onClose();
  }

  return(
    <>
      <div className="flex w-full h-full justify-center items-center overflow-y-scroll">
        <div id="external" onClick={handleOutsideClick}
          className='flex w-full h-full fixed top-0 right-0 z-50 bg-black opacity-60' 
        />
        <div id="internal"
          className={`flex justify-center items-center rounded-[1.25rem] w-full h-full flex-col fixed z-[60] top-0 max-w-[48rem] px-[0.75rem] pt-[1.25rem] pb-[0.75rem]    
          border-none  lg:pt-[2.5rem] lg:pb-[2.5rem]`}
        >   
          {children}
        </div>
      </div>
    </>
  )
}
