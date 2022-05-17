import {createContext,ReactNode,useState} from 'react'

interface UserContextProvider {
    children: ReactNode
}

interface UserContext{

}

const initialState: UserContext = {

}

export const UserContext = createContext<UserContext>(initialState)

export function userContextProvider( {children}: UserContextProvider){


    return(
        <UserContext.Provider value={{
            
        }}>
            {children}
        </UserContext.Provider>
    )
}