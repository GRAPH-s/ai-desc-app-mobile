import React from 'react';
import {SafeAreaView, View} from "react-native";
import {Slot, Tabs} from "expo-router";

const Layout = () => {
    return (
        <SafeAreaView style={{flex: 1, marginBottom: -30}}>
            <Tabs initialRouteName="home" screenOptions={{headerShown: false}}>
                <Tabs.Screen name="history"/>
                <Tabs.Screen name="home"/>
                <Tabs.Screen name="profile"/>
            </Tabs>
        </SafeAreaView>

    );
};

export default Layout;
