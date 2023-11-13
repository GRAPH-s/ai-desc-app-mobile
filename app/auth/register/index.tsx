import React, {useMemo, useState} from 'react';
import {View} from "react-native";
import AppInput from "../../../src/components/AppInput";
import HeadingText from "../../../src/components/HeadingText";
import AppButton from "../../../src/components/AppButton";
import BodyText from "../../../src/components/BodyText";
import {Theme} from "../../../src/share/theme";
import Logo from "../../../assets/Logo";
import {router} from "expo-router";
import AuthService from "../../../src/services/AuthService";
import {useUserContext} from "../../../src/context/UserContext";

const Page = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const active = useMemo<boolean>(() => Boolean(email && password && confirmPassword && password === confirmPassword), [email, password, confirmPassword])

    const passwordsMathText = useMemo<string>(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            return "Пароли не совпадают"
        }
        return ""
    }, [password, confirmPassword])

    const {refetch} = useUserContext()


    const onPress = async () => {
        if (active) {
            await AuthService.register({email, password})
            await refetch()
            await router.replace("/main")
        }
    }


    return (
        <View style={{justifyContent: "space-between", flex: 1}}>
            <View style={{alignItems: "center", marginTop: 20, marginBottom: 20}}>
                <Logo/>
            </View>
            <View>
                <HeadingText style={{marginBottom: 40}}>Регистрация</HeadingText>
                <View style={{gap: 20, marginBottom: 40}}>
                    <AppInput autoCorrect={false} autoCapitalize="none" autoComplete="email" onChangeText={setEmail}
                              placeholder="Email"/>
                    <AppInput autoCorrect={false} secureTextEntry={true} autoCapitalize="none"
                              onChangeText={setPassword} placeholder="Пароль"/>
                    <AppInput autoCorrect={false} secureTextEntry={true} autoCapitalize="none"
                              onChangeText={setConfirmPassword} placeholder="Подтверждение пароля"/>
                    <BodyText style={{
                        fontSize: 14,
                        textAlign: "left",
                        color: Theme.colors.danger,
                        marginLeft: 20
                    }}>{passwordsMathText}</BodyText>
                </View>
                <AppButton onPress={onPress} disabled={!active} title="Создать аккаунт"/>
                <AppButton onPress={() => router.replace("/auth/login")} secondary title="У меня уже есть аккаунт"/>
            </View>
            <BodyText style={{color: Theme.colors.disabled, fontSize: 14, textAlign: "center", padding: 30}}>
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных
            </BodyText>
        </View>
    );
};

export default Page;
