import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Button, ActivityIndicator, RefreshControl} from "react-native";
import {User, useUserContext} from "../../../src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRootNavigationState} from "expo-router";
import HeadingText from "../../../src/components/HeadingText";
import {Theme} from "../../../src/share/theme";
import {ScrollView} from "react-native-gesture-handler";
import {useQuery} from "react-query";
import HistoryService from "../../../src/services/HistoryService";
import {RequestHistoryItem} from "../../../src/share/types";
import RequestHistoryCard from "../../../src/components/RequestHistoryCard";

const Page = () => {
    const {data, isLoading, refetch} = useQuery({
        queryKey: ["history"],
        queryFn: HistoryService.getAll,
        select: (data) => data.data as RequestHistoryItem[],
        cacheTime: 0,
        retryOnMount: true,
        refetchOnMount: "always",
    })

    const filteredData = useMemo(() => data?.filter(e => e.ai_description).sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)), [data])


    return (
        <View style={{flex: 1, backgroundColor: Theme.colors.background, paddingHorizontal: 20}}>
            <HeadingText>История генераций</HeadingText>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
                        style={{backgroundColor: Theme.colors.background}}>
                <View style={{gap: 20}} onStartShouldSetResponder={() => true}>
                    {filteredData?.map(e => <RequestHistoryCard key={e.id} requestHistory={e}/>)}
                </View>
            </ScrollView>
        </View>
    );
};

export default Page;
