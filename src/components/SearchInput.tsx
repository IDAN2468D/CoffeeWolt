import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon';

 interface SearchInputProps   {
    searchText: string;
    setSearchText: (text: string) => void;
    searchCoffee: (search: string) => void;
    resetSearchCoffee: () => void;
}

const SearchInput = ({searchText,setSearchText,searchCoffee,resetSearchCoffee}: SearchInputProps ) => {
    
  return (
    <View className='flex-row-reverse m-[30px] rounded-[20px] bg-primaryDarkGreyHex items-center'>
        <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon 
                name='search'
                size={18}
                color={searchText.length > 0 ? "#D17842" : "#52555A" }
                style={{marginHorizontal: 20}}
            />
        </TouchableOpacity>
            <TextInput 
                placeholder='Find Your Coffee...'
                value={searchText}
                onChangeText={(text) => {setSearchText(text), searchCoffee(text)}}
                placeholderTextColor="#52555A"
                className='flex-1 h-[40px] font-Medium text-sm text-primaryWhiteHex'
            />
        {searchText.length > 0 &&
            <TouchableOpacity onPress={resetSearchCoffee}>
                <CustomIcon 
                    name='close'
                    color={"#52555A"}
                    size={15}
                    style={{marginHorizontal: 20}}
                />
            </TouchableOpacity>
        }
    </View>
  )
}

export default SearchInput;