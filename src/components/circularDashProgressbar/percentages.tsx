import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  LINE_HEIGHT,
  LINE_NUMBER,
  LINE_WIDTH,
} from '../../utils/circularDashProgressBar/constant';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  index: number;
  height: number;
  color: string;
  percentage: Animated.SharedValue<number>;
};

const Percentages = (props: Props) => {
  const {index, height, color, percentage} = props;
  const [resume, setResume] = React.useState<boolean>(true);
  const offsetAngel = (2 * Math.PI) / (LINE_NUMBER / 2);
  const finalAngel = offsetAngel * (-LINE_NUMBER / 2 + index / 2);
  const translateY = useDerivedValue(() => {
    if (Math.min(finalAngel, 2 * Math.PI) === finalAngel) {
      return -(LINE_NUMBER / 2) * LINE_WIDTH;
    }
    return -index * LINE_WIDTH;
  });

  const percentagesHeight = useDerivedValue(() => {
    if (index <= percentage.value) {
      if (percentage.value === 0) {
        return withSpring(height / 2);
      }
      return withSpring(35);
    } else {
      if (index < percentage.value + 2 && index !== 1) {
        return withSpring(28);
      }
      return withSpring(height / 3);
    }
    return;
  }, [index]);

  const percentagesColor = useDerivedValue(() => {
    const isPasted =
      index <= percentage.value
        ? 0
        : index !== 101 || index > 101
        ? index < percentage.value + 2 && index !== 1
          ? 2
          : 1
        : 1;
    const bk = interpolateColor(
      isPasted,
      [0, 1, 2],
      ['rgba(49,153,249,1)', 'rgba(181,181,181,1)', 'rgba(49,153,249,.64)'],
    );

    return bk;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${finalAngel}rad`}, {translateY: translateY.value}],
    };
  });

  const mStyle = useAnimatedStyle(() => {
    return {
      height: percentagesHeight.value,
      // backgroundColor: percentagesColor.value,
    };
  });

  return (
    <Animated.View style={[styles.Percentages, {height: height}, rStyle]}>
      <Animated.View
        style={[
          {
            width: '100%',
            borderRadius: 16,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'pink',
          },
          mStyle,
        ]}>
        <LinearGradient
          // colors={['#650077', '#9500ff', '#723eff']}
          // colors={['#6274BB', '#A6E1FA', '#798DF7']}
          colors={['#798DF7', '#6274BB']}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            position: 'absolute',
            bottom: 0,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Percentages;

const styles = StyleSheet.create({
  Percentages: {
    width: LINE_WIDTH,
    // backgroundColor: 'rgba(32,32,32,1)',
    backgroundColor: '#303858',
    borderRadius: 16,
    position: 'absolute',
  },
});
