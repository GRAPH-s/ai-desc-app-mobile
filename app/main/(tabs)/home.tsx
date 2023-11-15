import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet, PermissionsAndroid} from "react-native";
import {useUserContext} from "../../../src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, useRootNavigationState, useRouter} from "expo-router";
import HeadingText from "../../../src/components/HeadingText";
import {Theme} from "../../../src/share/theme";
import BodyText from "../../../src/components/BodyText";
import Arrow from "../../../assets/Arrow";
import AppButton from "../../../src/components/AppButton";
import BottomSheet, {BottomSheetBackdrop, BottomSheetBackdropProps} from "@gorhom/bottom-sheet";
import {Portal} from "@gorhom/portal";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from "expo-camera";
import {UIImagePickerPresentationStyle} from "expo-image-picker";

const Page = () => {
    const router = useRouter()
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['20%'], []);


    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        bottomSheetRef?.current?.snapToIndex(index)
    }, []);


    const pickImage = async () => {
        bottomSheetRef?.current?.close()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            presentationStyle: "overFullScreen" as UIImagePickerPresentationStyle,
            selectionLimit: 1,
            quality: 0.2,
        });

        if (!result.canceled) {
            router.push({pathname: "/main/ai_request/send_request", params: {image: result.assets[0].uri}})
        }
    };

    const takePicture = async () => {
        bottomSheetRef?.current?.close()

        await ImagePicker.getCameraPermissionsAsync().then(async ()=>{
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                presentationStyle: "overFullScreen" as UIImagePickerPresentationStyle,
                selectionLimit: 1,
                quality: 0.2,
            })
            if (!result.canceled) {
                router.push({pathname: "/main/ai_request/send_request", params: {image: result.assets[0].uri}})
            }
        })
    }

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.15}
                pressBehavior="close"

            />
        ),
        []
    );


    return (
        <View style={{
            backgroundColor: Theme.colors.background,
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 40
        }}>
            <View style={{gap: 10}}>
                <HeadingText>
                    {"Загрузи\nлюбое фото"}
                </HeadingText>
                <BodyText style={{textAlign: "center", fontSize: 18, marginBottom: 20}}>
                    Нажми на кнопку с «+» и выбери фото из галереи или сделай новое.
                </BodyText>
                <View style={{alignItems: "center", gap: 50}}>
                    <Arrow/>
                    <AppButton onPress={() => handleSheetChanges(0)} style={{width: 50, height: 50}} title={"+"}/>
                </View>
                <Portal name="bottom">
                    <BottomSheet
                        backdropComponent={renderBackdrop}
                        handleStyle={{backgroundColor: Theme.colors.primary}}
                        ref={bottomSheetRef}
                        index={-1}
                        enablePanDownToClose={true}
                        snapPoints={snapPoints}
                        handleIndicatorStyle={{backgroundColor: Theme.colors.background}}
                        onClose={() => () => handleSheetChanges(-1)}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                            <AppButton onPress={takePicture} title="Сделать фото"/>
                            <AppButton onPress={pickImage} title="Выбрать из галереи"/>
                        </View>
                    </BottomSheet>
                </Portal>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Theme.colors.primary
    },
});

export default Page;
