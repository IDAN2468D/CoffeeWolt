import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../src/hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

const useForgetPassword = () => {
  const { updatePassword, loading } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !username) {
      setError('Please fill in all fields');
      return;
    }
    const token = await AsyncStorage.getItem('userToken');
    console.log('Fetched Token:', token); 
    if (!token) {
      setError('No token available. Please log in.');
      return;
    }
    try {
      const result = await updatePassword(username, oldPassword, newPassword, token);

      if (result.success) {
        setError(null);
        setSuccess('Password updated successfully!');
        setTimeout(() => navigation.navigate('LogIn'), 2000);
      } else {
        setError(result.message || 'An error occurred.');
        setSuccess(null);
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password. Please try again.');
      setSuccess(null);
    }
  };

  return {
    username,
    setUsername,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    showNewPassword,
    showOldPassword,
    setShowOldPassword,
    setShowNewPassword,
    navigation,
    error,
    success,
    loading,
    handleSubmit,
    setError,
    setSuccess,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  };
};

export default useForgetPassword;
