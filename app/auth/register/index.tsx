import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, ActivityIndicator} from "react-native";
import AppInput from "../../../src/components/AppInput";
import HeadingText from "../../../src/components/HeadingText";
import AppButton from "../../../src/components/AppButton";
import BodyText from "../../../src/components/BodyText";
import {Theme} from "../../../src/share/theme";
import Logo from "../../../assets/Logo";
import {router} from "expo-router";
import AuthService from "../../../src/services/AuthService";
import {useUserContext} from "../../../src/context/UserContext";
import {ScrollView} from "react-native-gesture-handler";

const Page = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")


    const passwordsMathText = useMemo<string>(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            return "Пароли не совпадают"
        }
        return ""
    }, [password, confirmPassword])

    const {isLoading, register, error, setError} = useUserContext()

    const active = useMemo<boolean>(() => Boolean( isLoading ? false : email && password && confirmPassword && password === confirmPassword), [email, password, confirmPassword, isLoading])



    const onPress = async () => {
        if (active) {
            await register({email, password})
        }
    }

    useEffect(()=>{
        setError(null)
        return () => {
            setError(null)
        }
    }, [email, password, confirmPassword])


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{justifyContent: "space-between", flex: 1}} onStartShouldSetResponder={() => true}>
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
                        { error && <BodyText style={{color: Theme.colors.danger, textAlign: "center", fontSize: 14}}>{error}</BodyText>}
                        {isLoading && <ActivityIndicator/>}
                    </View>
                    <AppButton onPress={onPress} disabled={!active} title="Создать аккаунт"/>
                    <AppButton onPress={() => router.replace("/auth/login")} secondary title="У меня уже есть аккаунт"/>
                </View>
                <BodyText style={{color: Theme.colors.disabled, fontSize: 14, textAlign: "center", padding: 30}}>
                    Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных
                </BodyText>
            </View>
        </ScrollView>
    );
};

export default Page;
