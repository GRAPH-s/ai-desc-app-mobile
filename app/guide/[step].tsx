import React from 'react';
import {View, Text} from "react-native";
import HeadingText from "../../src/components/HeadingText";
import BodyText from "../../src/components/BodyText";
import AppButton from "../../src/components/AppButton";
import {router, useLocalSearchParams} from "expo-router";
import {Theme} from "../../src/share/theme";

const Page = () => {
    const {step} = useLocalSearchParams();

    const render = () => {
        switch (Number(step)) {
            case 1:
                return (
                    <>
                        <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                            <HeadingText>{"Загрузи\nлюбое фото"}</HeadingText>
                            <BodyText style={{textAlign: "center"}}>Выбери фото из галереи или сделай новое.</BodyText>
                        </View>
                        <AppButton onPress={() => router.replace(`/guide/${Number(step) + 1}`)} title="Далее"/>
                        <AppButton title="Пропустить" onPress={() => router.replace("/auth/register")} secondary/>
                    </>
                )

            case 2:
                return (
                    <>
                        <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                            <HeadingText>{"Отправь фото\nнашему AI"}</HeadingText>
                            <BodyText style={{textAlign: "center"}}>Image Insight автоматически определит и опишет
                                объекты
                                на фотографии.</BodyText>
                        </View>
                        <AppButton onPress={() => router.replace(`/guide/${Number(step) + 1}`)} title="Далее"/>
                        <AppButton title="Пропустить" onPress={() => router.replace("/auth/register")} secondary/>
                    </>
                )

            case 3:
                return (
                    <>
                        <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                            <HeadingText>{"Поделись фото\nс готовым\nописанием"}</HeadingText>
                            <BodyText style={{textAlign: "center"}}>Делитесь удивительными моментами и их описаниями с
                                друзьями и миром!</BodyText>
                        </View>
                        <AppButton onPress={() => router.replace(`/guide/${Number(step) + 1}`)} title="Далее"/>
                        <AppButton title="Пропустить" onPress={() => router.replace("/auth/register")} secondary/>
                    </>
                )

            case 4:
                return (
                    <>
                        <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                            <HeadingText>{"Загрузи\nлюбое фото"}</HeadingText>
                            <BodyText style={{textAlign: "center"}}>Выбери фото из галереи или сделай новое.</BodyText>
                        </View>
                        <AppButton onPress={() => router.replace("/auth/register")} title="Далее"/>
                        <AppButton title="Пропустить " onPress={() => router.replace("/auth/register")} secondary/>
                    </>
                )

            default:
                return (
                    <>
                        <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                            <HeadingText>{"Добро\nпожаловать!"}</HeadingText>
                            <BodyText style={{textAlign: "center"}}>С Image Insight каждая фотография расскажет свою
                                уникальную историю. Исследуйте мир вокруг вас через глаза нашего умного
                                алгоритма.</BodyText>
                        </View>
                        <AppButton onPress={() => router.replace('/guide/1')} title="Начать"/>
                    </>
                )
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: Theme.colors.background, padding: 20}}>
            {render()}
        </View>
    )
};

export default Page;
