import React from 'react';
import { View, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const OrderItemCard = (props: any) => {
    return (
        <LinearGradient
            colors={["#252a32", "rgba(12,15,20,0.5)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className='p-5'
            style={{ borderRadius: 25, overflow: 'hidden' }}
        >
            <View className='flex-row-reverse justify-between items-center'>
                <View className='flex-row-reverse gap-5 items-center'>
                    <Image source={props.image} style={{ width: 90, height: 90, borderRadius: 15 }} />
                    <View>
                        <Text className='text-2xl text-primaryWhiteHex text-right'>{props.name}</Text>
                        <Text className='text-xs text-primaryWhiteHex text-right'>{props.special_ingredient}</Text>
                    </View>
                </View>
                <View>
                    <Text className='text-primaryOrangeHex text-2xl font-bold'>{props.ItemPrice}
                        <Text className='text-primaryWhiteHex text-2xl font-bold'> $</Text>
                    </Text>
                </View>
            </View>
            {props.prices.map((data: any, index: any) => (
                    <View key={index.toString()} className='flex-row-reverse justify-between mt-3'>
                        <View className='flex-row-reverse gap-[1px]'>
                            <View className='px-5 py-2 bg-primaryBlackHex rounded-r-lg'>
                                <Text className='text-xl text-primaryWhiteHex'>{data.size}</Text>
                            </View>
                            <View className='px-5 py-2 bg-primaryBlackHex rounded-l-lg'>
                                <Text className='text-primaryOrangeHex text-center text-xl'>{props.ItemPrice}
                                    <Text className='text-primaryWhiteHex text-xl'> $</Text>
                                </Text>
                            </View>
                        </View>
                        <View className='flex-row-reverse justify-center items-center gap-2'>
                            <Text className='text-xl text-primaryOrangeHex'>X</Text>
                            <Text className='text-xl text-primaryWhiteHex'>{data.quantity}</Text>
                        </View>
                        <View className='flex-row-reverse justify-center items-center gap-2 '>
                            <Text className='text-xl text-primaryOrangeHex'>$</Text>
                            <Text className='text-primaryWhiteHex text-xl'>{data.price}</Text>
                        </View>
                    </View>
                ))}
        </LinearGradient>
    )
}

export default OrderItemCard