"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore, type Product } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";

export default function FavoritesPage() {
  const { favorites } = useAppStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchFavoriteProducts() {
      if (!isMounted) return;

      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const allProducts = await getAllProducts();
        const favoriteProducts = allProducts.filter(product =>
          favorites.includes(product.id)
        );
        setProducts(favoriteProducts);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavoriteProducts();
  }, [favorites, isMounted]);

  if (!isMounted) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You haven&apos;t added any items to favorites yet
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Favorites <span className="text-gray-500 text-xl ml-2">({products.length})</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
