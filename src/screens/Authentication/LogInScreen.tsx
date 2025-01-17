import React from "react";
import {View, TextInput, TouchableOpacity, Text, Image, StatusBar} from "react-native";
import useLogIn from "../../hooks/useLogIn";
import  Entypo  from 'react-native-vector-icons/Entypo';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const {
      email,
      password,
      loading,
      setEmail,
      setPassword,
      handleLogin,
      showPassword,
      emailError,
      passwordError,
      navigation,
      togglePasswordVisibility
    } = useLogIn();

  return (
    <View className="flex-1 bg-primaryDarkGreyHex">
    <StatusBar barStyle={"light-content"} backgroundColor="#141921" />
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={require("../../../assets/app_images/Coffee.png")}
          className="w-40 h-40 mb-6"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-primaryWhiteHex mb-2">
          Welcome Back!
        </Text>
        <Text className="text-lg text-primaryWhiteHex mb-6">
          Your daily cup of login
        </Text>
      <View className="w-full max-w-md">
        <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
          <Ionicons name={"mail"} size={20} color="#666" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{flex: 1}}
            placeholderTextColor="#8b4513"
          />
        </View>
          {emailError ? (
            <Text className="text-red-500 text-xs mb-2">{emailError}</Text>
          ) : null}
          <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
            <FontAwesome name={"lock"} size={20} color="#666" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={{ flex: 1 }}
              placeholderTextColor="#8b4513"
              />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text className="text-red-500 text-xs mb-2">{passwordError}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`h-12 rounded-full flex items-center justify-center shadow-lg ${
              loading ? "bg-VeryDarkDesaturatedRed" : "bg-DarkOrange"
            }`}
            >
            <Text className="text-primaryWhiteHex text-lg font-bold">
              {loading ? "Brewing..." : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")} className="mt-4 items-center">
            <Text className="text-primaryWhiteHex text-sm underline">
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View className="mt-8 pt-6 border-t border-primaryWhiteHex items-center">
            <Text className="text-primaryWhiteHex mb-2">
              Don't have an account yet?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-primaryWhiteHex font-bold underline">
                Register here
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  </View>
  );
};

export default LoginScreen;