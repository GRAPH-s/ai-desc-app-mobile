import {Link, Redirect, useRootNavigationState} from "expo-router";
import UserContextProvider, {useUserContext} from "../../src/context/UserContext";
import React, {useMemo} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
    const {user} = useUserContext()

    return <>
        {
            user ? <Redirect href="/main"/> : <Redirect href={"/guide"}/>
        }
    </>
}


