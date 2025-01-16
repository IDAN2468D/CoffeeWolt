import React, { useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';


export const useOrderHistory = (navigation: any) => {
    const tabBarHeight = useBottomTabBarHeight()
    const [showAnimation, setShowAnimation] = useState(false);
    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);

    const buttonPressHandler = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000)
    }

    return {
        tabBarHeight,
        showAnimation,
        OrderHistoryList,
        setShowAnimation,
        buttonPressHandler
    }
}