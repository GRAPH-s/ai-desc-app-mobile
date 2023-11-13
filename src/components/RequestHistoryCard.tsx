import React, {FC} from 'react';
import {Image, View, Text, SafeAreaView} from "react-native";
import {RequestHistoryItem} from "../share/types";
import {Theme} from "../share/theme";

type Props = {
    requestHistory: RequestHistoryItem
}

const RequestHistoryCard:FC<Props> = ({requestHistory}) => {
    return (
        <View style={{flex:1, flexDirection: "row", alignItems: "center", gap: 10}}>
            <Image source={{uri:requestHistory.image_thumbnail}} style={{width: 80,  height: 80}}/>
            <View style={{borderRadius: 20, flex: 1, borderWidth: 1, borderColor: Theme.colors.primary, padding: 20}}>
                <Text>
                    {requestHistory.ai_description}
                </Text>
            </View>
        </View>
    );
};

export default RequestHistoryCard;
