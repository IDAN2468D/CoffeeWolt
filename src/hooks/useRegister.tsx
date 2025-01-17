import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import useAuth from './useAuth';

const useRegister = () => {
  const { register, loading } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>(''); // Added username state
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>(''); // Added username error state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setUsernameError(''); // Clear username error

    if (!email || !password || !confirmPassword || !username) {
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
      if (!confirmPassword) setConfirmPasswordError('Confirm Password is required');
      if (!username) setUsernameError('Username is required'); // Check for username
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      await register(email, password, username); // Pass username to register function
      navigation.navigate('LogIn');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'An error occurred');
    }
  };

  return {
    navigation,
    email,
    password,
    confirmPassword,
    username, // Return username state
    loading,
    showPassword,
    showConfirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    setUsername, // Return setUsername
    emailError,
    passwordError,
    confirmPasswordError,
    usernameError, // Return username error state
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister,
  };
};

export default useRegister;