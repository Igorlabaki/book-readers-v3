import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useFollowContext from "../../Hooks/useFollowContext";
import useUserContext from "../../Hooks/useUserContext";
import { Button } from "../util/Button";
import { CardComponent } from "../util/Card";

export function UsersListComponent() {
  const { user, allUser } = useUserContext();
  const { follow, unfollow } = useFollowContext();

  const [search, setSearch] = useState("");

  const router = useRouter();
  const filterList = allUser?.filter((profile) =>
    profile.username.includes(search)
  );

  return (
    <CardComponent>
      <div className={`flex flex-col space-y-4`}>
        <div className="flex space-x-2 justify-start items-center">
          <div className="bg-bg-gray rounded-md outline-none px-2 py-1 flex justify-start items-center w-[100%]">
            <FiSearch fontSize={15} className={`text-gray-400`} />
            <input
              placeholder=" Search your friends"
              type="text"
              className="bg-transparent  outline-none ml-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={`flex space-x-4`}>
          {filterList?.length === 0 ? (
            <p className="text-center w-[100%] text-gray-500 font-semibold h-[90px] flex justify-center items-center">
              Sorry we didnt find anyone
            </p>
          ) : (
            filterList?.map((profile) => {
              if (profile?.id === user?.id) {
                return;
              }
              const followerFilter =
                user?.following?.filter(
                  (follow) => follow?.followingId === profile?.id
                ).length > 0;
              return (
                <div
                  key={profile.id}
                  className={`flex flex-col space-y-1 justify-center items-center cursor-pointer`}
                >
                  <img
                    src={profile.image}
                    alt=""
                    className="h-14 w-14 rounded-full"
                    onClick={() => router.push(`/profile/${profile.id}`)}
                  />
                  <p onClick={() => router.push(`/profile/${profile.id}`)}>
                    {profile.username}
                  </p>
                  <Button
                    title={followerFilter ? `Unfollow` : `Follow`}
                    className={` bg-blue-900 text-white font-semibold py-1 px-2 rounded-md border-2 border-white`}
                    onClick={() => {
                      if (followerFilter) {
                        unfollow(profile?.id, user?.id);
                      } else {
                        follow(profile?.id, user?.id);
                      }
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </CardComponent>
  );
}
