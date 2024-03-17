import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnimatedDigit from './animatedDigit';

type Props = {
  number: number;
  fontSize: number;
};
const defaultHeightSize = 15;
const defaultWidthSize = 12;

const AnimatedNumberList = (props: Props) => {
  const {number, fontSize} = props;
  const [widthSize, setWidthSize] = React.useState<number>(defaultWidthSize);
  const [heightSize, setHeightSize] = React.useState<number>(defaultHeightSize);
  const getWidthAndHeightSize = React.useCallback(() => {
    setWidthSize(defaultWidthSize * Math.floor(fontSize / defaultWidthSize));
    setHeightSize(defaultHeightSize * Math.floor(fontSize / defaultWidthSize));
  }, [widthSize]);
  const firstRef = useRef<any>();
  const secondeRef = useRef<any>();
  const thirdRef = useRef<any>();
  const opacity = useSharedValue<number>(0);
  const [firstColumnIndex, setFirstColumnIndex] = React.useState<number>(9);
  const [secondeColumnIndex, setSecondeColumnIndex] = React.useState<number>(9);
  const [thirdColumnIndex, setThirdColumnIndex] = React.useState<number>(9);
  const setFirstListActiveIndex = (activeIndex: number) => {
    setFirstColumnIndex(activeIndex);
  };
  const numberLength = useMemo(() => {
    setFirstListActiveIndex(
      Number(Math.round(number).toString().split('').slice(0, 1)),
    );
    if (Math.round(number).toString().length > 1) {
      setTimeout(() => {}, 100);
      setSecondeColumnIndex(
        Number(Math.round(number).toString().split('').slice(1, 2)),
      );
    } else {
      setSecondeColumnIndex(9);
    }
    if (Math.round(number).toString().length >= 3) {
      setTimeout(() => {}, 100);
      setThirdColumnIndex(
        Number(Math.round(number).toString().split('').slice(2, 3)),
      );
    } else {
      setThirdColumnIndex(9);
    }
    return Math.round(number).toString().length;
  }, [number]);
  const numberLength2 = React.useCallback(() => {
    // console.log('aa: ', number.toString().length);
    console.log('aa: ', Math.round(number));
    setFirstListActiveIndex(
      Number(Math.round(number).toString().split('').slice(0, 1)),
    );
    if (Math.round(number).toString().length > 1) {
      setTimeout(() => {}, 100);
      setSecondeColumnIndex(
        Number(Math.round(number).toString().split('').slice(1, 2)),
      );
    } else {
      setSecondeColumnIndex(9);
    }
    if (Math.round(number).toString().length >= 3) {
      setTimeout(() => {}, 100);
      setThirdColumnIndex(
        Number(Math.round(number).toString().split('').slice(2, 3)),
      );
    } else {
      setThirdColumnIndex(9);
    }
    return Math.round(number).toString().length;
  }, [number]);
  const getNumberLengthAnimated = useDerivedValue(() => {
    return numberLength;
  });
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        getNumberLengthAnimated.value === 3
          ? widthSize * 2.7
          : getNumberLengthAnimated.value === 2
          ? widthSize * 1.8
          : widthSize,
      ),
    };
  });

  const firstListStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(-heightSize * firstColumnIndex),
        },
        {
          translateX: withTiming(numberLength >= 1 ? 0 : 40 * firstColumnIndex),
        },
      ],
    };
  });

  const SecondListStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(getNumberLengthAnimated.value ? 1 : 0),
      transform: [
        {
          translateY: withSpring(-heightSize * secondeColumnIndex),
        },
        {
          translateX: withTiming(numberLength >= 2 ? 0 : 20 * firstColumnIndex),
        },
      ],
    };
  });
  const thirdListStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(getNumberLengthAnimated.value ? 1 : 0),
      transform: [
        {
          translateY: withSpring(-heightSize * thirdColumnIndex),
        },
        {
          translateX: withSpring(
            numberLength >= 1 ? 0 : -80 * firstColumnIndex,
          ),
        },
      ],
    };
  });

  React.useEffect(() => {
    getWidthAndHeightSize();
  }, [fontSize]);
  return (
    <View
      style={[
        {
          height: heightSize,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          paddingHorizontal: 10,
          backgroundColor: 'transparent',
        },
      ]}>
      <Animated.View
        style={[
          {
            height: heightSize,
            flexDirection: 'row',
            justifyContent: 'center',
            overflow: 'hidden',
            marginRight: 1,
          },
          containerAnimatedStyle,
        ]}>
        <Animated.View ref={firstRef} style={firstListStyle}>
          {new Array(10).fill(0).map((_, index) => {
            return (
              <AnimatedDigit
                key={index}
                index={index}
                widthSize={widthSize / 1.2}
                selectedIndex={firstColumnIndex}
              />
            );
          })}
        </Animated.View>
        {numberLength >= 2 ? (
          <Animated.View ref={secondeRef} style={SecondListStyle}>
            {new Array(10).fill(0).map((_, index) => {
              return (
                <AnimatedDigit
                  key={index}
                  index={index}
                  widthSize={widthSize / 1.2}
                  selectedIndex={secondeColumnIndex}
                />
              );
            })}
          </Animated.View>
        ) : null}
        <Animated.View ref={thirdRef} style={thirdListStyle}>
          {numberLength >= 3
            ? new Array(10).fill(0).map((_, index) => {
                return (
                  <AnimatedDigit
                    key={index}
                    index={index}
                    widthSize={widthSize / 1.2}
                    selectedIndex={thirdColumnIndex}
                  />
                );
              })
            : null}
        </Animated.View>
      </Animated.View>
      <Text style={{color: 'white', fontSize: fontSize / 1.4}}>%</Text>
    </View>
  );
};

export default AnimatedNumberList;

const styles = StyleSheet.create({});
