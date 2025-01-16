import { useState } from 'react';
import useAuth from './useAuth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

const useLogIn = () => {
  const { login, loading, error } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }

    if (!username || !password) return;

    try {
      console.log('Sending login request...');
      await login(username, password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return {
    username,
    password,
    loading,
    error,
    navigation,
    setUsername,
    setPassword,
    showPassword,
    usernameError,
    passwordError,
    handleLogin,
    togglePasswordVisibility,
  };
};

export default useLogIn;
