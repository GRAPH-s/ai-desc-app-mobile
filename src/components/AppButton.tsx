import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Theme} from "../share/theme";

interface Props extends TouchableOpacityProps {
    title: string;
    secondary?: boolean
}

const AppButton: FC<Props> = (props) => {
    let {
        secondary = false
    } = props
    return (
        <TouchableOpacity {...props}
                          style={[styles.container, props.disabled && styles.disabled, secondary && styles.secondary, props.style]}>
            <Text
                style={[secondary ? Theme.textVariants.secondaryButton : Theme.textVariants.primaryButton, props.disabled && {color: secondary ? Theme.colors.disabled : Theme.colors.background}]}>{props.title}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 54,
        justifyContent: "center",
        backgroundColor: Theme.colors.primary,
        alignItems: 'center',
        borderRadius: 60,
        padding: 8,
    },
    secondary: {
        backgroundColor: "transparent"
    },
    disabled: {
        backgroundColor: Theme.colors.disabled
    },
});

export default AppButton;
