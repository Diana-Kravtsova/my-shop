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
        const favoriteProducts = allProducts.filter((product) => favorites.includes(product.id));
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
      <div className="py-16 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border p-4">
            <div className="mb-4 h-48 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-6 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Favorites</h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          You haven&apos;t added any items to favorites yet
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Favorites <span className="ml-2 text-xl text-gray-500">({products.length})</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
