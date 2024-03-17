import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimatedNumberList from './animatedNumberList';

type Props = {
  number: number;
  fontSize: number;
};

const AnimatedText = (props: Props) => {
  const {number, fontSize} = props;
  return (
    <View>
      <AnimatedNumberList fontSize={fontSize} number={number} />
    </View>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({});
