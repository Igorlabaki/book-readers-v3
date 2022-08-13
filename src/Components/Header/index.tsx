import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdLogOut, IoMdNotificationsOutline } from "react-icons/io";
import useNotificationContext from "../../Hooks/useNotificationContext copy";
import useUserContext from "../../Hooks/useUserContext";
import { propsDropDownMenuModal } from "../Modals/menuDropDownModal";
import { propsNotificationModal } from "../Modals/notificationModal";
import { SearchInput } from "../SearchInput";
import { Button } from "../util/Button";

export default function HeaderComponent() {
  const router = useRouter();
  const { data: session } = useSession();

  const { user } = useUserContext();
  const { updateNotification } = useNotificationContext();

  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  function handleCloseDropDownMenu() {
    setDropDownMenu(false);
  }

  function handleOpenDropDownMenu() {
    setDropDownMenu(true);
  }

  function handleCloseNotificationModal() {
    setNotificationModal(false);
  }

  function handleOpenNotificationModal() {
    setNotificationModal(true);
  }

  const ModalDropDownMenu = dynamic<propsDropDownMenuModal>(() => {
    return import("../Modals/menuDropDownModal").then(
      (comp) => comp.ModalDropDownMenu
    );
  });

  const NotificationModal = dynamic<propsNotificationModal>(() => {
    return import("../Modals/notificationModal").then(
      (comp) => comp.NotificationModalComponent
    );
  });

  useEffect(() => {
    if (!session) {
      setTimeout(() => setLoadingData(false), 1500);
    } else {
      setLoadingData(!loadingData);
    }
  }, []);

  const userNewNotificationLength = user?.user_notifications?.filter(
    (notification) => notification.view === false
  ).length;

  return (
    <header className="flex  justify-between w-full px-4 py-2 m-auto fixed top-0 z-30 bg-white shadow-pattern">
      <figure className="w-[150px] h-[55px] relative">
        <img
          src={"/images/logo/logo-color.png"}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/homePage")}
        />
      </figure>
      <SearchInput />
      <div className="flex justify-center items-center relative">
        <div
          className={`relative  ${
            userNewNotificationLength > 0 ? "bg-red-300" : null
          } rounded-full flex justify-center items-center`}
        >
          <div
            className={`absolute bottom-5 -right-2 h-4 w-4 rounded-full text-sm flex justify-center items-center ${
              userNewNotificationLength > 0
                ? "bg-red-300 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {userNewNotificationLength}
          </div>
          <Button
            icon={
              <IoMdNotificationsOutline
                size={27}
                className={` hover:bg-gray-300 rounded-full p-1 ${
                  notificationModal ? ` bg-gray-300` : ""
                }
                  ${
                    userNewNotificationLength > 0
                      ? "text-white"
                      : "text-gray-500"
                  }
                  `}
              />
            }
            onClick={() => {
              handleOpenNotificationModal();
              user?.user_notifications
                ?.filter((notification) => notification.view === false)
                .map((item) => updateNotification(item));
            }}
          />
          {notificationModal ? (
            <NotificationModal onClose={handleCloseNotificationModal}>
              <div className="flex relative flex-col justify-start items-start w-[100%] bg-gray-200">
                <p className="font-bold text-md py-2 px-3 text-blue-900">
                  Notifications
                </p>
                {user?.user_notifications?.length === 0 ? (
                  <p className="text-sm py-1 px-3 font-semibold flex justify-center items-center text-gray-500 text-center w-[100%]">
                    No notifications register yet
                  </p>
                ) : (
                  user?.user_notifications?.map((notification: any, i) => {
                    if (i >= 5) {
                      return;
                    }
                    return (
                      <div
                        key={notification?.id}
                        className={`py-1 px-3 w-[100%] hover:bg-secundary cursor-pointer text-sm`}
                      >
                        <p
                          onClick={() =>
                            router.push(`notifications/${notification.post_id}`)
                          }
                        >{`${notification?.userAction?.username} ${notification?.text} `}</p>
                      </div>
                    );
                  })
                )}
                <Button
                  title="See all notifications"
                  onClick={() => router.push("/notifications")}
                  className="border-t-[0.50px] border-gray-300 flex justify-center items-center text-primary w-full text-sm py-2 hover:bg-blue-200 overflow-hidden"
                />
              </div>
            </NotificationModal>
          ) : null}
        </div>
        <div className="ml-5 flex justify-center items-center relative gap-1">
          {loadingData ? (
            <div className="rounded-full w-14 h-14 cursor-pointer bg-gray-300 animate-pulse" />
          ) : (
            <figure className="rounded-full w-14 flex h-14 cursor-pointer overflow-hidden relative">
              <Image
                src={session?.user?.image}
                layout="fill"
                objectFit="cover"
                alt="avatar user"
                onClick={() => handleOpenDropDownMenu()}
              />
            </figure>
          )}
          {dropDownMenu ? (
            <ModalDropDownMenu onClose={handleCloseDropDownMenu}>
              <div className="flex flex-col justify-start items-center w-[100%] bg-gray-200">
                <Button
                  title="Profile"
                  className="py-2 flex justify-center items-center gap-4 w-full  hover:bg-secundary cursor-pointer"
                  onClick={() => router.push(`/profile/${user.id}`)}
                  icon={<AiOutlineUser />}
                />
                <Button
                  title="Logout"
                  className="py-2 flex justify-center items-center gap-4 w-full  hover:bg-secundary cursor-pointer"
                  onClick={() => signOut()}
                  icon={<IoMdLogOut />}
                />
              </div>
            </ModalDropDownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
