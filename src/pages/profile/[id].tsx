import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import useUserContext from "../../Hooks/useUserContext";
import { BsBookshelf, BsFillChatSquareFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/Fa";
import { Button } from "../../Components/util/Button";
import ProfileHeaderComponent from "../../Components/Profile/profileHeader";
import { BioComponentProps } from "../../Components/Profile/bioComponent";
import { BookShelveComponentProps } from "../../Components/Profile/bookshelveComponent";
import { UserComponentProps } from "../../Components/Profile/userPostComponent";

import dynamic from "next/dynamic";
import { FollowerComponentProps } from "../../Components/Profile/followerComponent";

export default function Profile() {
  const {
    query: { id },
  } = useRouter();

  const { getProfile, profile } = useUserContext();
  const [type, setType] = useState("stats");

  const stats = type.includes("stats");
  const booksList = type.includes("books");
  const postsList = type.includes("posts");
  const friendList = type.includes("friends");

  const BioComponent = dynamic<BioComponentProps>(() => {
    return import("../../Components/Profile/bioComponent").then(
      (comp) => comp.BioComponent
    );
  });

  const BookShelveComponent = dynamic<BookShelveComponentProps>(() => {
    return import("../../Components/Profile/bookshelveComponent").then(
      (comp) => comp.BookShelveComponent
    );
  });

  const UserPostComponent = dynamic<UserComponentProps>(() => {
    return import("../../Components/Profile/userPostComponent").then(
      (comp) => comp.UserPostComponent
    );
  });

  const FollowerComponent = dynamic<FollowerComponentProps>(() => {
    return import("../../Components/Profile/followerComponent").then(
      (comp) => comp.FollowerComponent
    );
  });

  useEffect(() => {
    getProfile(id?.toString());
  }, []);

  const booksProfileRead = profile?.Books?.filter(
    (book) => book.listType === "Read"
  );

  return (
    <div className="w-[100%] bg-bg-gray min-h-screen pb-[5rem]">
      <HeaderComponent />
      <div className="bg-blue-900 h-[250px]">
        <ProfileHeaderComponent />
        <div className="flex justify-center items-center space-x-3 absolute top-[16.5rem] left-[226px]">
          <Button
            icon={
              <CgProfile
                size={23}
                className={stats ? "text-blue-800 scale-125" : "text-gray-300"}
              />
            }
            className={`flex justify-center items-center space-x-[0.50rem]`}
            onClick={() => setType("stats")}
            titleClassname={stats ? "text-blue-800" : "text-gray-300"}
          />
          <Button
            title={profile?.Books?.length.toString()}
            icon={
              <BsBookshelf
                size={20}
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
      {stats ? (
        <BioComponent booksProfileRead={booksProfileRead} />
      ) : booksList ? (
        <BookShelveComponent booksProfileRead={booksProfileRead} />
      ) : postsList ? (
        <UserPostComponent />
      ) : friendList ? (
        <FollowerComponent />
      ) : null}
    </div>
  );
}
