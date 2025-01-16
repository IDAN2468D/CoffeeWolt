interface UseCartActionsProps {
    incrementItem: (id: string, size: string) => void;
    decrementItem: (id: string, size: string) => void;
    CartList: any;
    CartPrice: number;
    tabBarHeight: number;
}
