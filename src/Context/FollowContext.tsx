import { Books, UserBooks } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import usePostsContext from "../Hooks/usePostsContext";
import useUserContext from "../Hooks/useUserContext";

interface FollowContextProvider {
  children: ReactNode;
}

interface FollowContext {
  follow?: (followingId: String, followerId: String) => void;
  unfollow?: (followingId: String, followerId: String) => void;
}

const initialState: FollowContext = {};

export const FollowContext = createContext<FollowContext>(initialState);

export function FollowContextProvider({ children }: FollowContextProvider) {
  const { getProfile, getUser } = useUserContext();
  const { createPost } = usePostsContext();
  const { getPosts } = usePostsContext();

  async function follow(followingId: String, followerId: String) {
    const followData = {
      followingId: followingId,
      followerId: followerId,
    };
    const infoNotification = {
      user_id: followingId,
      user_action: followerId,
      text: "is now following you",
    };
    const infoPost = {
      user_id: followerId,
      userProfile_id: followingId,
      action: "is now following",
    };
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify(followData),
      });
      const responseNotification = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(infoNotification),
      });
      const result = await response.json();
      createPost(infoPost);
      getProfile(result.followingId);
      getUser(result.followerId);
      getPosts(result.followerId);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow(followerId: String, followingId: String) {
    const followData = {
      followerId: followerId,
      followingId: followingId,
    };
    try {
      const response = await fetch("/api/follow", {
        method: "DELETE",
        body: JSON.stringify(followData),
      });
      const result = await response.json();
      getProfile(result.followingId);
      getUser(result.followerId);
      getPosts(result.followerId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FollowContext.Provider value={{ follow, unfollow }}>
      {children}
    </FollowContext.Provider>
  );
}
