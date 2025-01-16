import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';

interface GradientBgIconProps {
    name: string;
    size: number;
    color: string;
}

const GradientBgIcon = (props: GradientBgIconProps) => {
  return (
    <View className='border-2 border-secondaryDarkGreyHex rounded-xl items-center justify-center bg-secondaryDarkGreyHex overflow-hidden'>
      <LinearGradient 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#252A32", "#0C0F14"]}
        className='h-9 w-9 items-center justify-center'
      >
        <CustomIcon name={props.name} color={props.color} size={props.size}/>
      </LinearGradient>
    </View>
  );
}

export default GradientBgIcon;
