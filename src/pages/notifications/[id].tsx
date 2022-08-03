import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HeaderComponent from "../../Components/Header";
import useUserContext from "../../Hooks/useUserContext";
import { ImBooks } from "react-icons/im";
import { BsBookshelf, BsFillChatSquareFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/Fa";
import { Button } from "../../Components/util/Button";
import { CardComponent } from "../../Components/util/Card";
import { Books, Follows, Posts } from "@prisma/client";
import { PostComponent } from "../../Components/Post";
import { ListTypeBook } from "../../Components/Profile/listTypeBook";
import useFollowContext from "../../Hooks/useFollowContext";
import { BooksCoverComponent } from "../../Components/util/booksCover";
import { AiTwotoneTrophy } from "react-icons/ai";
import { NoRegisterComponent } from "../../Components/util/noRegister";
import usePostsContext from "../../Hooks/usePostsContext";
import { LoadingComponent } from "../../Components/Notificaiton/loading";

export default function Profile() {
  const {
    query: { id },
  } = useRouter();

  const { getPost, post, isLoading } = usePostsContext();
  const router = useRouter();

  useEffect(() => {
    getPost(id?.toString());
  }, []);

  console.log(post);

  return (
    <div className="w-[100%] bg-bg-gray min-h-screen pb-[5rem]">
      <HeaderComponent />
      <p className="w-[80%] m-auto text-3xl font-bold pt-20">Notification</p>
      {isLoading ? (
        <div className=" pt-5">
          <LoadingComponent />
        </div>
      ) : (
        <div>
          <div className="mt-5">
            <PostComponent post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
