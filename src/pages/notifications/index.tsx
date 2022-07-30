import { Notifications } from "@prisma/client";
import { useRouter } from "next/router";
import HeaderComponent from "../../Components/Header";
import { CardComponent } from "../../Components/util/Card";
import useUserContext from "../../Hooks/useUserContext";

export default function NotificationsPage() {
  const { user } = useUserContext();
  const router = useRouter();
  console.log(user?.user_notification);
  return (
    <div className="w-[100%] bg-bg-gray min-h-screen pb-[5rem]">
      <HeaderComponent />
      <div>
        <p className="w-[80%] m-auto text-3xl font-bold pt-20">Notifications</p>
        <CardComponent classname="mt-5 bg-white  space-y-2">
          {user?.user_notification.length === 0 ? (
            <p className="text-md py-1 px-3 font-semibold flex justify-center items-center text-gray-400 text-center w-[100%]">
              No notifications register yet
            </p>
          ) : (
            user?.user_notification?.map((notification: any) => {
              return (
                <div
                  key={notification?.id}
                  onClick={() =>
                    router.push(`notifications/${notification.post_id}`)
                  }
                  className={`hover:bg-secundary rounded-md py-2 px-3 w-[100%] cursor-pointer text-sm flex space-x-3 justify-start items-center`}
                >
                  <img
                    src={notification?.userAction?.image}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <p>{`${notification?.userAction?.username} ${notification?.text}`}</p>
                </div>
              );
            })
          )}
        </CardComponent>
      </div>
    </div>
  );
}
