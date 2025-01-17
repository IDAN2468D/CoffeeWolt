import { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadUserFromStorage = async () => {
    setLoading(true);
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedToken && storedEmail) {
        setToken(storedToken);
        setUser({ email: storedEmail });
      }
    } catch (err) {
      console.error('Failed to load user from storage:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const register = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://coffeewoltbackend-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.email);
        setToken(data.token);
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('email', email);
        navigation.navigate('LogIn');
      } else {
        setError(data.message || 'Registration failed.');
        setUser(null);
      }
    } catch (err) {
      setError('An error occurred during registration.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
  
    try {
      console.log('Attempting login with:', { email, password });
  
      const response = await fetch('https://coffeewoltbackend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
  
      if (response.ok) {
        if (data.data && data.data.token) {
          setUser({ email });
          setToken(data.data.token);
          await AsyncStorage.setItem('userToken', data.data.token);
          await AsyncStorage.setItem('email', email);
          console.log('Login successful, navigating to Tabs...');
          navigation.navigate('Tabs');
        } else {
          console.error('Login succeeded but token missing:', data.message);
          setError('Login succeeded, but no token was received.');
        }
      } else {
        console.error('Login failed:', data.message || 'Unknown error');
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
    
  const updatePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string,
    token: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://coffeewoltbackend-production.up.railway.app/api/auth/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'An error occurred.' };
      }

      return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
      return { success: false, message: 'Failed to update password. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!user || !token) {
      setError('User or token missing.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://coffeewoltbackend-production.up.railway.app/api/auth/delete-user', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user.');
      }

      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('LogIn');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    loading,
    error,
    register,
    login,
    updatePassword,
    deleteUser,
  };
};

export default useAuth;
