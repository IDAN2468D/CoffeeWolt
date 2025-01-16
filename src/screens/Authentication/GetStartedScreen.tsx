import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextButton } from '../../components';
import { RootStackParamList } from '../../types/RootStackParamList';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const GetStartedScreen = ({ navigation }: Props) => {
  return (
    <ImageBackground
      source={require("../../../assets/app_images/Coffee_2.jpg")}
      className="flex-1 w-full h-full"
    >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        className="absolute bottom-0 w-full px-5 py-8"
      >
        <View className="mb-6">
          <Text className="text-primaryWhiteHex text-3xl font-bold text-center mb-2">
            Fall in Love with{'\n'}Coffee in Blissful Delight!
          </Text>
          <Text className="text-primaryWhiteHex text-lg font-medium text-center">
            Welcome to our cozy coffee corner, where{'\n'}every cup is a delightful for you.
          </Text>
        </View>

        <TextButton
          text="Get Started"
          onPress={() => navigation.navigate("LogIn")}
        />
      </LinearGradient>
    </ImageBackground>
  );
};

export default GetStartedScreen;
