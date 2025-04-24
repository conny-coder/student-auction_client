import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const TransactionIcon: React.FC<SvgProps> = ({
  width = 23,
  height = 25,
  color = '#fff',
}) => (
  <Svg width={width} height={height} viewBox="0 0 23 25" fill="none">
    <Path
      d="M0 6.75H20.7M16.1 1L21.85 6.75L16.1 12.5M23 18.25H2.3M6.9 12.5L1.15 18.25L6.9 24"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TransactionIcon;
