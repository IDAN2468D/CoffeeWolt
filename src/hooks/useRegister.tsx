import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import useAuth from './useAuth';

const useRegister = () => {
  const { register, loading } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

 const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword);
};

  const handleRegister = async () => {
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!username || !password || !confirmPassword) {
      if (!username) setUsernameError('Username is required');
      if (!password) setPasswordError('Password is required');
      if (!confirmPassword) setConfirmPasswordError('Confirm Password is required');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      await register(username, password);
      navigation.navigate('LogIn');
    } catch (error:any) {
      Alert.alert('Registration Failed', error.message || 'An error occurred');
    }
  };

  return {
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
    handleRegister,
  };
};

export default useRegister;
