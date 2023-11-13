import React, {FC} from 'react';
import {Text, TextProps} from "react-native";
import {Theme} from "../share/theme";


const BodyText:FC<TextProps> = (props) => {
    return (
        <Text style={[Theme.textVariants.body, props.style]}>
            {props.children}
        </Text>
    );
};

export default BodyText;
