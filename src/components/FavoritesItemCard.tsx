import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo'
import LinearGradient from 'react-native-linear-gradient'

const FavoritesItemCard = (props: any) => {
  return (
    <View className='rounded-[25px] overflow-hidden'>
      <ImageBackgroundInfo
          EnableBackHandler={false}
          imagelink_portrait={props.imagelink_portrait}
          type={props.type}
          id={props.id}
          favorite={props.favourite}
          name={props.name}
          special_ingredient={props.special_ingredient}
          ingredients={props.ingredients}
          average_rating={props.average_rating}
          ratings_count={props.ratings_count}
          roasted={props.roasted}
          ToggleFavorite={props.ToggleFavouriteItem}  
          BackHandler={() => {}}         
      />
       <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#252A32", "#0C0F14"]}
          className='gap-[10px] p-5'
        >
          <Text className='font-SemiBold text-base text-primaryLightGreyHex text-right'>Description</Text>
          <Text className='text-sm text-primaryWhiteHex text-right'>{props.description}</Text>
        </LinearGradient>
    </View>
  )
}

export default FavoritesItemCard;