import React from 'react';
import { StatusBar, Text, View,ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import useItemDetails from '../hooks/useItemDetails';
import {ImageBackgroundInfo, PaymentFooter} from '../components/index';
import { DetailsScreenProps } from '../types/RootStackParamList';

function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { 
    item,
    price,
    fullDesc,
    backHeader,
    toggleFavorite,
    setFullDesc,
    setPrice,
    addToCardHeader,
  } = useItemDetails({ route, navigation });

  return (
    <View className="flex-1 bg-primaryBlackHex">
      <ScrollView showsVerticalScrollIndicator={false} className='flex-grow'>
        <StatusBar backgroundColor="#0C0F14" />
          <ImageBackgroundInfo
              EnableBackHandler={true}
              imagelink_portrait={item.imagelink_portrait}
              type={item.type}
              id={item.id}
              favorite={item.favourite}
              name={item.name}
              special_ingredient={item.special_ingredient}
              ingredients={item.ingredients}
              average_rating={item.average_rating}
              ratings_count={item.ratings_count}
              roasted={item.roasted}
              BackHandler={backHeader}
              ToggleFavorite={toggleFavorite}
            />
          <View className='p-[20px]'>
            <Text style={{textAlign: "right"}}  className='font-SemiBold text-base text-primaryWhiteHex mb-[15px]'>Description</Text>
            {fullDesc ? (
              <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
                  <Text 
                      style={{textAlign: "right"}}
                      className='text-sm text-primaryWhiteHex mb-[30px] tracking-widest'
                    >
                      {item.description}
                  </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
                  <Text 
                      numberOfLines={3} 
                      style={{textAlign: "right"}}
                      className='text-sm text-primaryWhiteHex mb-[30px] tracking-widest'
                   >
                      {item.description}
                  </Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={{textAlign: "right"}}  className='font-SemiBold text-base text-primaryWhiteHex mb-[15px]'>Size</Text>
            <View className='flex flex-row-reverse justify-between gap-5'>
            {item.prices.map((data: any) => {
                const isSelected = data.size === price.size;
                const textSizeClass = item.type === "bean" ? 'text-sm' : 'text-base';
                const borderColorClass = isSelected ? 'border-primaryOrangeHex' : 'border-primaryDarkGreyHex';
                const SizeBox = "flex-1 bg-primaryDarkGrayHex items-center justify-center h-[45px] rounded-[10px] border-2";
                return (
                  <TouchableOpacity 
                    key={data.size} 
                    className={`${SizeBox} ${borderColorClass}`} 
                    onPress={() =>  setPrice(data)} 
                  >
                    <Text className={`${textSizeClass} text-primaryWhiteHex`}>
                      {data.size}
                    </Text>
                  </TouchableOpacity>
                );
            })}
            </View>
          </View>
          <PaymentFooter 
            price={price} 
            buttonTitle="Add to Cart" 
            currency={"$"} 
            buttonPressHandler={addToCardHeader} 
            disabled={false}
          />
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;
