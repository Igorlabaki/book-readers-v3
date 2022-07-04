import React, { Children, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function LayoutComponent({ children }: LayoutProps) {
  return <div className="w-[100%] bg-bg-gray h-screen py-10">{children}</div>;
}
