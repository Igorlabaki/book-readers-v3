import React from "react";
import useFollowContext from "../../Hooks/useFollowContext";
import useUserContext from "../../Hooks/useUserContext";

export default function ProfileHeaderComponent() {
  const { profile, user, loadingProfile } = useUserContext();
  const { follow, unfollow } = useFollowContext();

  const followerFilter =
    user?.following?.filter((follow) => follow?.followingId === profile?.id)
      .length > 0;

  return (
    <div className="bg-blue-900 h-[250px]">
      <div
        className="absolute bg-white h-32 w-32 rounded-full top-44 left-[4.0rem] flex justify-center
        items-center"
      >
        {loadingProfile ? (
          <div className="bg-gray-300 h-[7.5rem] w-[7.5rem] rounded-full top-44 left-10 animate-pulse" />
        ) : (
          <img
            src={profile?.image}
            alt=""
            className="h-[7.5rem] w-[7.5rem] rounded-full top-44 left-10"
          />
        )}
      </div>
      <div className="absolute top-[12.5rem] left-[220px] flex justify-between w-[60%]">
        <p className=" text-white font-semibold  text-2xl ">
          {profile?.username}
        </p>
        {user?.id != profile?.id ? (
          <button
            className={`text-white font-semibold py-1 px-2 rounded-md border-2 border-white`}
            onClick={() => {
              if (followerFilter) {
                unfollow(profile?.id, user?.id);
              } else {
                follow(profile?.id, user?.id);
              }
            }}
          >
            {followerFilter ? `Unfollow` : `Follow`}
          </button>
        ) : null}
      </div>
    </div>
  );
}
