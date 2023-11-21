import React, {useEffect, useMemo, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {Image, StyleSheet, View} from "react-native";
import AppInput from "../../../src/components/AppInput";
import AppButton from "../../../src/components/AppButton";
import historyService from "../../../src/services/HistoryService";
import BodyText from "../../../src/components/BodyText";
import HeadingText from "../../../src/components/HeadingText";
import {ScrollView} from "react-native-gesture-handler";
import * as Clipboard from 'expo-clipboard';
import {Theme} from "../../../src/share/theme";
import {isAxiosError} from "axios/index";


const Loading = () => {

    const [progress, setProgress] = useState<number>(15)

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 0.5)
            }
        }, 50)
        return () => {
            clearInterval(interval)
        }
    }, [progress])


    const step = useMemo(() => progress < 33 ? 1 : progress < 66 ? 2 : 3, [progress])

    return <View style={{flex: 1, gap: 20}}>
        <HeadingText>Загрузка</HeadingText>
        <View style={{
            width: '100%',
            height: 20,
            borderRadius: 10,
            borderColor: Theme.colors.primary,
            borderWidth: 1,
            position: "relative"
        }}>
            <View style={{
                width: `${progress}%`,
                height: 18,
                borderRadius: 10,
                backgroundColor: Theme.colors.secondary,
                position: "absolute"
            }}/>
        </View>
        <BodyText style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: Theme.colors.primary
        }}>Шаг {step}/3</BodyText>
    </View>
}

const Result = ({result}: { result: string }) => {

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(result)
    };

    return <View style={{flex: 1, gap: 20}}>
        <HeadingText>Результат</HeadingText>
        <BodyText>{result}</BodyText>
        <AppButton onPress={copyToClipboard} style={styles.button} title="Скопировать"/>
        <AppButton onPress={() => {
            router.replace("/main")
        }} secondary title="Сгенерировать ещё"/>
    </View>
}


const Page = () => {
    const {image} = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [state, setState] = useState<"start" | "loading" | "result" | "error">("start")

    const send = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await historyService.post(String(image))
            const result = await response.data.ai_description
            setResult(String(result))
            setIsLoading(false)
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                const status = JSON.stringify(e.response.status)
                const data = JSON.stringify(e.response.data)
                setError("Ошибка " + status + `\n${data}`)
            } else {
                setError("Ошибка")
            }
        } finally {
            setIsLoading(false)

        }
    }

    useEffect(() => {
        if (error) {
            setState("error")
            return;
        }
        if (isLoading) {
            setState("loading")
            return;
        }
        if (result) {
            setState("result")
            return;
        }
    }, [isLoading, result, error])

    const onPress = async () => {
        await send()
    }


    const render = (state: "start" | "loading" | "result" | "error") => {
        switch (state) {
            case "result":
                return <>
                    {result && <Result result={result}/>}
                </>
            case "loading":
                return <>
                    <Loading/>
                </>
            case "error":
                return <>
                    <View style={{flex: 1, gap: 20}}>
                        <BodyText
                            style={{
                                color: Theme.colors.danger,
                                textAlign: "center",
                                fontSize: 14
                            }}>{error || "Ошибка"}</BodyText>
                        <AppButton onPress={() => setState("start")} title="Повторить"/>
                        <AppButton onPress={() => {
                            router.replace("/main")
                        }} secondary title="Отменить"/>
                    </View>
                </>
            default:
                return <>
                    <AppInput placeholder="Введите своё описание, если хотите, чтобы его наш AI его дополнил"
                              multiline={true} numberOfLines={4} style={styles.input}/>
                    <AppButton onPress={onPress} style={styles.button} title="Отправить"/>
                </>
        }
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container} onStartShouldSetResponder={() => true}>
                <View style={{alignItems: "center"}}>
                    <Image source={{uri: String(image)}} style={[styles.photo, state === "result" && {width: '80%'}]}/>
                </View>
                {render(state)}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    photo: {
        width: '100%', aspectRatio: '1/1', borderRadius: 8
    },
    input: {
        width: '100%',
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        height: 200
    },
    button: {
        width: '100%',
    }
})

export default Page;
