import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

interface BgIconProps {
    color: string;
    size: string;
    name: string;
}

const BgIcon = (props: BgIconProps) => {
  return (
    <View className='h-[30px] w-[30px] bg-primaryOrangeHex rounded-lg justify-center items-center'>
        <CustomIcon name={props.name} className={(`${props.color} ${props.size} `)}/>
    </View>
  );
};

export default BgIcon;

const styles = StyleSheet.create({
  container: {}
});
