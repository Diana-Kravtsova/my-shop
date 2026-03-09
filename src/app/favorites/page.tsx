"use client";

import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

function FavoritesSkeleton() {
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

function FavoritesList() {
  const { products, isLoading } = useFavoriteProducts();
  const clearFavorites = useAppStore(state => state.clearFavorites);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Favorites</h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">You haven&apos;t added any items to favorites yet</p>
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
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">
          Favorites <span className="text-muted-foreground ml-2 text-xl font-normal">({products.length})</span>
        </h1>
        <Button variant="destructive" size="sm" onClick={clearFavorites} className="w-full gap-2 sm:w-auto">
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<FavoritesSkeleton />}>
      <FavoritesList />
    </Suspense>
  );
}
