import React from "react";
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import useRegister from "../../hooks/useRegister";
import Entypo from "react-native-vector-icons/Entypo";
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const {
    navigation,
    username,
    password,
    confirmPassword,
    loading,
    showPassword,
    showConfirmPassword,
    setUsername,
    setPassword,
    setConfirmPassword,
    usernameError,
    passwordError,
    confirmPasswordError,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister
  } = useRegister();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primaryDarkGreyHex"
    >
      <StatusBar backgroundColor="#141921" />
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("../../../assets/app_images/Coffee.png")}
          className="w-40 h-40 mb-6"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-primaryWhiteHex mb-2">
          Join Our Coffee Club
        </Text>
        <Text className="text-lg text-primaryWhiteHex mb-6">
          Start your coffee journey today
        </Text>
        <View className="w-full max-w-md">
          <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
        <Ionicons name={"person"} size={20} color="#666" />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{flex: 1}}
              placeholderTextColor="#8b4513"
              autoCapitalize="none"
            />
          </View>
          {usernameError && (
            <Text className="text-red-500 text-sm mb-2">{usernameError}</Text>
          )}
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
          {passwordError && (
            <Text className="text-red-500 text-sm mb-2">{passwordError}</Text>
          )}
          <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
        <FontAwesome name={"lock"} size={20} color="#666" />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#8b4513"
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Entypo name={showConfirmPassword ? 'eye' : 'eye-with-line'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {confirmPasswordError && (
            <Text className="text-red-500 text-sm mb-2">{confirmPasswordError}</Text>
          )}
          <TouchableOpacity
            className={`h-12 rounded-full justify-center items-center shadow-lg ${
              loading ? "bg-VeryDarkDesaturatedRed" : "bg-DarkOrange"
            }`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-primaryWhiteHex font-bold text-lg">
              {loading ? "Brewing..." : "Create Account"}
            </Text>
          </TouchableOpacity>
          {/* Already have an account? */}
          <View className="mt-8 pt-6 border-t border-primaryWhiteHex items-center">
            <Text className="text-primaryWhiteHex mb-2">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Text className="text-primaryWhiteHex font-bold underline">
                Sign in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
