import React, { useState } from 'react';
import { StatusBar, ScrollView, View, TouchableOpacity } from 'react-native';
import useCartScreen from '../hooks/useCartScreen';
import HeaderBar from './../components/HeaderBar';
import { CartItem, EmptyListAnimation, PaymentFooter } from '../components';

const CartScreen = ({ navigation }: any) => {
  const { incrementItem, decrementItem, buttonPressHandler, CartList, bottomTabBarHeight, CartPrice } = useCartScreen({ navigation });
  console.log('Is button disabled:', CartList.length === 0);
  console.log('CartList:', CartList);

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <StatusBar backgroundColor="#0C0F14" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="flex-grow"
        contentContainerStyle={{ flexGrow: 1 }}
      >
      <HeaderBar />
        <View style={{ marginBottom: bottomTabBarHeight }}  className="flex-1 justify-between">
          <View className="flex-1">
            {CartList.length == 0 ? (
              <EmptyListAnimation title='Cart is Empty'/>
            ) : (
              <View className="px-5 gap-5">
                {CartList.map((item: any) => (
                  <TouchableOpacity 
                  key={item.id}
                   activeOpacity={0.5}
                    onPress={() => navigation.navigate("Details", {
                      index: item.index,
                      id: item.id,
                      type: item.type
                    })}
                    >
                    <CartItem {...item} incrementItem={incrementItem} decrementItem={decrementItem} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartList.length !== 0 && (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{ price: CartPrice }}
              currency={"$"} 
              disabled={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;