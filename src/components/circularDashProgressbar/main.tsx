import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LINE_NUMBER} from '../../utils/circularDashProgressBar/constant';
import Percentages from './percentages';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Mock from './mock';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
type Props = {
  percentage: Animated.SharedValue<number>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};
const Main = (props: Props) => {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const {percentage, setNumber} = props;

  const context = useSharedValue({x: 0, y: 0});
  const derivedTranslateX = useDerivedValue(() => {
    // Math.min(Math.max(number, 0), 100);
    const tx = Math.min(Math.max(translateX.value, -190), 190);
    const ty = Math.min(Math.max(translateY.value, 0), 414);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    // const dis = ang <= 90 ? 190 - tx : 190 + tx;
    // const result = ang <=90 ? tx+dis:tx
    // console.log('t:', tx);
    const dis = 200 - Math.abs(ty);
    const result = ang >= 45 && ang <= 135 ? ty + dis : ty - dis;

    return Math.min(Math.max(translateX.value, -190), 190);
    // return tx + dis;
    // return translateX.value;
  });
  const derivedTranslateXForNumber = useDerivedValue(() => {
    // Math.min(Math.max(number, 0), 100);
    const tx = Math.min(Math.max(translateX.value, -190), 190);
    const ty = Math.min(Math.max(translateY.value, 0), 414);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    // const dis = ang <= 90 ? 190 - tx : 190 + tx;
    // const result = ang <=90 ? tx+dis:tx
    // console.log('t:', tx);
    const dis = 200 - Math.abs(ty);
    const result = ang >= 45 && ang <= 135 ? ty + dis : ty - dis;

    return Math.min(Math.max(translateX.value, -190), 190);
    // return tx + dis;
    // return translateX.value;
  });
  const derivedTranslateY = useDerivedValue(() => {
    // Math.min(Math.max(number, 0), 100);
    // return Math.min(Math.max(translateY.value, -180), 180);
    // console.log(Math.min(Math.max(translateY.value, 0), 364));
    // return Math.min(Math.max(translateY.value, 0), 364);
    const tx = Math.min(Math.max(translateX.value, -190), 190);
    const ty = Math.min(Math.max(translateY.value, -207), 207);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    // const dis = ang <= 90 ? 190 - tx : 190 + tx;
    // console.log('t:', t);
    // console.log('ang:', ang);
    // console.log('y:', translateY.value);
    // console.log('y:', ty);
    const dis = 200 - Math.abs(ty);
    const result = ang >= 45 && ang <= 135 ? ty + dis : ty - dis;
    // return Math.min(Math.max(translateY.value, -207), 207);
    return result;
    // return ty + dis;
    // return translateY.value;
  });
  const derivedTranslateYForNumber = useDerivedValue(() => {
    // Math.min(Math.max(number, 0), 100);
    // return Math.min(Math.max(translateY.value, -180), 180);
    // console.log(Math.min(Math.max(translateY.value, 0), 364));
    // return Math.min(Math.max(translateY.value, 0), 364);
    const tx = Math.min(Math.max(translateX.value, -190), 190);
    const ty = Math.min(Math.max(translateY.value, -207), 207);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    // const dis = ang <= 90 ? 190 - tx : 190 + tx;
    // console.log('t:', t);
    // console.log('ang:', ang);
    // console.log('y:', translateY.value);
    // console.log('y:', ty);
    const dis = 200 - Math.abs(ty);
    const result = ang >= 45 && ang <= 135 ? ty + dis : ty - dis;
    // return Math.min(Math.max(translateY.value, -207), 207);
    return Math.min(Math.max(translateY.value, 0), 407);
    // return result;
    // return ty + dis;
    // return translateY.value;
  });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
      // console.log(Math.abs(translateY.value));
      // console.log(translateY.value);
      // console.log(
      //   'angel is: ',
      //   // Math.round(
      //   //   (100 *
      //   //     (Math.atan2(derivedTranslateY.value, derivedTranslateX.value) *
      //   //       180)) /
      //   //     Math.PI /
      //   //     180,
      //   // ),
      //   (Math.atan2(derivedTranslateY.value, derivedTranslateX.value) * 180) /
      //     Math.PI,
      // );

      // percentage.value =
      //   (100 *
      //     (Math.atan(
      //       derivedTranslateYForNumber.value / derivedTranslateXForNumber.value,
      //     ) *
      //       180)) /
      //   Math.PI /
      //   180;
      percentage.value =
        (100 *
          (Math.atan2(
            derivedTranslateYForNumber.value,
            derivedTranslateXForNumber.value,
          ) *
            180)) /
        Math.PI /
        180;

      runOnJS(setNumber)(
        Math.round(
          (100 *
            (Math.atan2(
              derivedTranslateYForNumber.value,
              derivedTranslateXForNumber.value,
            ) *
              180)) /
            Math.PI /
            180,
        ),
      );
    });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: derivedTranslateXForNumber.value,
        },
        {
          translateY: derivedTranslateYForNumber.value,
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'blue',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
              // justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            {/* <Animated.View
              style={[
                {
                  width: 50,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  position: 'absolute',
                },
                panStyle,
              ]}
            /> */}
          </View>
          {new Array(LINE_NUMBER).fill(0).map((_, index) => {
            return (
              <Percentages
                key={index}
                index={index + 1}
                color="rgba(254,40,12,1)"
                height={20}
                percentage={percentage}
              />
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({});
