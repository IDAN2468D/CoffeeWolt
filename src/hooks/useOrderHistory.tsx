import React, { useState, useEffect } from 'react';
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

const useOrderHistory = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);
    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
    console.log('OrderHistoryList:', OrderHistoryList);
  
    useEffect(() => {
      if (showAnimation) {
        const timeout = setTimeout(() => {
          setShowAnimation(false); // הפסקת האנימציה אחרי 2 שניות
        }, 2000);
  
        return () => clearTimeout(timeout);
      }
    }, [showAnimation]);
  
    const buttonPressHandler = async () => {
      setShowAnimation(true); // התחלת האנימציה
    
      try {
        // בדיקת תקינות הרשימה
        if (!OrderHistoryList || OrderHistoryList.length === 0) {
          console.log('No orders to send');
          return;
        }
  
    const fixedOrderHistoryList: Order[] = OrderHistoryList.map((order: any) => {
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
        console.log(order.CartListProps)
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
            body: JSON.stringify({ orders: fixedOrderHistoryList }), // שליחת רשימת ההזמנות
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
      showAnimation,
      OrderHistoryList,
      setShowAnimation,
      buttonPressHandler,
    };
  };
export default useOrderHistory 