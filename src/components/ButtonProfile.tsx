import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface ButtonProfileProps {
  text: string;
  icon: string;
  subtext?: string;
  subtext_2?: string;
  onPress: () => void;
}

const ButtonProfile = ({ text, icon, subtext, subtext_2, onPress }: ButtonProfileProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View className="flex-row-reverse items-center justify-start gap-2 bg-darkGray p-4 rounded-xl shadow-md border-2 border-primaryWhiteHex">
        <Icon name={icon} size={18} color="#ffffff" />
        <View className="ml-3">
          <Text className="text-primaryWhiteHex text-lg">{text}</Text>
          {subtext || subtext_2 ? (
            <View>
              {subtext && <Text className="text-primaryWhiteHex text-sm">{subtext}</Text>}
              {subtext_2 && <Text className="text-primaryWhiteHex text-xs">{subtext_2}</Text>}
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonProfile;