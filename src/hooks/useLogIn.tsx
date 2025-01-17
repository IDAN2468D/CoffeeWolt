import { useState } from 'react';
import useAuth from './useAuth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

const useLogIn = () => {
  const { login, loading, error } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }

    if (!email || !password) return;

    try {
      console.log('Sending login request...');
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    navigation,
    setEmail,
    setPassword,
    showPassword,
    emailError,
    passwordError,
    handleLogin,
    togglePasswordVisibility,
  };
};

export default useLogIn;
