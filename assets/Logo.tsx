import * as React from "react"
import Svg, { SvgProps, Path, G } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
    <Svg
        width={134}
        height={166}
        fill="none"
        {...props}
    >
        <G stroke="#51DE45" strokeWidth={1.8}>
            <Path d="M14.9.9h80.2v79.2H14.9z" />
            <Path d="M38.9 32.9h94.2v94.2H38.9z" />
            <Path d="M.9 117.9h48.2v47.2H.9z" />
        </G>
    </Svg>
)
export default SvgComponent
