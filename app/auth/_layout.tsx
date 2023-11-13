import React from 'react';
import {Slot, Stack} from "expo-router";
import {StyleSheet, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const Layout = () => {
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <Slot/>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
});

export default Layout;
