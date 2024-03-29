import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useUserContext from "../../Hooks/useUserContext";
import { CardComponent } from "../util/Card";

export interface FollowerComponentProps {}

export function FollowerComponent({}: FollowerComponentProps) {
  const { profile, loadingProfile } = useUserContext();
  const router = useRouter();
  return (
    <>
      <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Followers</p>
      <CardComponent classname="mt-5 bg-white space-y-3">
        <div className="flex justify-start items-start space-x-3 ">
          {profile?.followedBy.length === 0 ? (
            <p className="w-[100%] text-center text-lg text-gray-400">
              {profile?.username} doesnt have any followers{" "}
            </p>
          ) : (
            profile?.followedBy?.map((follow, i) => {
              console.log(follow);
              return (
                <div
                  key={i}
                  className={`flex flex-col justify-start items-start`}
                >
                  {loadingProfile ? (
                    <div className="bg-gray-300 h-[3.5rem] w-[3.5rem] rounded-full top-44 left-10 animate-pulse" />
                  ) : (
                    <figure className="rounded-full h-[4.5rem] w-[4.5rem] cursor-pointer overflow-hidden relative">
                      <img
                        src={follow?.follower?.image}
                        onClick={() => {
                          router.push(`/profile/${follow?.followerId}`);
                        }}
                        alt={follow?.follower?.username}
                      />
                    </figure>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardComponent>
    </>
  );
}
