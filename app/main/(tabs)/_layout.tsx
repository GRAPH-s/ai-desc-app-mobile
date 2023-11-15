import React from 'react';
import {View} from "react-native";
import {Tabs} from "expo-router";
import {Theme} from "../../../src/share/theme";
import AntDesign from '@expo/vector-icons/AntDesign';

const Layout = () => {
    return (
        <View style={{flex: 1, marginBottom: -35}}>
            <Tabs initialRouteName="home" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: Theme.colors.primary}}>
                <Tabs.Screen name="history"
                             options={{tabBarIcon: ({color}) => <AntDesign name="profile" color={color} size={24}/>}}/>
                <Tabs.Screen name="home"
                             options={{tabBarIcon: ({color}) => <AntDesign name="home" color={color} size={24}/>}}/>
                <Tabs.Screen name="profile"
                             options={{tabBarIcon: ({color}) => <AntDesign name="user" color={color} size={24}/>}}/>
            </Tabs>
        </View>
    );
};


export default Layout;
