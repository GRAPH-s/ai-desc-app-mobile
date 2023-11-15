import React from 'react';
import {View, Text, Button} from "react-native";
import {useUserContext} from "../../../src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, useRootNavigationState} from "expo-router";
import HeadingText from "../../../src/components/HeadingText";
import BodyText from "../../../src/components/BodyText";
import AppButton from "../../../src/components/AppButton";
import {Theme} from "../../../src/share/theme";
import {queryClient} from "../../_layout";

const Page = () => {
    const {user, setUser} = useUserContext()

    console.log(user)

    return (
        <View style={{flex: 1, backgroundColor: Theme.colors.background}}>
            <View>
                <HeadingText style={{marginTop: 200, marginBottom: 100}}>Профиль</HeadingText>
                <BodyText style={{textAlign: "center"}}>{user && user.email}</BodyText>
                <AppButton secondary title="Выти из аккаунта" onPress={async () => {
                    AsyncStorage.clear()
                    setUser(null)
                    router.replace("/")
                }}/>
            </View>
        </View>
    );
};

export default Page;
