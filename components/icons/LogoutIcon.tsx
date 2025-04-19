import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const LogoutIcon: React.FC<SvgProps> = (props) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      d="M14.1428 11.5005H24.0001"
      stroke="#E53935"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.0002 9.00092L24.0001 11.5005L21.0002 14.0006"
      stroke="#E53935"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 22.0015V1H16.0206V22.0015H11.3266"
      stroke="#E53935"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.3266 23.8789L1 22.0015V1L11.3266 2.8774V23.8789Z"
      stroke="#E53935"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.97934 8.85832L3.34668 7.91962V5.57288L8.97934 6.51158V8.85832Z"
      stroke="#E53935"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LogoutIcon;
