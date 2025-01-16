import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

interface TextButtonProps {
    text: string
    onPress: () => void
}

const TextButton = (props: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="px-[30px] py-5 bg-primaryOrangeHex rounded-xl"
      >
        <Text className='text-primaryWhiteHex text-[16px] font-bold text-center'>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TextButton;