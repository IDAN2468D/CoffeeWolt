import React from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useCoffee from '../hooks/useCoffee';
import { CoffeeCard, HeaderBar } from '../components';
import SearchInput from '../components/SearchInput';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }: any) {
    const CoffeeList = useStore((state: any) => state.CoffeeList || []);
    const BeanList = useStore((state: any) => state.BeanList || []);
    const TabBarHeight = useBottomTabBarHeight();

    const {
        filteredCategories = [],
        searchText,
        scrollViewRef,
        categoryIndex = { index: -1 },
        sortedCoffee = [],
        setSearchText,
        handleCategoryPress,
        debouncedSearchCoffee,
        resetSearchCoffee,
        CoffeeCartAddCart,
    } = useCoffee(CoffeeList);

    const renderCategoryItem = ({ item, index }: { item: string; index: number }) => (
        <View className="px-[15px]">
            <TouchableOpacity className="items-center" onPress={() => handleCategoryPress(index)}>
                <Text
                    className={`font-SemiBold text-base text-primaryLightGreyHex mb-1 text-center 
                        ${categoryIndex.index === index ? 'text-primaryOrangeHex' : ''}`}
                >
                    {item}
                </Text>
                {categoryIndex.index === index && (
                    <View className="h-[10px] w-[10px] rounded-[10px] bg-primaryOrangeHex self-center" />
                )}    
            </TouchableOpacity>
        </View>
    );

    const renderCoffeeItem = ({ item }: { item: any }) => {
        if (!item || !item.prices || !item.prices[2]) {
            console.error('Invalid coffee item:', item);
            return null;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    navigation.push("Details", {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                    });
                }}
                style={{ alignItems: 'center', marginVertical: 20 }}
            >
                <View className="mr-[20px] pl-[5px]">
                    <CoffeeCard
                        id={item.id}
                        index={item.index}
                        type={item.type}
                        roasted={item.roasted}
                        imagelink_square={item.imagelink_square}
                        name={item.name}
                        special_ingredient={item.special_ingredient}
                        average_rating={item.average_rating}
                        price={item.prices[2]}
                        buttonPressHandler={CoffeeCartAddCart}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-primaryBlackHex">
            <StatusBar backgroundColor="#0C0F14" />
            <FlatList
                ref={scrollViewRef}
                ListHeaderComponent={() => (
                    <>
                        <HeaderBar />
                        <Text className="text-[28px] font-SemiBold text-primaryWhiteHex text-center mb-5">
                            Find the best{"\n"}coffee for you
                        </Text>
                        <SearchInput
                            searchText={searchText}
                            setSearchText={setSearchText}
                            searchCoffee={debouncedSearchCoffee}
                            resetSearchCoffee={resetSearchCoffee}
                        />
                        <FlatList
                            data={filteredCategories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderCategoryItem}
                            contentContainerStyle={{
                                flexDirection: 'row-reverse',
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                justifyContent: 'center',
                            }}
                            ListEmptyComponent={
                                <Text className="text-primaryWhiteHex text-center mx-[20px]">
                                    No categories found.
                                </Text>
                            }
                        />
                    </>
                )}
                data={sortedCoffee}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderCoffeeItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
                ListEmptyComponent={() => (
                    <View className="items-center p-[20px]">
                        <LottieView
                            source={require("../lottie/CoffeeEmpty.json")}
                            style={{ width: 100, height: 100 }}
                            autoPlay
                            loop
                        />
                        <Text className="font-SemiBold text-base text-primaryWhiteHex">
                            No coffee available.
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{ marginBottom: TabBarHeight + 10, alignItems: 'center' }}>
                        <Text className="font-Medium text-lg mr-[30px] my-5 text-secondaryLightGreyHex text-center">
                            Coffee Beans
                        </Text>
                        <FlatList
                            data={BeanList}
                            numColumns={2}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderCoffeeItem}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
