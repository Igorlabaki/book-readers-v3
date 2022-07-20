import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import useUserContext from "../../Hooks/useUserContext";
import { ImBooks } from "react-icons/im";
import { BsFillChatSquareFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/Fa";
import { Button } from "../../Components/util/Button";
import { CardComponent } from "../../Components/util/Card";
import { Books, Follows, Posts } from "@prisma/client";
import { PostComponent } from "../../Components/Post";
import { ListTypeBook } from "../../Components/Profile/listTypeBook";
import useFollowContext from "../../Hooks/useFollowContext";
import { AiOutlineConsoleSql } from "react-icons/ai";

export default function Profile() {
  const {
    query: { id },
  } = useRouter();

  const { getProfile, profile, user, loadingProfile } = useUserContext();
  const { follow, unfollow } = useFollowContext();
  const [type, setType] = useState("books");

  const booksList = type.includes("books");
  const postsList = type.includes("posts");
  const friendList = type.includes("friends");

  const [followButton, setfollowButton] = useState("Follow");

  useEffect(() => {
    getProfile(id.toString());
  }, []);

  const router = useRouter();

  const followerFilter =
    user?.following.filter((follow) => follow?.followingId === profile?.id)
      .length > 0;

  return (
    <div className="w-[100%] bg-bg-gray h-full pb-[5rem]">
      <HeaderComponent />
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
        <div className="flex justify-center items-center space-x-3 absolute top-[16.5rem] left-[226px]">
          <Button
            title={profile?.Books?.length.toString()}
            icon={
              <ImBooks
                size={23}
                className={
                  booksList ? "text-blue-800 scale-125" : "text-gray-300"
                }
              />
            }
            className={`flex justify-center items-center space-x-[0.50rem]`}
            onClick={() => setType("books")}
            titleClassname={booksList ? "text-blue-800" : "text-gray-300"}
          />
          <Button
            title={profile?.Posts?.length}
            icon={
              <BsFillChatSquareFill
                size={20}
                className={`mt-1 text-md ${
                  postsList ? "text-blue-800 scale-125" : "text-gray-300"
                }`}
              />
            }
            className={`flex justify-center items-center space-x-[0.60rem]`}
            onClick={() => setType("posts")}
            titleClassname={`text-md
              ${postsList ? "text-blue-800" : "text-gray-300"}
            `}
          />
          <Button
            title={profile?.followedBy?.length}
            icon={
              <FaUserFriends
                size={24}
                className={
                  friendList ? "text-blue-800 scale-125" : "text-gray-300"
                }
              />
            }
            className={`flex justify-center items-center space-x-[0.55rem]`}
            titleClassname={`text-md
              ${friendList ? "text-blue-800" : "text-gray-300"}`}
            onClick={() => setType("friends")}
          />
        </div>
      </div>
      {booksList ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">BookShelve</p>
          {profile?.Books?.filter((book) => book.listType === "Read").length >
          0 ? (
            <ListTypeBook
              type="Read"
              list={profile?.Books?.filter((book) => book.listType === "Read")}
            />
          ) : null}
          {profile?.Books?.filter(
            (book) => book.listType === "Currently Reading"
          ).length > 0 ? (
            <ListTypeBook
              type="Currently Reading"
              list={profile?.Books?.filter(
                (book) => book.listType === "Currently Reading"
              )}
            />
          ) : null}
          {profile?.Books?.filter((book) => book.listType === "Want to Read")
            .length > 0 ? (
            <ListTypeBook
              type="Want to Read"
              list={profile?.Books?.filter(
                (book) => book.listType === "Want to Read"
              )}
            />
          ) : null}
        </>
      ) : postsList ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Feed</p>
          <div className="mt-5 space-y-3">
            {profile?.Posts?.map((post: Posts) => {
              return <PostComponent key={post?.id} post={post} />;
            })}
          </div>
        </>
      ) : friendList ? (
        <>
          <p className="w-[84%] m-auto mt-20 text-3xl font-bold">Followers</p>
          <CardComponent classname="mt-5 bg-white space-y-3">
            <div className="flex justify-start items-center space-x-3">
              {profile?.followedBy.length === 0 ? (
                <p className="w-[100%] text-center text-lg text-gray-400">
                  {profile?.username} doesnt have any followers{" "}
                </p>
              ) : (
                profile?.followedBy?.map((follow, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex flex-col justify-center items-center`}
                    >
                      {loadingProfile ? (
                        <div className="bg-gray-300 h-[3.5rem] w-[3.5rem] rounded-full top-44 left-10 animate-pulse" />
                      ) : (
                        <img
                          src={follow?.follower?.image}
                          className="h-[3.5rem] w-[3.5rem] rounded-full top-44 left-10 cursor-pointer"
                          onClick={() => {
                            router.push(`/profile/${follow?.follower?.id}`);
                          }}
                          alt={follow?.follower?.username}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardComponent>
        </>
      ) : null}
    </div>
  );
}
