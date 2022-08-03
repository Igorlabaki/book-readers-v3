import axios from "axios";
import { createContext, ReactNode, useState } from "react";
interface UserContextProvider {
  children: ReactNode;
}
interface UserContext {
  user?: any;
  allUser?: any;
  profile?: any;
  getUser?: (id: string) => void;
  getAllUser?: () => void;
  getProfile?: (id: string) => void;
  getPagesRead?: (memberBooks) => any;
  getLastRead?: (memberBooks) => any;
  getLongestBook?: (memberBooks) => any;
  getShortestBook?: (memberBooks) => any;
  getAveragePages?: (memberBooks) => any;
  loadingProfile?: boolean;
}

const initialState: UserContext = {};

export const UserContext = createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProvider) {
  const [user, setUser] = useState<any>(null);
  const [allUser, setAllUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  async function getAllUser() {
    const response = await fetch(`/api/test`);
    const result = await response.json();
    setAllUser(() => result);
  }

  async function getUser(userId: string) {
    const response = await fetch(`/api/user/${userId}`);
    const result = await response.json();
    setUser(() => result);
  }

  async function getProfile(userId: string) {
    setLoadingProfile(true);
    const response = await fetch(`/api/user/${userId}`);
    const result = await response.json();
    setProfile(() => result);
    setLoadingProfile(false);
  }

  const getLongestBook = (memberBooks) => {
    function compare(a, b) {
      if (a.book.pageCount < b.book.pageCount) return 1;
      if (a.book.pageCount > b.book.pageCount) return -1;
      return 0;
    }

    return memberBooks?.sort(compare)[0];
  };

  const getShortestBook = (memberBooks) => {
    function compare(a, b) {
      if (a.book.pageCount < b.book.pageCount) return -1;
      if (a.book.pageCount > b.book.pageCount) return 1;
      return 0;
    }
    return memberBooks?.sort(compare)[0];
  };

  const getAveragePages = (memberBooks) => {
    let list = [];
    memberBooks?.map((item) => list.push(item.book.pageCount));
    var soma = 0;
    for (var i = 0; i < list.length; i++) {
      soma += list[i];
    }
    const average = Math.ceil(soma / list.length);

    return average;
  };

  const getLastRead = (memberBooks) => {
    function compare(a, b) {
      if (a.book.created_at < b.book.created_at) return 1;
      if (a.book.created_at > b.book.created_at) return -1;
      return 0;
    }

    return memberBooks?.sort(compare)[0];
  };

  function getPagesRead(memberBooks) {
    let counter = 0;
    memberBooks?.map((item) => {
      counter = item.book.pageCount.valueOf() + counter;
    });
    return counter;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loadingProfile,
        allUser,
        getUser,
        getAllUser,
        getProfile,
        getLongestBook,
        getShortestBook,
        getAveragePages,
        getLastRead,
        getPagesRead,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
