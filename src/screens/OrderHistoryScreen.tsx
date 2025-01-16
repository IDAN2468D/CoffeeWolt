import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EmptyListAnimation, HeaderBar, OrderHistoryCard, PopUpAnimated } from '../components'
import {useOrderHistory} from '../hooks/useOrderHistory'


const OrderHistoryScreen = (navigation: any) => {
  const {tabBarHeight, showAnimation, OrderHistoryList, buttonPressHandler} = useOrderHistory(navigation)

  return (
    <View className='flex-1 bg-primaryBlackHex'>
      <PopUpAnimated icon={require("../lottie/download.json")} showAnimation={showAnimation}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: tabBarHeight}}>
        <HeaderBar title="Order History"/>
        <View>
          <View className='flex-1'>
            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={"No Order History"}/>
            ) : (
            <View className='mx-5'>
              {OrderHistoryList.map((data: any, index: number) => (
                  <OrderHistoryCard 
                   key={index.toString()}
                   CartList={data.CartList}
                   CartListPrice={data.CartListProps}
                   OrderDate={data.OrderDate}                  
                 />
              ))}
            </View>
            )}
          </View>
        </View>
        </ScrollView>
    </View>
  )
}

export default OrderHistoryScreen