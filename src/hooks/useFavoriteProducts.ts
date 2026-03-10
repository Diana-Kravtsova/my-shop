import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { getProductById } from "@/lib/api";
import type { Product } from "@/lib/store";

export const useFavoriteProducts = () => {
    const favorites = useAppStore(state => state.favorites);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!favorites.length) return setProducts([]);

        setIsLoading(true);
        Promise.all(favorites.map(id => getProductById(id)))
            .then(setProducts)
            .finally(() => setIsLoading(false));
    }, [favorites]);

    return { products, isLoading };
}
