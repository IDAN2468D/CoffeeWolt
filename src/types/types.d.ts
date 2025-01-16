import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define your navigation params
export type AppParamList = {
  Home: CoffeeCardProps; // Define props for the 'Home' screen
  // Other screens...
};

// Define the props for your navigation screen
export type HomeScreenNavigationProp = BottomTabNavigationProp<AppParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<AppParamList, 'Home'>;

// Define the combined props
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}
