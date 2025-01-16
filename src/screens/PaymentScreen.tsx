import React, { useState } from 'react';
import { ScrollView,  Text, TouchableOpacity, View } from 'react-native';
import usePayment from '../hooks/usePayment';
import { GradientBgIcon, PopUpAnimated, PaymentListSelect, PaymentFooter } from '../components';
import { CreditCard, PaymentList } from '../data/PaymentList';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

interface PaymentScreenProps {
  navigation: any;
  route: any;
}

const PaymentScreen = ({navigation, route }: PaymentScreenProps) => {
  const  {
    showAnimation,
    CartPrice,
    paymentModeBorder,
    paymentMode,
    selectedCard,
    setSelectedCard,
    setPaymentMode,
    buttonPressHandler
  } = usePayment(navigation);

  return (
    <View className='flex-1 bg-primaryBlackHex'>
      <PopUpAnimated 
        icon={require("../lottie/successful.json")}
        showAnimation={showAnimation}
        style={{flex: 1}}
      />
      <ScrollView className='flex-grow' showsVerticalScrollIndicator={false}>
        <View className='px-6 py-[15px] items-center justify-between flex-row-reverse'>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.pop()}>
          <GradientBgIcon name='left' color='#52555' size={16}/>
          </TouchableOpacity>
          <Text className='flex-1 text-center text-primaryWhiteHex font-SemiBold text-lg'>Payment</Text>
        </View>
        <View className='p-[15px] gap-[15px]'>
          {CreditCard.map((data: any) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={data.CardHolderName}
              onPress={()=> {setPaymentMode("Credit Card"), setSelectedCard(data.CreditCard);}}
            >
              <View className={paymentModeBorder}>
                <Text className='text-primaryWhiteHex text-right mb-[10px]'>Credit Card</Text>
                <LinearGradient 
                  colors={["#262B33","#0C0F14"]}
                   className='px-5 py-5'
                   style={{borderRadius: 30}}
                 >
                  <View className='flex-row-reverse justify-between items-center'>
                      <CustomIcon name='chip' color={"#D17842"} size={40} />
                      <CustomIcon name='visa' color={"#ffffff"} size={40} />
                  </View>
                    <Text className='text-center text-primaryWhiteHex font-bold text-base my-5'>{data.CreditCard}</Text>
                  <View className='flex-row-reverse justify-between'>
                    <View>
                      <Text className='text-primaryLightGreyHex font-bold text-xs'>Card Holder Name</Text>
                      <Text className='text-primaryWhiteHex text-right text-sm'>{data.CardHolderName}</Text>
                    </View>
                    <View className='items-start'>
                      <Text className='text-sm text-primaryLightGreyHex font-bold'>Expiry Date</Text>
                      <Text className='text-sm text-primaryWhiteHex'>{data.ExpiryDate}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
          {
            PaymentList.map((data: any) => (
              <TouchableOpacity  activeOpacity={0.5}  onPress={() => { setPaymentMode(data.name), setSelectedCard(data.name);}} key={data.name}>
                  <PaymentListSelect name={data.name} icon={data.icon} isIcon={data.isIcon} price={CartPrice} paymentMode={paymentMode}/>
              </TouchableOpacity>
            ))
          }
        </View>
          <PaymentFooter
            buttonTitle={`payment with ${paymentMode}`}
            price={{price: route.params.amount }}
            currency="$"
            buttonPressHandler={buttonPressHandler}
            disabled={!selectedCard}
            />
      </ScrollView>
    </View>
  )
}

export default PaymentScreen;