import { useReducer } from 'react';
import useAuth from './useAuth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  showPassword: false,
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: string }
  | { type: 'SET_PASSWORD_ERROR'; payload: string }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
  | { type: 'RESET_ERRORS' };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return { ...state, showPassword: !state.showPassword };
    case 'RESET_ERRORS':
      return { ...state, emailError: '', passwordError: '' };
    default:
      return state;
  }
};

const useLogIn = () => {
  const { login, loading, error } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async () => {
    dispatch({ type: 'RESET_ERRORS' });

    if (!state.email) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
    }
    if (!state.password) {
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password is required' });
    }

    if (!state.email || !state.password) return;

    try {
      console.log('Sending login request...');
      await login(state.email, state.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return {
    email: state.email,
    password: state.password,
    loading,
    error,
    navigation,
    emailError: state.emailError,
    passwordError: state.passwordError,
    showPassword: state.showPassword,
    setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
    setPassword: (password: string) =>
      dispatch({ type: 'SET_PASSWORD', payload: password }),
    togglePasswordVisibility: () =>
      dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' }),
    handleLogin,
  };
};

export default useLogIn;