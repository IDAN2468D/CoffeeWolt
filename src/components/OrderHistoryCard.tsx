import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import OrderItemCard from './OrderItemCard'

interface OrderHistoryCardProps {
    OrderDate: string,
    CartListPrice: number,
    CartList: any[],
}

const OrderHistoryCard = (props: OrderHistoryCardProps) => {
  return (
    <View>
        <View className='flex-row-reverse justify-between items-center px-1 py-3'>
            <View>
                <Text className='text-base text-primaryWhiteHex text-right'>Order Date</Text>
                <Text className='text-base text-primaryWhiteHex'>{props.OrderDate}</Text>
            </View>
            <View>
                <Text className='text-base text-primaryWhiteHex'>Total Amount</Text>
                <Text className='text-xl text-primaryOrangeHex'>{props.CartListPrice} $</Text>
            </View>
        </View>
        <View className=''>
            {props.CartList.map((item: any, index: number) => {
                    return (
                        <View className='my-5' key={index.toString() + item.id}>
                        <OrderItemCard 
                          name={item.name}
                          image={item.imagelink_square}
                          special_ingredient={item.special_ingredient}
                          prices={item.prices}
                          ItemPrice={item.ItemPrice}
                        />
                    </View>
                )
            })}
        </View>
    </View>
  )
}

export default OrderHistoryCard;