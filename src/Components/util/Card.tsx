import React, { Children, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function CardComponent({ children }: LayoutProps) {
  return (
    <div className="p-5 bg-white rounded-2xl  w-[85%] m-auto shadow-pattern">
      {children}
    </div>
  );
}
