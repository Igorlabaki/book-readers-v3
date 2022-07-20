import axios from "axios";
import { createContext, ReactNode, useState } from "react";
interface UserContextProvider {
  children: ReactNode;
}
interface UserContext {
  user?: any;
  profile?: any;
  getUser?: (id: string) => void;
  getProfile?: (id: string) => void;
  loadingProfile?: boolean;
}

const initialState: UserContext = {};

export const UserContext = createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProvider) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  async function getUser(userId: string) {
    const resp = await axios
      .get(`/api/user/${userId}`)
      .then((resp) => resp.data);

    setUser(() => resp);
  }

  async function getProfile(userId: string) {
    setLoadingProfile(true);
    const resp = await axios
      .get(`/api/user/${userId}`)
      .then((resp) => resp.data);

    setProfile(() => resp);
    setTimeout(() => setLoadingProfile(false), 2000);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loadingProfile,
        getUser,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
