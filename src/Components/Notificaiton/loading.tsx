import React from "react";
import { CardComponent } from "../util/Card";
import { Button } from "../util/Button";
import { BsThreeDots } from "react-icons/bs";

export function LoadingComponent() {
  return (
    <>
      <CardComponent classname="bg-bg-gray animate-pulse">
        <div className="flex space-x-4">
          <div className="w-[60px] h-[60px] rounded-full bg-gray-300" />
          <div className="w-full py-2">
            <div className="flex justify-between items-center ">
              <div className="bg-gray-300 w-[30%] h-4"></div>
              <Button icon={<BsThreeDots size={19} />} />
            </div>
            <div className="bg-gray-300 w-[20%] h-4"></div>

            <div className="mt-3 flex space-x-3">
              <div className="h-[200px] bg-gray-300 w-[150px]" />
              <div className="w-[100%] space-y-4">
                <div className="bg-gray-300 w-[90%] h-6 " />
                <div className="bg-gray-300 w-[90%] h-20" />
                <div className="flex space-x-4">
                  <div className="flex w-[20%] h-4 bg-gray-300" />
                  <div className="flex w-[20%] h-4 bg-gray-300" />
                </div>
                <div className="bg-gray-300 w-[90%] h-8 rounded-b-lg rounded-tr-lg" />
              </div>
            </div>
          </div>
        </div>
      </CardComponent>
    </>
  );
}
