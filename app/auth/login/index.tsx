import React, {useMemo, useState} from 'react';
import AppInput from "../../../src/components/AppInput";
import HeadingText from "../../../src/components/HeadingText";
import AppButton from "../../../src/components/AppButton";
import BodyText from "../../../src/components/BodyText";
import {Theme} from "../../../src/share/theme";
import Logo from "../../../assets/Logo";
import {View} from "react-native";
import {router} from "expo-router";
import {useUserContext} from "../../../src/context/UserContext";
import authService from "../../../src/services/AuthService";
import {queryClient} from "../../_layout";

const Page = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const active = useMemo<boolean>(() => Boolean(email && password), [email, password])
    const {refetch} = useUserContext()

    const onPress = async () => {
        await authService.login({email, password})
        await refetch()
        router.replace("/main")
    }

    return (
        <View style={{justifyContent: "space-between", flex: 1}}>
            <View style={{alignItems: "center", marginTop: 20, marginBottom: 20}}>
                <Logo/>
            </View>
            <View>
                <HeadingText style={{marginBottom: 40}}>Авторизация</HeadingText>
                <View style={{gap: 20, marginBottom: 40}}>
                    <AppInput autoCorrect={false} autoCapitalize="none" autoComplete="email" onChangeText={setEmail}
                              placeholder="Email"/>
                    <AppInput autoCorrect={false} secureTextEntry={true} autoCapitalize="none"
                              onChangeText={setPassword} placeholder="Пароль"/>
                </View>
                <AppButton onPress={onPress} disabled={!active} title="Войти"/>
                <AppButton onPress={()=>router.replace("/auth/register")} secondary title="Зарегистрироваться"/>
            </View>
            <BodyText style={{color: Theme.colors.disabled, fontSize: 14, textAlign: "center", padding: 30}}>
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных
            </BodyText>
        </View>
    );
};

export default Page;
