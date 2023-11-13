import React from 'react';
import { Slot, Stack } from 'expo-router';
import {View, Text, StyleSheet, SafeAreaView} from "react-native";

const Layout = () => {
    return (
        <View style={styles.container}>
            <Stack screenOptions={{
                headerShown: false
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;
