import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {ProfilePic,GradientBgIcon} from '../components/index'

interface HeaderBarProps {
    title?: string 
}

const HeaderBar = (props: HeaderBarProps) => {
  return (
    <View className='p-[30px] flex-row items-center justify-between'>
      <ProfilePic/>
      <Text className='font-SemiBold text-xl text-primaryWhiteHex'>{props.title}</Text>
      <GradientBgIcon name='menu' color='#52555A' size={16}/>
    </View>
  );
};

export default HeaderBar;