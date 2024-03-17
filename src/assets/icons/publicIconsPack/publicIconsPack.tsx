import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {publicIconPackType, publicIconType} from '../../../utils/public/types';

const ICON_ADD = (props: publicIconType) => {
  const {width, height, color, lineColor} = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="#303858">
      <Path
        d="M 11 3 L 11 11 L 3 11 L 3 13 L 11 13 L 11 21 L 13 21 L 13 13 L 21 13 L 21 11 L 13 11 L 13 3 L 11 3 z"
        fill="#303858"
      />
    </Svg>
  );
};

const ICON_MINUS = (props: publicIconType) => {
  const {width, height, color, lineColor} = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="#303858">
      <Path d="M 3 11 L 3 13 L 21 13 L 21 11 L 3 11 z" fill="#303858" />
    </Svg>
  );
};

const publicIconsPack: (
  width: number,
  height: number,
) => {name: string; icon: JSX.Element}[] = (width, height) => [
  {name: 'plus', icon: <ICON_ADD width={width} height={height} />},
  {name: 'minus', icon: <ICON_MINUS width={width} height={height} />},
];

export default publicIconsPack;
