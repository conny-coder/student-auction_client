import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

interface ArrowLProps extends SvgProps {}

const SliderArrowIcon: React.FC<ArrowLProps> = (props) => (
  <Svg width={35} height={35} viewBox="0 0 24 24" fill="none" {...props}>
    <Defs>
      <ClipPath id="clip0_slider">
        <Rect width="35" height="35" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_slider)">
      <Path
        d="M12 22C17.5225 22 22 17.5231 22 12C22 6.47688 17.5231 2 12 2C6.47688 2 2 6.47688 2 12C2 17.5231 6.47688 22 12 22ZM12 3.23C16.825 3.23 20.75 7.175 20.75 12C20.75 16.825 16.825 20.75 12 20.75C7.175 20.75 3.25 16.825 3.25 12C3.25 7.175 7.175 3.23 12 3.23ZM11.6019 15.7769C11.8456 15.5331 11.8456 15.1369 11.6019 14.8931L9.34125 12.6325L16.3813 12.6325C16.7269 12.6325 17.0063 12.3525 17.0063 12.0075C17.0063 11.6625 16.7269 11.3825 16.3813 11.3825L9.30188 11.3825L11.6019 9.0825C11.8456 8.83875 11.8456 8.44312 11.6019 8.19875C11.48 8.07687 11.32 8.01562 11.16 8.01562C11 8.01562 10.84 8.07687 10.7181 8.19875L7.02625 11.9881L10.7181 15.7775C10.9625 16.0212 11.3575 16.0212 11.6025 15.7775L11.6019 15.7769Z"
        fill="#C5C6C7"
      />
    </G>
  </Svg>
);

export default SliderArrowIcon;
