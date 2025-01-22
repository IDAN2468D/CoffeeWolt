import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';  // Ensure this includes "History"

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const AboutScreen = ({ navigation }: Props) => {
  return (
    <View className="flex-1 justify-center items-center bg-primaryBlackHex px-4">
      <Image
        source={{
          uri: 'https://via.placeholder.com/150',
        }}
        className="w-40 h-40 rounded-full mb-4"
      />
      <Text className="text-[#FBE9E7] text-2xl font-bold mb-2">Welcome to CoffeeTime!</Text>
      <Text className="text-[#D7CCC8] text-center mb-6">
        At CoffeeTime, we brew happiness in every cup. Our coffee is crafted with care and passion, just for you.
      </Text>
      <TouchableOpacity
        className="bg-[#795548] px-6 py-3 rounded-full"
        onPress={() => navigation.navigate('Tabs')}
      >
        <Text className="text-[#FBE9E7] font-semibold">Order Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;