import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import HeadingText from "../../components/HeadingText";
import BodyText from "../../components/BodyText";
import AppButton from "../../components/AppButton";
import {router} from "expo-router";

const Guide = () => {
    const [step, setStep] = useState(0)

    const nextStep = useCallback(() => {
        setStep(prevState => prevState + 1)
    }, [])

    const render = () => {
        switch (step) {
            case 1:
                return (
                    <View>
                        <>
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <HeadingText>{"Добро\nпожаловать!"}</HeadingText>
                                <BodyText style={{textAlign: "center"}}>С Image Insight каждая фотография расскажет свою
                                    уникальную историю. Исследуйте мир вокруг вас через глаза нашего умного
                                    алгоритма.</BodyText>
                            </View>
                            <AppButton onPress={nextStep} title="Начать"/>
                        </>
                    </View>
                )
            default: {
                return (
                    <>
                        <AppButton onPress={()=>router.replace("/guide/1")} title="Перейти к гайду"/>
                    </>
                );
            }
        }
    }

    return (
        <View style={styles.container}>
            {render()}
        </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default Guide;
