import React from 'react';
import { View, Text, Image, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { ButtonText } from '../data/ButtonInfoProfile';
import ButtonProfile from '../components/ButtonProfile';
import useSettings from '../hooks/useSettings';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const SettingsScreen = ({ navigation }: Props) => {
  const { handleDelete, confirmDelete, cancelDelete, isModalVisible, user } = useSettings(navigation);

  if (!user) {
    return (
      <View className="flex-1 bg-primaryBlackHex justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white font-bold text-lg mt-3">Loading user...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-primaryBlackHex p-4">
      {/* Header */}
      <View className="items-center mb-8">
        <Image
          source={{ uri: "https://neuroflash.com/wp-content/uploads/2022/12/feature-image-ai-avatar-maker.png" }}
          className="w-24 h-24 rounded-full border-[3px] border-white"
          resizeMode="cover"
        />
        <Text className="text-primaryWhiteHex text-xl font-semibold mt-4">{user.username}</Text>
      </View>

      {/* Options */}
      <View>
        {ButtonText.map((button) => (
          <View key={button.id} className="mb-4">
            <ButtonProfile
              text={button.text}
              icon={button.icon}
              onPress={() => {
                if (button.id === 'logout') {
                  handleDelete(); 
                }
              }}
            />
          </View>
        ))}
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={cancelDelete}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-center font-semibold text-lg mb-4">Are you sure you want to log out?</Text>
            <View className="flex-row justify-around">
              <TouchableOpacity onPress={cancelDelete} className="bg-gray-400 p-3 rounded">
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} className="bg-red-500 p-3 rounded">
                <Text className="text-white">Yes, log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;