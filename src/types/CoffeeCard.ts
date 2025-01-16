import { ImageProps } from 'react-native';

export interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: {
    currency: string;
    price: number;
  };
  buttonPressHandler: (item: any) => void;
}
