import React from "react";

interface Props {
  text: String;
}

export function NoRegisterComponent({ text }: Props) {
  return (
    <div className="w-[50%] h-[100%] justify-center items-center">
      <p className="w-[100%]  h-[100%] text-center text-lg text-gray-400 ">
        {`No ${text} register yet`}
      </p>
    </div>
  );
}
