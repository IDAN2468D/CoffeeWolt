export interface FavoritesItemCardProps {
    id: string;
    imagelink_square: string;
    name: string;
    special_ingredient: string;
    type: string;
    ingredients: string[];
    average_rating: number;
    ratings_count: number;
    roasted: string;
    description: string;
    favourite: boolean;
    ToggleFavouriteItem: any;
}