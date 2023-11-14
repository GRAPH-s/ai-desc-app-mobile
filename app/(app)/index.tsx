import {Link, Redirect, useRootNavigationState} from "expo-router";
import React, {useEffect, useMemo} from "react";
import {Text} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUserContext} from "../../src/context/UserContext";


export default function App() {
    const {user} = useUserContext()
    return <>
        {
            user ? <Redirect href="/main"/> : <Redirect href={"/guide"}/>
        }
    </>
}


