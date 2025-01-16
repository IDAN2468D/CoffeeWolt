import React from 'react';
import { ImageBackground, ImageProps, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CoffeeCardProps } from '../types/CoffeeCard';
import CustomIcon from './CustomIcon';
import BgIcon from './BgIcon';

const CoffeeCard = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}: CoffeeCardProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#252A32', '#0C0F14']}
      style={{ borderRadius: 25, padding: 10, overflow: 'hidden' }}
    >
      <ImageBackground
        className="h-cardHeight w-cardWidth rounded-[20px] overflow-hidden mb-[15px]"
        source={imagelink_square}
        resizeMode="cover"
      >
        <View className="flex-row-reverse bg-primaryBlackRGBA items-center rounded-br-lg rounded-bl-lg mx-5 justify-center gap-1">
          <CustomIcon style={{ color: '#D17842' }} name="star" />
          <Text className="font-SemiBold text-[16px] pb-1 leading-[22px] text-primaryWhiteHex">{average_rating}</Text>
        </View>
      </ImageBackground>
      <View className="items-end">
        <Text className="text-primaryWhiteHex text-base font-Black">{name}</Text>
        <Text className="text-primaryWhiteHex text-[10px] font-Regular">
          {special_ingredient}
        </Text>
      </View>
      <View className="flex-row-reverse items-center justify-between mt-[15px]">
        <View className='flex-row-reverse items-end gap-2'>
          <Text className="text-primaryOrangeHex text-md">{price.currency}</Text>
          <Text className="font-SemiBold text-lg text-primaryWhiteHex">{price.price}</Text>
        </View>
        <TouchableOpacity
          className="flex-row-reverse items-end"
          onPress={() =>
            buttonPressHandler({
              id,
              index,
              name,
              roasted,
              imagelink_square,
              special_ingredient,
              type,
              prices: [{ ...price, quantity: 1 }],
            })
          }
        >
          <BgIcon color="bg-primaryOrangeHex" size="h-[30px] w-[30px]" name="add" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;
