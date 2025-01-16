
import { useState } from 'react'
import { useStore } from '../store/store';

const usePayment = (navigation: any) => {
    const [paymentMode, setPaymentMode] =  useState("credit card");
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [showAnimation, setShowAnimation] =  useState(false);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);
    const paymentModeBorder = `${"rounded-[30px] border-[3px] p-4 bg-primaryBlackHex"} ${paymentMode == "Credit Card" ? 'border-primaryOrangeHex' : 'border-primaryGreyHex'}`
    
    const buttonPressHandler = () => {
      setShowAnimation(true);
      addToOrderHistoryListFromCart();
      calculateCartPrice();
      setTimeout(() => {
          setShowAnimation(false);
          navigation.navigate('Tabs', { screen: 'History' });
        }, 2000)
    }
    
  return {
    showAnimation,
    paymentModeBorder,
    paymentMode,
    CartPrice,
    selectedCard,
    setSelectedCard,
    calculateCartPrice,
    buttonPressHandler,
    setShowAnimation,
    addToOrderHistoryListFromCart,
    setPaymentMode,
  }
}

export default usePayment;