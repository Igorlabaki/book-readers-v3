import React, { Children, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  classname?: string;
}

export function CardComponent({ children, classname }: LayoutProps) {
  return (
    <div
      className={`${
        classname ? classname : "bg-white"
      } p-5  rounded-2xl  w-[85%] m-auto shadow-pattern `}
    >
      {children}
    </div>
  );
}
