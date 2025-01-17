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
  const [emailError, setEmailError] = useState<string>('');
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
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!email || !password || !confirmPassword) {
      if (!email) setEmailError('Email is required');
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
      await register(email, password);
      navigation.navigate('LogIn');
    } catch (error:any) {
      Alert.alert('Registration Failed', error.message || 'An error occurred');
    }
  };

  return {
    navigation,
    email,
    password,
    confirmPassword,
    loading,
    showPassword,
    showConfirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister,
  };
};

export default useRegister;
