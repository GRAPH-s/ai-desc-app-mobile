import React, {useState} from 'react';
import {SafeAreaView, Text, View} from "react-native";
import {Theme} from "../../../share/theme";
import AppButton from "../../../components/AppButton";
import HeadingText from "../../../components/HeadingText";

const WelcomeScreen = () => {
    return (
        <>
            <View>
                <HeadingText>{"Добро\nпожаловать!"}</HeadingText>
            </View>
        </>

    );
};

export default WelcomeScreen;
