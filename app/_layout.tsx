import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {Inter_600SemiBold, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {Oswald_600SemiBold} from "@expo-google-fonts/oswald";
import {Platform, SafeAreaView, Text, View} from "react-native";
import {router, Slot, Stack, useRootNavigationState} from "expo-router";
import UserContextProvider, {User, useUserContext} from "../src/context/UserContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {SplashScreen} from "expo-router";

SplashScreen.preventAutoHideAsync();
export const queryClient = new QueryClient()


const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <SafeAreaView style={{flex: 1}}>
                    <Slot/>
                </SafeAreaView>
            </UserContextProvider>
        </QueryClientProvider>
    );
};

export default Layout;
