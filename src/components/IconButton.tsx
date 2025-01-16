import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'

interface IconButtonProps {
    size?: number;
    icon: string;
    onPress?: () => void;
}

const IconButton = (props: IconButtonProps) => {
  return (
  <TouchableOpacity activeOpacity={0.5} className='bg-primaryOrangeHex rounded-[10px] p-[10px]' onPress={props.onPress}>
     <CustomIcon name={props.icon} style={{color: "white"}} size={props.size}/>
  </TouchableOpacity>  
)
}

export default IconButton;