import { TextStyle, ViewStyle } from 'react-native';

const palette = {
    blue: "#1E157D",
    white: "#FFF",
    neon: "#51DE45",
    black: "#1B1B1B",
    gray: "#9C9C9C",
    red: "#dc3545",
}

interface TextVariants {
    header: TextStyle;
    body: TextStyle;
    primaryButton: TextStyle
    secondaryButton: TextStyle
}

export class Theme {
    static colors = {
        background: palette.white,
        foreground: palette.black,
        secondary: palette.neon,
        primary: palette.blue,
        danger: palette.red,
        disabled: palette.gray
    }
    static spacing = {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    }
    static textVariants: TextVariants = {
        header: {
            fontFamily: 'Oswald_600SemiBold',
            fontSize: 50,
            textAlign: "center",
            lineHeight: 60,
            textTransform: "uppercase",
            color: this.colors.primary
        },
        body: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 18,
        },
        primaryButton: {
            color: this.colors.background,
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            textAlign: "center"
        },
        secondaryButton: {
            color: this.colors.primary,
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            textAlign: "center"
        }
    }
}

