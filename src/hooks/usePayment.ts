import { useReducer } from 'react';
import { useStore } from '../store/store';

const initialState = {
  paymentMode: 'credit card',
  selectedCard: null as string | null,
  showAnimation: false,
};

type Action =
  | { type: 'SET_PAYMENT_MODE'; payload: string }
  | { type: 'SET_SELECTED_CARD'; payload: string | null }
  | { type: 'SET_SHOW_ANIMATION'; payload: boolean }
  | { type: 'RESET_ANIMATION' };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'SET_PAYMENT_MODE':
      return { ...state, paymentMode: action.payload };
    case 'SET_SELECTED_CARD':
      return { ...state, selectedCard: action.payload };
    case 'SET_SHOW_ANIMATION':
      return { ...state, showAnimation: action.payload };
    case 'RESET_ANIMATION':
      return { ...state, showAnimation: false };
    default:
      return state;
  }
};

const usePayment = (navigation: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);

  const paymentModeBorder = `${"rounded-[30px] border-[3px] p-4 bg-primaryBlackHex"} ${
    state.paymentMode === "Credit Card" ? 'border-primaryOrangeHex' : 'border-primaryGreyHex'
  }`;

  const buttonPressHandler = () => {
    dispatch({ type: 'SET_SHOW_ANIMATION', payload: true });
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      dispatch({ type: 'RESET_ANIMATION' });
      navigation.navigate('Tabs', { screen: 'History' });
    }, 2000);
  };

  return {
    showAnimation: state.showAnimation,
    paymentModeBorder,
    paymentMode: state.paymentMode,
    CartPrice,
    selectedCard: state.selectedCard,
    setSelectedCard: (card: string | null) => dispatch({ type: 'SET_SELECTED_CARD', payload: card }),
    calculateCartPrice,
    buttonPressHandler,
    setShowAnimation: (value: boolean) => dispatch({ type: 'SET_SHOW_ANIMATION', payload: value }),
    addToOrderHistoryListFromCart,
    setPaymentMode: (mode: string) => dispatch({ type: 'SET_PAYMENT_MODE', payload: mode }),
  };
};

export default usePayment;