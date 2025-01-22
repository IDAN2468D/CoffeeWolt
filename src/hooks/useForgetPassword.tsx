import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../src/hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

type State = {
  username: string;
  oldPassword: string;
  newPassword: string;
  showOldPassword: boolean;
  showNewPassword: boolean;
  error: string | null;
  success: string | null;
};

type Action =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_OLD_PASSWORD'; payload: string }
  | { type: 'SET_NEW_PASSWORD'; payload: string }
  | { type: 'TOGGLE_OLD_PASSWORD_VISIBILITY' }
  | { type: 'TOGGLE_NEW_PASSWORD_VISIBILITY' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: string | null };

const initialState: State = {
  username: '',
  oldPassword: '',
  newPassword: '',
  showOldPassword: false,
  showNewPassword: false,
  error: null,
  success: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_OLD_PASSWORD':
      return { ...state, oldPassword: action.payload };
    case 'SET_NEW_PASSWORD':
      return { ...state, newPassword: action.payload };
    case 'TOGGLE_OLD_PASSWORD_VISIBILITY':
      return { ...state, showOldPassword: !state.showOldPassword };
    case 'TOGGLE_NEW_PASSWORD_VISIBILITY':
      return { ...state, showNewPassword: !state.showNewPassword };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

const useForgetPassword = () => {
  const { updatePassword, loading } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async () => {
    const { username, oldPassword, newPassword } = state;

    if (!username || !oldPassword || !newPassword) {
      dispatch({ type: 'SET_ERROR', payload: 'Please fill in all fields' });
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    console.log('Fetched Token:', token);

    if (!token) {
      dispatch({ type: 'SET_ERROR', payload: 'No token available. Please log in.' });
      return;
    }

    try {
      const result = await updatePassword(username, oldPassword, newPassword, token);

      if (result.success) {
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_SUCCESS', payload: 'Password updated successfully!' });
        setTimeout(() => navigation.navigate('LogIn'), 2000);
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message || 'An error occurred.' });
        dispatch({ type: 'SET_SUCCESS', payload: null });
      }
    } catch (err) {
      console.error('Error updating password:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update password. Please try again.' });
      dispatch({ type: 'SET_SUCCESS', payload: null });
    }
  };

  return {
    ...state,
    loading,
    handleSubmit,
    setUsername: (username: string) => dispatch({ type: 'SET_USERNAME', payload: username }),
    setOldPassword: (oldPassword: string) =>
      dispatch({ type: 'SET_OLD_PASSWORD', payload: oldPassword }),
    setNewPassword: (newPassword: string) =>
      dispatch({ type: 'SET_NEW_PASSWORD', payload: newPassword }),
    togglePasswordVisibility: () => dispatch({ type: 'TOGGLE_OLD_PASSWORD_VISIBILITY' }),
    toggleConfirmPasswordVisibility: () => dispatch({ type: 'TOGGLE_NEW_PASSWORD_VISIBILITY' }),
  };
};

export default useForgetPassword;