export interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: string;
    type: string;
    id: string | number;
    favorite: boolean;
    special_ingredient: string;
    name: string;
    ingredients?: string[];
    average_rating?: number;
    roasted?: string;
    ratings_count?: number;
    BackHandler: () => void;
    ToggleFavorite: (favorite: boolean, type: string, id: string | number) => void;
  }  