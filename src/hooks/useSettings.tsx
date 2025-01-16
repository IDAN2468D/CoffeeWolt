import { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import useAuth from './useAuth';
import { RootStackParamList } from '../types/RootStackParamList';

const useSettings = (navigation: NavigationProp<RootStackParamList>) => {
  const { deleteUser, loading, user, error } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const handleDelete = () => {
    setIsModalVisible(true); 
  };

  const confirmDelete = async () => {
    try {
      await deleteUser();
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Error deleting user:', error);
      setIsModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  return {
    handleDelete,
    confirmDelete,
    cancelDelete,
    isModalVisible,
    loading,
    user,
    error,
  };
};

export default useSettings;
