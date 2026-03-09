import { use } from "react";
import { useAppStore } from "@/lib/store";
import { getAllProducts } from "@/lib/api";
import type { Product } from "@/lib/store";

const allProductsPromise = getAllProducts();

export function useFavoriteProducts(): Product[] {
    const favorites = useAppStore((state) => state.favorites);
    const allProducts = use(allProductsPromise);

    return allProducts.filter((p) => favorites.includes(p.id));
}
