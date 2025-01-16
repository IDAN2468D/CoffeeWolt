import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface PaymentFooterProps {
    currency?: string;
    price?: {
        price?: string;
        current?: string;
    };
    buttonTitle?: string;
    disabled?: boolean;
    buttonPressHandler: () => void;
}

const PaymentFooter = (props: PaymentFooterProps) => {
    return (
        <View className='flex-row-reverse justify-between items-center gap-5 p-5'>
            <View className='items-center w-[100px]'>
                <Text className='font-Medium text-md text-secondaryLightGreyHex mb-1'>Total Price</Text>
                <View className=' flex-row-reverse items-center'>
                    <Text className='text-primaryOrangeHex text-2xl ml-1 font-bold'>{props?.currency}</Text>
                    <Text className='text-primaryWhiteHex text-2xl'> {props?.price?.price}</Text>
                </View>
            </View>
            <TouchableOpacity className={`
                ${!props.disabled ? 
                    "bg-primaryOrangeHex flex-1 items-center py-4 justify-center rounded-[20px]" : 
                    "bg-primaryDarkGreyHex flex-1 items-center py-4 rounded-[20px] border-[1px] border-primaryOrangeHex"}
                `}           
        activeOpacity={0.5} 
              onPress={!props.disabled ? props.buttonPressHandler : undefined}
              disabled={props.disabled}>
              <Text className='font-bold text-lg text-primaryWhiteHex'>{props?.buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentFooter;