import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EmptyListAnimation, HeaderBar, OrderHistoryCard, PopUpAnimated, TextButton } from '../components';
import useOrderHistory from '../hooks/useOrderHistory';

const OrderHistoryScreen = () => {
  const { tabBarHeight, showAnimation, OrderHistoryList, buttonPressHandler } = useOrderHistory();

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <PopUpAnimated icon={require('../lottie/successful.json')} showAnimation={showAnimation} style={{ height: 250 }} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: tabBarHeight }}>
        <HeaderBar title="Order History" />
        <View>
          <View className="flex-1">
            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View className="mx-5">
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
          {OrderHistoryList.length > 0 ? (
            <TextButton text="Download" onPress={() => buttonPressHandler()} />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;