import React from 'react';
import {Slot} from "expo-router";
import {View} from "react-native";

const Layout = () => {
    return (
        <View style={{flex: 1}}>
            <Slot/>
        </View>
    );
};

export default Layout;
