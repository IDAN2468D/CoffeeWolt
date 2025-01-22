import { useReducer } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import useAuth from './useAuth';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  usernameError: '',
  showPassword: false,
  showConfirmPassword: false,
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: string }
  | { type: 'SET_PASSWORD_ERROR'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD_ERROR'; payload: string }
  | { type: 'SET_USERNAME_ERROR'; payload: string }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
  | { type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' }
  | { type: 'RESET_ERRORS' };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'SET_CONFIRM_PASSWORD_ERROR':
      return { ...state, confirmPasswordError: action.payload };
    case 'SET_USERNAME_ERROR':
      return { ...state, usernameError: action.payload };
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return { ...state, showPassword: !state.showPassword };
    case 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY':
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case 'RESET_ERRORS':
      return { ...state, emailError: '', passwordError: '', confirmPasswordError: '', usernameError: '' };
    default:
      return state;
  }
};

const useRegister = () => {
  const { register, loading } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRegister = async () => {
    dispatch({ type: 'RESET_ERRORS' });

    if (!state.email || !state.password || !state.confirmPassword || !state.username) {
      if (!state.email) dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
      if (!state.password) dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password is required' });
      if (!state.confirmPassword)
        dispatch({ type: 'SET_CONFIRM_PASSWORD_ERROR', payload: 'Confirm Password is required' });
      if (!state.username) dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Username is required' });
      return;
    }

    if (state.password !== state.confirmPassword) {
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Passwords do not match' });
      dispatch({ type: 'SET_CONFIRM_PASSWORD_ERROR', payload: 'Passwords do not match' });
      return;
    }

    try {
      await register(state.email, state.password, state.username);
      navigation.navigate('LogIn');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'An error occurred');
    }
  };

  return {
    navigation,
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    username: state.username,
    loading,
    showPassword: state.showPassword,
    showConfirmPassword: state.showConfirmPassword,
    setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
    setPassword: (password: string) => dispatch({ type: 'SET_PASSWORD', payload: password }),
    setConfirmPassword: (confirmPassword: string) =>
      dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: confirmPassword }),
    setUsername: (username: string) => dispatch({ type: 'SET_USERNAME', payload: username }),
    togglePasswordVisibility: () => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' }),
    toggleConfirmPasswordVisibility: () => dispatch({ type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' }),
    handleRegister,
    emailError: state.emailError,
    passwordError: state.passwordError,
    confirmPasswordError: state.confirmPasswordError,
    usernameError: state.usernameError,
  };
};

export default useRegister;