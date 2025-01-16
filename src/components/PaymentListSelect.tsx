import React from 'react';
import { Image, ImageProps, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PaymentList } from './../data/PaymentList';
import CustomIcon from './CustomIcon';

interface PaymentListSelectProps {
  name: string;
  icon: ImageProps;
  isIcon: boolean;
  price: number;
  paymentMode: string;
}

const PaymentListSelect = (props: PaymentListSelectProps) => {
  const PaymentList_Select = `
      ${props.paymentMode == props.name ? "border-primaryOrangeHex" : "border-primaryGreyHex"} 
      ${"rounded-[30px] border-[3px] bg-primaryBlackHex"}
    `
  return (
    <View className={PaymentList_Select}>
      {props.isIcon ? (
          <LinearGradient 
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}} 
            colors={['#252A32','#0C0F14']}
            className='flex-row-reverse items-center justify-between p-3 px-6' 
            style={{borderRadius: 30}}
          >
            <View className="flex-row-reverse items-center gap-6">
              <CustomIcon name="wallet" size={30} color={"#D17842"} />
              <Text className="text-lg text-primaryWhiteHex">{props.name}</Text>
            </View>
            <View className='flex-row'>
              <Text className='text-lg text-primaryWhiteHex'>{props.price}</Text>
              <Text className="text-lg text-primaryOrangeHex">$ </Text>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient 
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#252A32', '#0C0F14']} 
            className='flex-row-reverse items-center justify-between p-3 px-6' 
            style={{borderRadius: 30}}
          >
            <View className="flex-row-reverse items-center gap-6">
              <Image source={props.icon} style={{ width: 24, height: 24 }} />
              <Text className="text-lg text-primaryWhiteHex">{props.name}</Text>
            </View>
          </LinearGradient>
        )}
    </View>
  );
};

export default PaymentListSelect;