import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ModalDropDownMenu } from "../Modals/menuDropDownModal";
import { SearchInput } from "../SearchInput";
import { Button } from "../util/Button";

export default function HeaderComponent() {
  const router = useRouter();
  const { data: session } = useSession();

  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  function handleCloseDropDownMenu() {
    setDropDownMenu(false);
  }

  function handleOpenDropDownMenu() {
    setDropDownMenu(true);
  }

  useEffect(() => {
    if (!session) {
      setTimeout(() => setLoadingData(false), 1500);
    }
  }, []);

  return (
    <header className="flex justify-between w-full px-4 m-auto fixed top-0 bg-white shadow-pattern">
      <Image
        src={"/images/logo/logo-color.png"}
        width={180}
        height={80}
        alt="logo"
        className="cursor-pointer"
        onClick={() => router.push("/homePage")}
      />
      <SearchInput />
      <div className="ml-5 flex justify-center items-center relative gap-1">
        {loadingData ? (
          <div className="rounded-full w-14 h-14 cursor-pointer bg-gray-300 animate-pulse" />
        ) : (
          <img
            src={session?.user?.image}
            className="rounded-full w-14 h-14 cursor-pointer"
            alt="avatar user"
            onClick={() => handleOpenDropDownMenu()}
          />
        )}

        {dropDownMenu ? (
          <ModalDropDownMenu onClose={handleCloseDropDownMenu}>
            <Button
              title="Logout"
              className="py-2 flex justify-center items-center gap-4 w-full bg-white hover:bg-secundary cursor-pointer"
              onClick={() => signOut()}
              icon={<IoMdLogOut />}
            />
          </ModalDropDownMenu>
        ) : null}
      </div>
    </header>
  );
}
