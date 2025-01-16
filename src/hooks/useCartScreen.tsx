import  { useCallback } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface CartScreenProps {
    navigation: any;
}

const useCartScreen = ({navigation}: CartScreenProps) => {
    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
    const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const bottomTabBarHeight = useBottomTabBarHeight();

    const incrementItem = useCallback((id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    }, [incrementCartItemQuantity, calculateCartPrice]);

    const decrementItem = useCallback((id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    }, [decrementCartItemQuantity, calculateCartPrice]);

    const buttonPressHandler = () => {
        navigation.push('Payment', { amount: CartPrice });
    };

    return { incrementItem, decrementItem, buttonPressHandler, bottomTabBarHeight, CartList, CartPrice };
}

export default useCartScreen;