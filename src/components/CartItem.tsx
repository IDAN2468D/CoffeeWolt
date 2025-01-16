import React from 'react';
import { Text, View, Image } from 'react-native';
import { CartItemProps } from '../types/CartItemProps';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from './IconButton';

const CartItem = (props: CartItemProps) => {
  return (
    <View>
      {props.prices.length !== 1 ? (
        <LinearGradient
          colors={["#252A32", "#0C0F14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 15, borderRadius: 25 }}
        >
          <View className='flex-row-reverse items-center gap-[22px]'>
            <Image
              source={props.imagelink_square}
              className='w-[130px] h-[130px] rounded-[25px]'
            />
            <View className='items-end gap-2'>
              <Text className='text-primaryWhiteHex font-SemiBold text-lg'>
                {props.name}
              </Text>
              <Text className='text-primaryWhiteHex font-Regular text-xs'>
                {props.special_ingredient}
              </Text>
              <View className='w-[130px] h-[55px] rounded-[10px] bg-primaryBlackHex justify-center items-center'>
                <Text className="font-Medium text-[14px] text-primaryWhiteHex">
                  {props.roasted}
                </Text>
              </View>
            </View>
          </View>
          {props.prices.map((data: any, index: number) => (
            <View key={`${props.id}-${data.size}-${index}`} className='flex-row justify-between items-center mt-4'>
              <View className='flex-1 items-center flex-row-reverse justify-between gap-4'>
                <View className='flex-1 items-center justify-center w-[100px] h-10 rounded-[20px] bg-primaryBlackHex'>
                  <Text className={`${data.type === "Bean" ? "text-xs" : "text-sm"} text-primaryWhiteHex`}>
                    {data.size}
                  </Text>
                </View>
                <View className='flex-row-reverse items-center gap-2'>
                  <Text className="text-primaryOrangeHex text-md">
                    {data.currency}
                  </Text>
                  <Text className="text-lg text-primaryWhiteHex">
                    {data.price}
                  </Text>
                </View>
                <View className='flex-row-reverse items-center gap-2'>
                  <IconButton
                    icon='add'
                    onPress={() => props.incrementItem(props.id, data.size)}
                  />
                  <View className="border-primaryOrangeHex py-1 px-6 border-[1px] rounded-[10px] mx-3" style={{ height: 33, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className="text-primaryWhiteHex" style={{ fontSize: data.quantity > 9 ? 12 : 16 }}>
                      {data.quantity}
                    </Text>
                  </View>
                  <IconButton
                    icon='minus'
                    onPress={() => props.decrementItem(props.id, data.size)}
                  />
                </View>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={["#252A32", "#0C0F14"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flexDirection: "row-reverse", padding: 15, borderRadius: 25 }}
        >
          <View className='flex-1 flex-row-reverse gap-4'>
            <Image
              source={props.imagelink_square}
              className='w-[150px] h-[150px] rounded-[25px]'
            />
            <View className='flex-1 self-stretch justify-around'>
              <View>
                <Text className='text-white font-SemiBold text-lg text-right'>
                  {props.name}
                </Text>
                <Text className='text-white font-Regular text-xs text-right'>
                  {props.special_ingredient}
                </Text>
              </View>

              {props.prices.map((data: any, index: number) => (
                <View key={`${props.id}-${data.size}-${index}`}>
                  <View className='flex-row-reverse'>
                    <View className='flex-row-reverse gap-3 my-1 items-center'>
                      <View className='bg-primaryBlackHex h-11 w-[90px] items-center justify-center rounded-[10px]'>
                        <Text className={`${data.type === "Bean" ? "text-xs" : "text-base"} text-primaryWhiteHex`}>
                          {data.size}
                        </Text>
                      </View>
                      <View className='mx-3'>
                      <View className='flex-row'>
                        <Text className='text-primaryWhiteHex text-lg'>
                          {data.price}
                        </Text>
                        <Text className='text-primaryOrangeHex text-xl ml-1'>{data.currency}</Text>
                      </View>
                    </View>
                    </View>
                  </View>
                  <View className='flex-row-reverse my-2'>
                    <IconButton
                      onPress={() => props.incrementItem(props.id, data.size)}
                      icon="add"
                      size={10}
                    />
                  <View className="border-primaryOrangeHex py-1 px-6 border-[1px] rounded-[10px] mx-5" style={{ height: 33, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Text className="text-primaryWhiteHex" style={{ fontSize: data.quantity > 9 ? 12 : 16 }}>
                      {data.quantity}
                    </Text>
                  </View>
                    <IconButton
                      onPress={() => props.decrementItem(props.id, data.size)}
                      icon="minus"
                      size={10}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;