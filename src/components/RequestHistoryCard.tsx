import React, {FC, useState} from 'react';
import {Image, View, Text, SafeAreaView, ActivityIndicator} from "react-native";
import {RequestHistoryItem} from "../share/types";
import {Theme} from "../share/theme";
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {apiUrl} from "../services";

type Props = {
    requestHistory: RequestHistoryItem
}


const RequestHistoryCard: FC<Props> = ({requestHistory}) => {
    const url = apiUrl + new URL(requestHistory.image_thumbnail).pathname

    return (
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", gap: 10}}>
            <View style={{position: "relative", width: 80, height: 80, justifyContent: "center"}}>
                <ActivityIndicator/>
                <Image source={{uri: url}}
                       style={{width: '100%', aspectRatio: '1/1', position: 'absolute', opacity: 1}}/>
            </View>
            <View style={{borderRadius: 20, flex: 1, borderWidth: 1, borderColor: Theme.colors.primary, padding: 20}}>
                <Text>
                    {requestHistory.ai_description}
                </Text>
            </View>
        </View>
    );
};

export default RequestHistoryCard;
