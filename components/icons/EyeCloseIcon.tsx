import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const EyeCloseIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width ?? 22}
    height={props.height ?? 25}
    viewBox="0 0 22 11"
    fill="none"
    {...props}
  >
    <Path
      d="M1 0.5C1 0.5 3 6.75 11 6.75M11 6.75C19 6.75 21 0.5 21 0.5M11 6.75V10.5M18.5 9.25L16 6.125M3.5 9.25L6 6.125"
      stroke={props.stroke ?? "#C5C6C7"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default EyeCloseIcon
