import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';

interface PopUpAnimatedProps {
  showAnimation: boolean; 
  icon?: string; 
  style?: StyleProp<ViewStyle>;
}

const PopUpAnimated = (props: PopUpAnimatedProps) => {
  return (
    <>
      {props.showAnimation ? (
        <View className='flex-1 absolute top-0 bottom-0 left-0 right-0 z-50 bg-primaryBlackRGBA justify-center'>
          <LottieView source={props.icon} style={props.style} autoPlay loop={false} />
        </View>
      ) : null}
    </>
  );
};

export default PopUpAnimated;