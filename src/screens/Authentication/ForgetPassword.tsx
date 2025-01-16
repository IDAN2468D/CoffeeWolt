import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StatusBar } from "react-native";
import useForgetPassword from "../../hooks/useForgetPassword";
import  Entypo  from 'react-native-vector-icons/Entypo';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

const ForgetPassword: React.FC = () => {
  const {
    username,
    setUsername,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    showNewPassword,
    showOldPassword,
    error,
    success,
    loading,
    navigation,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  } = useForgetPassword();

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
          Reset Password
        </Text>
        <Text className="text-lg text-primaryWhiteHex mb-6">
          Your password journey starts here
        </Text>
        <View className="w-full max-w-md">
          {error && (
            <Text className="text-red-500 text-xs mb-2 text-center">{error}</Text>
          )}
          {success && (
            <Text className="text-green-500 text-xs mb-2 text-center">{success}</Text>
          )}
         <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
          <Ionicons name={"person"} size={20} color="#666" />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{ flex: 1 }}
            placeholderTextColor="#8b4513"
          />
          </View>
          <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
          <FontAwesome name={"lock"} size={20} color="#666" />
            <TextInput
                placeholder="Old Password"
                secureTextEntry={!showOldPassword}
                value={oldPassword}
                onChangeText={setOldPassword}
                style={{ flex: 1 }}
                placeholderTextColor="#8b4513"
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Entypo name={showOldPassword ? 'eye' : 'eye-with-line'} size={20} color="#666" />
                </TouchableOpacity>
            </View>
            <View className="h-12 bg-white rounded-full px-4 mb-4 text-brown-800 flex-row-reverse items-center">
            <FontAwesome name={"lock"} size={20} color="#666" />
            <TextInput
                placeholder="New Password"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                style={{flex: 1}}
                placeholderTextColor="#8b4513"
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Entypo name={showNewPassword ? 'eye' : 'eye-with-line'} size={20} color="#666" />
                </TouchableOpacity>
            </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`h-12 rounded-full flex items-center justify-center shadow-lg ${
              loading ? "bg-VeryDarkDesaturatedRed" : "bg-DarkOrange"
            }`}
          >
            <Text className="text-primaryWhiteHex text-lg font-bold">
              {loading ? "Updating..." : "Reset Password"}
            </Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#ffffff" className="mt-4" />}

          <View className="mt-8 pt-6 border-t border-primaryWhiteHex items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("LogIn")}
              className="mt-4 items-center"
            >
              <Text className="text-primaryWhiteHex text-sm underline">
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;
