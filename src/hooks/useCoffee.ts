import { useReducer, useRef, useCallback } from 'react';
import { ToastAndroid, ScrollView, FlatList } from 'react-native';
import CoffeeData from '../data/CoffeeData';
import { useStore } from '../store/store';
import { debounce } from 'lodash';

interface CoffeeState {
  categories: string[];
  filteredCategories: string[];
  searchText: string;
  categoryIndex: { index: number; category: string };
  sortedCoffee: any[];
  CoffeeList: any[];
}

interface Action {
  type: string;
  payload?: any;
}

const coffeeReducer = (state: CoffeeState, action: Action): CoffeeState => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: getCategoriesFromData(action.payload),
        filteredCategories: getCategoriesFromData(action.payload),
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload,
        filteredCategories: filterCategories(state.categories, action.payload),
      };
    case 'SET_CATEGORY_INDEX':
      return {
        ...state,
        categoryIndex: action.payload,
        sortedCoffee: getCoffeeList(action.payload.category, state.CoffeeList),
      };
    case 'SET_COFFEE_LIST':
      return {
        ...state,
        CoffeeList: action.payload,
        sortedCoffee: getCoffeeList(state.categoryIndex.category, action.payload),
      };
    case 'SET_SORTED_COFFEE':
      return {
        ...state,
        sortedCoffee: action.payload,
      };
    default:
      return state;
  }
};

const getCategoriesFromData = (data: any[]): string[] => {
  let temp: Record<string, number> = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const filterCategories = (categories: string[], searchText: string): string[] => {
  return categories.filter((category) =>
    category.toLowerCase().includes(searchText.toLowerCase())
  );
};

const getCoffeeList = (category: string, data: any[]): any[] => {
  if (category === 'All') {
    return data;
  } else {
    return data.filter((item) => item.name === category);
  }
};

const useCoffee = (CoffeeList: any[]) => {
  const initialState: CoffeeState = {
    categories: getCategoriesFromData(CoffeeData),
    filteredCategories: getCategoriesFromData(CoffeeData),
    searchText: '',
    categoryIndex: {
      index: 0,
      category: 'All',
    },
    sortedCoffee: CoffeeList,
    CoffeeList,
  };

  const [state, dispatch] = useReducer(coffeeReducer, initialState);
  const scrollViewRef = useRef<FlatList<any>>(null);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const setCategories = (data: any[]) => dispatch({ type: 'SET_CATEGORIES', payload: data });
  const setSearchText = (text: string) => dispatch({ type: 'SET_SEARCH_TEXT', payload: text });
  const setCategoryIndex = (index: { index: number; category: string }) =>
    dispatch({ type: 'SET_CATEGORY_INDEX', payload: index });
  const setCoffeeList = (list: any[]) => dispatch({ type: 'SET_COFFEE_LIST', payload: list });
  const setSortedCoffee = (list: any[]) => dispatch({ type: 'SET_SORTED_COFFEE', payload: list });

  const handleCategoryPress = useCallback(
    (index: number) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToIndex({ index: 0, animated: true });
      }
      const selectedCategory = state.filteredCategories[index];
      setCategoryIndex({
        index: index,
        category: selectedCategory,
      });
      const newSortedCoffee = getCoffeeList(selectedCategory, state.CoffeeList);
      setSortedCoffee(newSortedCoffee);
    },
    [state.filteredCategories, state.CoffeeList]
  );
  
  const debouncedSearchCoffee = useCallback(
    debounce((search: string) => {
      if (search !== '') {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToIndex({ index: 0, animated: true });
        }
        setCategoryIndex({
          index: 0,
          category: state.filteredCategories[0],
        });
        setSortedCoffee(
          state.CoffeeList.filter((item: any) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, 300),
    [state.filteredCategories, state.CoffeeList]
  );
  
  const resetSearchCoffee = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToIndex({ index: 0, animated: true });
    }
    setCategoryIndex({
      index: 0,
      category: state.filteredCategories[0],
    });
    setSortedCoffee([...state.CoffeeList]);
    setSearchText('');
  };
  
  const CoffeeCartAddCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return {
    ...state,
    scrollViewRef,
    setCategories,
    setSearchText,
    setCategoryIndex,
    setCoffeeList,
    setSortedCoffee,
    handleCategoryPress,
    debouncedSearchCoffee,
    resetSearchCoffee,
    CoffeeCartAddCart,
  };
};

export default useCoffee;