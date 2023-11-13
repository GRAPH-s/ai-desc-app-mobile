import React, {ReactNode, useEffect, useState} from 'react';
import {createContext} from "react";
import {router} from "expo-router";
import authService from "../services/AuthService";
import {useQuery} from "react-query";

export interface User {
    id: number,
    email: string
}

interface UserContext {
    user: User | null
    isFetched: boolean,
    setUser: (user: User | null) => void;
    refetch: () => void;
}

const UserContext = createContext<UserContext>({
    user: null, isFetched: false, refetch: () => {
        return
    }, setUser: () => {
        return
    }
})

export const useUserContext = () => {
    const [user, setUser] = useState<User | null>(null)

    const {data, isFetched, refetch} = useQuery({
        queryKey: ["user"],
        queryFn: authService.getMe,
        select: (data) => data.data as User,
        onSuccess: (data) => {
            setUser(data)
        },
        retry: 1,
    })


    return {user, isFetched, refetch, setUser}
}

const UserContextProvider = ({children}: { children: ReactNode }) => {
    const data = useUserContext()
    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
