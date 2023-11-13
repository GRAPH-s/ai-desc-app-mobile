import React, {FC} from 'react';
import {Text, TextProps} from "react-native";
import {Theme} from "../share/theme";

const HeadingText: FC<TextProps> = (props) => {
    return (
        <Text {...props} style={[Theme.textVariants.header, props.style]}>
            {props.children}
        </Text>
    );
};

export default HeadingText;
