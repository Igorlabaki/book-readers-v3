import axios from "axios";
import { createContext, ReactNode, useState } from "react";
interface UserContextProvider {
  children: ReactNode;
}
interface UserContext {
  user?: any;
  getUser?: (id: string) => void;
}

const initialState: UserContext = {};

export const UserContext = createContext<UserContext>(initialState);

export function UserContextProvider({ children }: UserContextProvider) {
  const [user, setUser] = useState<any>(null);

  async function getUser(userId: string) {
    const resp = await axios
      .get(`/api/user/${userId}`)
      .then((resp) => resp.data);

    setUser(() => resp);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
