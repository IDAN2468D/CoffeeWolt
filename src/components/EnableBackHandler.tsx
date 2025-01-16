import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBgIcon from './GradientBgIcon';

const EnableBackHandler = (props: any) => {
    return (
      <View>
        {props.EnableBackHandler ? (
          <View className="p-[30px] flex-row-reverse justify-between">
            <TouchableOpacity activeOpacity={0.5} onPress={props.BackHandler}>
              <GradientBgIcon name="left" size={16} color="#52555A" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={props.ToggleFavorite}>
              <GradientBgIcon
                name="like"
                size={props.size}
                color={props.color}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View className='p-[30px] flex-row justify-start'>
            <TouchableOpacity activeOpacity={0.5} onPress={props.ToggleFavorite}>
              <GradientBgIcon
                name="like"
                size={props.size}
                color={props.color}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
    
export default EnableBackHandler;