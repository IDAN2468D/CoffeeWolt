import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const useFavorite = () => {
    const FavoritesList = useStore((state: any) => state.FavoritesList);
    const BottomTabBarHeight = useBottomTabBarHeight();
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

    const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

  return {
    ToggleFavourite,
    FavoritesList,
    BottomTabBarHeight,
  }
}

export default useFavorite;