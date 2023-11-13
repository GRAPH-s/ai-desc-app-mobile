import React from 'react';
import {View, Text, Button} from "react-native";
import {useUserContext} from "../../src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRootNavigationState} from "expo-router";
import HeadingText from "../../src/components/HeadingText";
import {Theme} from "../../src/share/theme";
import BodyText from "../../src/components/BodyText";
import Arrow from "../../assets/Arrow";

const Page = () => {


    return (
        <View style={{backgroundColor: Theme.colors.background, flex: 1, justifyContent: "center", paddingHorizontal: 40}}>
            <View style={{gap: 10}}>
                <HeadingText>
                    {"Загрузи\nлюбое фото"}
                </HeadingText>
                <BodyText style={{textAlign: "center", fontSize: 18, marginBottom: 20}}>
                    Нажми на кнопку с «+» и выбери фото из галереи или сделай новое.
                </BodyText>
                <View style={{alignItems: "center"}}>
                    <Arrow/>
                </View>
            </View>
        </View>
    );
};

export default Page;
