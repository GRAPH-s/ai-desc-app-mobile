import React, {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from "react-native";
import {Theme} from "../share/theme";

const AppInput:FC<TextInputProps> = (props) => {
    return (
        <TextInput {...props} style={styles.input} placeholderTextColor={Theme.colors.disabled}/>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 54,
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        borderRadius: 60,
        paddingHorizontal: 20,
        fontFamily: "Inter_500Medium",
        fontSize: 16
    },
})

export default AppInput;
