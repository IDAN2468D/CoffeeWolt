import {useState} from 'react';
import { useStore } from '../store/store';

export const useItemDetails = ({ route, navigation }: any) => {
  const { type, index } = route.params;
  const itemList = useStore((state: any) => (type === "Coffee" ? state.CoffeeList : state.BeanList));
  const  item = itemList[index];
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const [price, setPrice] = useState(item.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);


  const toggleFavorite = (favourite: boolean) => {
    favourite ? deleteFromFavoriteList(type, item.id) : addToFavoriteList(type, item.id);
};
 
  const backHeader = () => {
    navigation.pop();
  }

  const addToCardHeader = () => {
    addToCart({ ...item, prices: [{ ...price, quantity: 1 }] });
    calculateCartPrice();
    navigation.navigate("Tabs", { screen: "Cart" });
  }
  
  return {
    item,
    price,
    setPrice,
    fullDesc,
    setFullDesc,
    backHeader,
    toggleFavorite,
    addToCardHeader,
  }
}

export default useItemDetails