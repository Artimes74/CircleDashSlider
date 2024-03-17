import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  icon: JSX.Element | undefined;
  onPress: () => void;
};

const CircleButton = (props: Props) => {
  const {icon, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.button}>
      {icon}
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    // backgroundColor: '#723eff',
    backgroundColor: '#6274BB',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
