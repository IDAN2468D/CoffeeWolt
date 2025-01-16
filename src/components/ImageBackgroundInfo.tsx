import React, {FC} from 'react';
import { ImageBackground, Text, View } from 'react-native';
import EnableBackHandler from './EnableBackHandler';
import CustomIcon from './CustomIcon';
import { ImageBackgroundInfoProps } from '../types/ImageBackgroundInfoProps';

const ImageBackgroundInfo = (props: ImageBackgroundInfoProps) => {
  return (
    <View>
      <ImageBackground
        source={
          typeof props.imagelink_portrait === 'string'
            ? { uri: props.imagelink_portrait }
            : props.imagelink_portrait
        }
        className="w-full aspect-[20/25] justify-between"
        resizeMode="cover"
      >
        <EnableBackHandler
          EnableBackHandler={props.EnableBackHandler}
          BackHandler={props.BackHandler}
          ToggleFavorite={() => props.ToggleFavorite(props.favorite, props.type, props.id)}
          color={props.favorite ? '#DC3535' : '#52555A'}
          size={16}
        />
        <View className="py-6 px-[30px] bg-primaryBlackRGBA rounded-t-[30px]">
          <View className="justify-between gap-[15px]">
            <View className="flex-row-reverse justify-between items-center">
              <View>
                <Text className="font-SemiBold text-2xl text-primaryWhiteHex">{props.name}</Text>
                <Text className="font-Medium text-xs text-secondaryLightGreyHex">{props.special_ingredient}</Text>
              </View>
              <View className="flex-row-reverse gap-5 items-center">
                <View className="w-[55px] h-[55px] rounded-[10px] bg-primaryBlackHex justify-center items-center">
                  <CustomIcon 
                    name={props.type === "Bean" ? "bean" : "beans"}
                    size={props.type === "Bean" ? 18 : 24}
                    style={{color: "#D17842"}}
                  />
                  <Text className={`text-primaryWhiteHex ${props.type == "Bean" ? "mt-1" : "mt-[2px]"}`}>{props.type}</Text>
                </View>
                <View className="w-[55px] h-[55px] rounded-[10px] bg-primaryBlackHex justify-center items-center">
                  <CustomIcon 
                      name={props.type == "Bean" ? "location" : "drop"}
                      style={{color: "#D17842"}}
                      size={16}
                    />
                    <Text className={"text-[11px] text-primaryWhiteHex mt-1"}>{props.ingredients}</Text>
                </View>
              </View>
            </View>
            <View className='flex-row-reverse justify-between items-center'>
              <View className='flex-row-reverse items-center gap-2'>
                <CustomIcon name='star' color={"#D17842"} size={20} style={{alignSelf: "flex-end"}}/>
                  <Text className="font-SemiBold text-2xl text-primaryWhiteHex">{props.average_rating}</Text>
                  <Text className="font-Regular text-xl text-primaryWhiteHex">({props.ratings_count})</Text>
              </View>
              <View className='w-[130px] h-[55px] rounded-[10px] bg-primaryBlackHex justify-center items-center'>
                <Text className="font-Medium text-[14px] text-primaryWhiteHex">{props.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;