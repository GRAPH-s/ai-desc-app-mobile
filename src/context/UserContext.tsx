import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {createContext} from "react";
import {router} from "expo-router";
import authService from "../services/AuthService";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../../app/_layout";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";

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
    return useContext(UserContext)
}

const UserContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isFetched, setIsFetched] = useState<boolean>(false)

    const getUser = async () => {
        setIsFetched(false)
        try {
            const response = await authService.getMe()
            setUser(response.data)
        } catch (e) {
            setUser(null)
        } finally {
            setIsFetched(true)
        }
    }

    useEffect(()=>{
        if(!user && !isFetched){
            getUser()
        }
    }, [])


    return (
        <UserContext.Provider value={{isFetched, user, setUser, refetch: getUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
