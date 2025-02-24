import React, { useReducer, useEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';
import PushNotification from 'react-native-push-notification';

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

const calculateCartListPrice = (cartList: CartItem[]): string => {
  const totalPrice = cartList.reduce((total, item) => {
    const itemPrice = parseFloat(item.ItemPrice) || 0;
    return total + itemPrice;
  }, 0);

  return totalPrice.toFixed(2);
};

const useOrderHistory = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const storeOrderHistoryList = useStore((state: any) => state.OrderHistoryList || []);

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
  
    // בדיקת הרשאות
    PushNotification.checkPermissions((permissions) => {
      if (!permissions.alert) {
        console.log("Push notification permission not granted.");
        PushNotification.requestPermissions();
      }
    });
  
    PushNotification.createChannel(
      {
        channelId: 'order-history-channel', 
        channelName: 'Order History Notifications', 
        channelDescription: 'Notifications related to Order History', 
        playSound: true, 
        soundName: 'default', 
        importance: 4, 
        vibrate: true, 
      },
      (created) => {
        console.log(`Channel created: ${created}`); 
      }
    );
  }, [state.showAnimation]);
  
  const sendPushNotification = (message: string, orderDetails: Order | null = null) => {
    const notificationMessage = orderDetails
      ? `Order history updated: ${orderDetails.CartList.length} items, Total: $${orderDetails.CartListPrice}`
      : message;
    console.log('notificationMessage:', notificationMessage);
    const notificationTitle = orderDetails
      ? `Order History: ${orderDetails.CartList.length} items`
      : 'Order History';
  
    const notificationBigText = orderDetails
      ? `Order Date: ${orderDetails.OrderDate}\nItems:\n${orderDetails.CartList
          .map((item) => `- ${item.name} ($${item.ItemPrice})`)
          .join('\n')}`
      : '';
  
    console.log('Sending push notification:', notificationMessage);
  
    PushNotification.localNotification({
      channelId: 'order-history-channel',
      title: notificationTitle,
      message: notificationMessage,
      bigText: notificationBigText, 
    });
  };
  
  const buttonPressHandler = async () => {
    dispatch({ type: 'SET_SHOW_ANIMATION', payload: true });

    try {
      if (!state.OrderHistoryList || state.OrderHistoryList.length === 0) {
        console.log('No orders to send');
        sendPushNotification('No orders to download.');
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

        const fixedCartListPrice = calculateCartListPrice(fixedCartList); 

        return {
          CartList: fixedCartList,
          CartListPrice: fixedCartListPrice,
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
      sendPushNotification('Order history downloaded successfully!');
    } catch (error: any) {
      console.error('Error sending order history:', error.message || error);
      sendPushNotification('Failed to download order history.');
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