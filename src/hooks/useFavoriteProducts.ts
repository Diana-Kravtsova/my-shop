import { useAppStore } from "@/lib/store";

export const useFavoriteProducts = () => {
    const products = useAppStore(state => state.favorites);
    
    return { 
        products, 
        isLoading: false 
    };
}
