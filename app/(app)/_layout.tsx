import React, {useEffect, useState} from 'react';
import UserContextProvider, {useUserContext} from "../../src/context/UserContext";
import {Redirect, router, Slot, SplashScreen, Stack} from "expo-router";
import {Inter_500Medium, Inter_600SemiBold, useFonts} from "@expo-google-fonts/inter";
import {Oswald_600SemiBold} from "@expo-google-fonts/oswald";
import {SafeAreaView, View, Text} from "react-native";

const AppLayout = () => {

    const [appIsReady, setAppIsReady] = useState(false);
    let [fontsLoaded] = useFonts({
        Oswald_600SemiBold,
        Inter_600SemiBold,
        Inter_500Medium
    });

    const {isFetched, user} = useUserContext()

    useEffect(()=>{
        console.log(user, isFetched)
    }, [user, isFetched])

    useEffect(() => {
        if (isFetched && fontsLoaded) {
            setAppIsReady(true)
        }
    }, [isFetched, fontsLoaded])


    useEffect(() => {
        const hideSplash = async () => {
            if (appIsReady) {
                await SplashScreen.hideAsync();
            }
        }
        hideSplash()
    }, [appIsReady])


    if (!appIsReady) {
        return null;
    }


    return (
            <Slot/>
    )
};

export default AppLayout;
