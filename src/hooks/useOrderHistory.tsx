import React, { useReducer, useEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';

type CartItem = {
  id: string;
  name: string;
  ItemPrice: string;
  imagelink_square: number;
  roasted: string;
  special_ingredient: string;
  type: string;
};

type Order = {
  CartList: CartItem[];
  CartListPrice: string;
  OrderDate: string;
};

type State = {
  showAnimation: boolean;
  OrderHistoryList: Order[];
};

type Action =
  | { type: 'SET_SHOW_ANIMATION'; payload: boolean }
  | { type: 'UPDATE_ORDER_HISTORY_LIST'; payload: Order[] };

const initialState: State = {
  showAnimation: false,
  OrderHistoryList: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SHOW_ANIMATION':
      return { ...state, showAnimation: action.payload };
    case 'UPDATE_ORDER_HISTORY_LIST':
      return { ...state, OrderHistoryList: action.payload };
    default:
      return state;
  }
};

const useOrderHistory = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const storeOrderHistoryList = useStore((state: any) => state.OrderHistoryList);

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    OrderHistoryList: storeOrderHistoryList,
  });

  useEffect(() => {
    if (state.showAnimation) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'SET_SHOW_ANIMATION', payload: false });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [state.showAnimation]);

  const buttonPressHandler = async () => {
    dispatch({ type: 'SET_SHOW_ANIMATION', payload: true });

    try {
      if (!state.OrderHistoryList || state.OrderHistoryList.length === 0) {
        console.log('No orders to send');
        return;
      }

      const fixedOrderHistoryList: Order[] = state.OrderHistoryList.map((order: any) => {
        const parsedDate = new Date(order.OrderDate);
        const validOrderDate = parsedDate.getTime() ? parsedDate.toISOString() : new Date().toISOString();

        const fixedCartList = order.CartList.map((item: any, itemIndex: number) => {
          const newItem = { ...item };
          if (!newItem.id) newItem.id = `default-id-${itemIndex}`;
          if (!newItem.index) newItem.index = itemIndex;
          if (!newItem.name) newItem.name = "Unnamed Item";
          if (!newItem.ItemPrice) newItem.ItemPrice = "0.00";
          return newItem;
        });

        const fixedCartListPrice = parseFloat(order.CartListProps) || 0;

        return {
          CartList: fixedCartList,
          CartListPrice: fixedCartListPrice.toString(),
          OrderDate: validOrderDate,
        };
      });

      const response = await fetch(
        'https://coffeewoltbackend-production.up.railway.app/api/order-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orders: fixedOrderHistoryList }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to send order history: ${errorMessage}`);
      }

      const result = await response.json();
      console.log('Order history sent successfully:', result);
    } catch (error: any) {
      console.error('Error sending order history:', error.message || error);
    }
  };

  return {
    tabBarHeight,
    showAnimation: state.showAnimation,
    OrderHistoryList: state.OrderHistoryList,
    setShowAnimation: (value: boolean) => dispatch({ type: 'SET_SHOW_ANIMATION', payload: value }),
    buttonPressHandler,
  };
};

export default useOrderHistory;