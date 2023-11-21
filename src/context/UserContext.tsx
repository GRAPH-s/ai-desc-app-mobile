import React, {ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {createContext} from "react";
import {router} from "expo-router";
import authService from "../services/AuthService";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../../app/_layout";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {AxiosError, isAxiosError} from "axios";

export interface User {
    id: number,
    email: string
}

interface UserContext {
    user: User | null
    isFetched: boolean,
    setUser: (user: User | null) => void;
    isLoading: boolean,
    register: (data: { email: string, password: string }) => void;
    login: (data: { email: string, password: string }) => void;
    refetch: () => void;
    error: string | null
    setError: (value: string | null) => void ;
}

const UserContext = createContext<UserContext>({
    user: null, isFetched: false, refetch: () => {
        return
    }, setUser: () => {
        return
    },
    isLoading: false,
    login: (data: { email: string, password: string }) => {
        return
    },
    register: (data: { email: string, password: string }) => {
        return
    },
    error: null,
    setError: (value) => {return},
})

export const useUserContext = () => {
    return useContext(UserContext)
}

const UserContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isFetched, setIsFetched] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getUser = async () => {
        setIsFetched(false)
        setIsLoading(true)
        try {
            const response = await authService.getMe()
            setUser(response.data)
        } catch (e) {
            setUser(null)
        } finally {
            setIsLoading(false)
            setIsFetched(true)
        }
    }

    const login = useCallback(async (data: { email: string, password: string }) => {
        setIsFetched(false)
        setIsLoading(true)
        setError(null)
        try {
            const response = await authService.login(data)
            setUser(response.data)
            router.replace("/main")
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                const status = JSON.stringify(e.response.status)
                const data = JSON.stringify(e.response.data)
                setError("Ошибка " + status + `\n${data}`)
            } else {
                console.log(JSON.stringify(e))
                setError("Ошибка")
            }
            setUser(null)
        } finally {
            setIsLoading(false)
            setIsFetched(true)
        }
    }, [])

    const register = useCallback(async (data: { email: string, password: string }) => {
        setIsFetched(false)
        setIsLoading(true)
        setError(null)
        try {
            const response = await authService.register(data)
            setUser(response.data)
            router.replace("/main")
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                const status = JSON.stringify(e.response.status)
                const data = JSON.stringify(e.response.data)
                setError("Ошибка " + status + `\n${data}`)
            } else {
                console.log(JSON.stringify(e))
                setError("Ошибка")
            }
            setUser(null)
        } finally {
            setIsLoading(false)
            setIsFetched(true)
        }
    }, [])

    useEffect(() => {
        if (!user && !isFetched) {
            getUser()
        }
    }, [])


    return (
        <UserContext.Provider value={{isFetched, user, setUser, refetch: getUser, isLoading, register, login, error, setError}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
