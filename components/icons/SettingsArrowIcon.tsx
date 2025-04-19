import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SettingsArrowIcon: React.FC<SvgProps> = (props) => (
  <Svg width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
    <Path
      d="M0.57042 13.4332C0.955126 13.8179 1.57892 13.8179 1.96361 13.4332L6.77837 8.61372C7.54717 7.84413 7.54687 6.59715 6.77778 5.82795L1.96006 1.01034C1.57537 0.625542 0.95158 0.625542 0.566864 1.01034C0.182139 1.39503 0.182139 2.01882 0.566864 2.40352L4.69027 6.52691C5.07507 6.9116 5.07497 7.53539 4.69027 7.92009L0.57042 12.04C0.185695 12.4247 0.185695 13.0485 0.57042 13.4332Z"
      fill="#C5C6C7"
    />
  </Svg>
);

export default SettingsArrowIcon;
