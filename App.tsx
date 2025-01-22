import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Tabs from './src/navigators/TabNavigator';
import useAuthStatus from './src/hooks/useAuthStatus';
import { DetailsScreen, ForgetPassword, PaymentScreen,AboutScreen, SettingsScreen, AccountScreen } from './src/screens';
import { LoginScreen, RegisterScreen, GetStartedScreen } from './src/screens/Authentication/index';
import { Buffer } from 'buffer';
import { RootStackParamList } from './src/types/RootStackParamList';
global.Buffer = Buffer;
import "./global.css" 

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const { isLoading, isSignedIn } = useAuthStatus();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primaryBlackHex">
        <LottieView 
          source={require('./src/lottie/coffeecup.json')}
          style={{ width: 200, height: 200 }}
          loop 
          autoPlay 
        />
        <Text className="text-lg text-primaryWhiteHex font-SemiBold">CoffeeCup</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSignedIn ? "Tabs": 'GetStarted'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="LogIn" component={LoginScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='GetStarted' component={GetStartedScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='About' component={AboutScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='Settings' component={SettingsScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='Account' component={AccountScreen} options={{ animation: "fade_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;