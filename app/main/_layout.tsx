import React from 'react';
import {router, Stack} from "expo-router";
import {Button, Text} from "react-native"
import {Theme} from "../../src/share/theme";
import AppButton from "../../src/components/AppButton";

const RootLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="ai_request" options={{
                presentation: "modal",
                contentStyle: {backgroundColor: Theme.colors.background}
            }
            }/>
        </Stack>
    );
};

export default RootLayout;
