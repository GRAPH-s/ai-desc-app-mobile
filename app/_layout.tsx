import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {Inter_600SemiBold, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {Oswald_600SemiBold} from "@expo-google-fonts/oswald";
import {Platform, SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import {router, Slot, Stack, useRootNavigationState} from "expo-router";
import UserContextProvider, {User, useUserContext} from "../src/context/UserContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {SplashScreen} from "expo-router";
import {LogBox} from 'react-native';
import {PortalHost, PortalProvider} from "@gorhom/portal";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();
export const queryClient = new QueryClient()


const Layout = () => {
    return (
        <PortalProvider>
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <SafeAreaView style={{flex: 1}}>
                            <Slot/>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                    <PortalHost name="bottom"/>
                </UserContextProvider>
            </QueryClientProvider>
        </PortalProvider>
    );
};

export default Layout;
