import React from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation = (props: EmptyListAnimationProps) => {
  return (
    <View className='flex-1 justify-center'>
      <LottieView
        source={require('../lottie/CoffeeEmpty.json')}
        autoPlay
        loop
        style={{  height: 300 }}
        />
        <Text className='font-Medium text-base text-primaryOrangeHex text-center'>{props.title}</Text>
    </View>
  )
}

export default EmptyListAnimation;