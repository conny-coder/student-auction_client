import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const EyeOpenIcon: React.FC<SvgProps> = (props) => (
  <Svg
    width={props.width ?? 22}
    height={props.height ?? 17}
    viewBox="0 0 22 17"
    fill="none"
    {...props}
  >
    <Path
      d="M1 11C1 11 3 4.75 11 4.75M11 4.75C19 4.75 21 11 21 11M11 4.75V1M18.5 2.25L16 5.375M3.5 2.25L6 5.375M14.75 12.25C14.75 14.3211 13.0711 16 11 16C8.92887 16 7.25 14.3211 7.25 12.25C7.25 10.1789 8.92887 8.5 11 8.5C13.0711 8.5 14.75 10.1789 14.75 12.25Z"
      stroke={props.stroke ?? "#C5C6C7"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default EyeOpenIcon
