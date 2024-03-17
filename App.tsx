// ! Thanks for reading this code. 🤩
// ? If you have any question about the code you can get contact to me via blow 👇
// ? Email : artimes.geraami@gmail.com
// ? TelegramID : @artimesgr
// ? 👨🏻‍💻

// *$ Libraries I used
import React from 'react';
import {
  Dimensions,
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Main from './src/components/circularDashProgressbar/main';
import CircleButton from './src/components/public/circleButton';
import publicIconsPack from './src/assets/icons/publicIconsPack/publicIconsPack';
import iconProvider from './src/services/iconProvider';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AnimatedText from './src/components/animatedText/animatedText';
import {FONT_SIZE} from './src/utils/circularDashProgressBar/constant';

// *$ Get device width and height
const {width, height} = Dimensions.get('screen');

// *$ For ignore all logs
LogBox.ignoreAllLogs();

const App = () => {
  // *$ Value of progress
  const [number, setNumber] = React.useState<number>(0);

  // *$ Defined value for animation progress
  const percentage = useSharedValue<number>(number);

  // *$ Calculate how much could animation goes
  const calculatePercentage = useDerivedValue(() => {
    return Math.min(Math.max(percentage.value, 0), 100);
  });

  // *$ Add animation progress and value
  const AddPercentage = React.useCallback(() => {
    percentage.value = withTiming(calculatePercentage.value + 13, {
      duration: 800,
    });
    setNumber(Math.min(Math.max(number + 13, 0), 100));
  }, [number]);

  // *$ Minus animation progress and value
  const minusPercentage = React.useCallback(() => {
    percentage.value = withTiming(calculatePercentage.value - 13, {
      duration: 800,
    });
    setNumber(Math.min(Math.max(number - 13, 0), 100));
  }, [number]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{position: 'absolute'}}>
          <AnimatedText fontSize={FONT_SIZE} number={number} />
        </View>
        <View style={{width: width, height: height / 2}}>
          <Main percentage={percentage} setNumber={setNumber} />
        </View>
        <View style={styles.buttonsContainer}>
          <CircleButton
            onPress={AddPercentage}
            icon={iconProvider(publicIconsPack, 'plus', 20, 20)?.icon}
          />
          <CircleButton
            onPress={minusPercentage}
            icon={iconProvider(publicIconsPack, 'minus', 20, 20)?.icon}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#111',
    backgroundColor: '#444B6F',
  },
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 80,
  },
});
