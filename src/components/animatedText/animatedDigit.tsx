import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  widthSize: number;
  index: number;
  selectedIndex: number;
};

const AnimatedDigit = (props: Props) => {
  const {index, widthSize, selectedIndex} = props;
  const firstColumnTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(index === selectedIndex ? 1 : 0),
    };
  });
  const columnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(index === selectedIndex ? 1 : 0),
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: widthSize / 1.2,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        columnAnimatedStyle,
      ]}
      key={index * 11}>
      <Animated.Text
        style={[{color: 'white', fontSize: 40}, firstColumnTextAnimatedStyle]}>
        {index}
      </Animated.Text>
    </Animated.View>
  );
};

export default AnimatedDigit;

const styles = StyleSheet.create({});
