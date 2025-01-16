import { ImageProps } from "react-native";

export type CartItemProps = {
    id: number;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    roasted: string;
    prices: any;
    type: string;
    incrementItem: (id: number, size: string) => void; 
    decrementItem: (id: number, size: string) => void;
  }
  