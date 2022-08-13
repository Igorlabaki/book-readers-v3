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
  const { createPost, post } = usePostsContext();
  const { getPosts } = usePostsContext();

  async function follow(followingId: String, followerId: String) {
    const followData = {
      followingId: followingId,
      followerId: followerId,
    };

    const infoPost = {
      user_id: followerId,
      userProfile_id: followingId,
      action: "is now following",
    };
    const post = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(infoPost),
    });
    const resultPost = await post.json();

    const infoNotification = {
      user_id: followingId,
      post_id: resultPost.id,
      user_action: followerId,
      text: "is now following you",
    };

    try {
      const responseFollow = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify(followData),
      });
      const resultFollow = await responseFollow.json();

      const responseNotification = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(infoNotification),
      });

      getProfile(resultFollow.followingId);
      getUser(resultFollow.followerId);
      getPosts(resultFollow.followerId);
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
