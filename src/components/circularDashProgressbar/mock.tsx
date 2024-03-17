import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  LINE_HEIGHT,
  LINE_NUMBER,
  LINE_WIDTH,
} from '../../utils/circularDashProgressBar/constant';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  index: number;
  height: number;
  color: string;
};

const Mock = (props: Props) => {
  const {index, height, color} = props;
  const offsetAngel = (2 * Math.PI) / (LINE_NUMBER / 2);
  const finalAngel = offsetAngel * (-LINE_NUMBER / 2 + index / 2);
  const translateY = useDerivedValue(() => {
    if (Math.min(finalAngel, 2 * Math.PI) === finalAngel) {
      return -(LINE_NUMBER / 2) * LINE_WIDTH;
    }
    return -index * LINE_WIDTH;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      // height: percentagesHeight.value,
      transform: [{rotate: `${finalAngel}rad`}, {translateY: translateY.value}],
    };
  });

  return (
    <Animated.View
      style={[styles.Percentages, rStyle, {backgroundColor: color}]}
    />
  );
};

export default Mock;

const styles = StyleSheet.create({
  Percentages: {
    width: LINE_WIDTH,
    height: LINE_HEIGHT,
    // backgroundColor: 'white',
    borderRadius: 16,
    position: 'absolute',
    // top: 100,
  },
});
