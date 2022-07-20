import { Books, UserBooks } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import usePostsContext from "../Hooks/usePostsContext";

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
  async function follow(followingId: String, followerId: String) {
    const followData = {
      followingId: followingId,
      followerId: followerId,
    };

    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify(followData),
      });
      const result = await response.json();
      console.log(result);
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
      console.log(result);
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
