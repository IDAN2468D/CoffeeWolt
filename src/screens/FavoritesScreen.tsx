import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import useFavorite from '../hooks/useFavorite';
import { EmptyListAnimation, FavoritesItemCard, HeaderBar } from '../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';  


const FavoritesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

  const {
    ToggleFavourite,
    FavoritesList,
    BottomTabBarHeight,
  } = useFavorite();
  console.log(FavoritesList);
  
  return (
    <View className='flex-1 bg-primaryBlackHex'>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
      <HeaderBar title="Favorites" />
        <View
          style={{ marginBottom: BottomTabBarHeight }}
          className={"flex-1 justify-between"}
        >
          <View className='flex-1'>
            {FavoritesList.length == 0 ? (
                <EmptyListAnimation title='No Favorites'/>
              ) : (
                <View className='px-5 gap-5'>
                  {FavoritesList.map((item: any) => (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={item.id}
                      onPress={() => { 
                        navigation.push("Details", { 
                          index: item.index,
                          id: item.id,
                          type: item.type,
                        }) 
                      }}
                    >
                      <FavoritesItemCard
                        id={item.id}
                        imagelink_portrait={item.imagelink_portrait}
                        name={item.name}
                        special_ingredient={item.special_ingredient}
                        type={item.type}
                        ingredients={item.ingredients}
                        average_rating={item.average_rating}
                        ratings_count={item.ratings_count}
                        roasted={item.roasted}
                        description={item.description}
                        favourite={item.favourite}
                        ToggleFavouriteItem={ToggleFavourite}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
