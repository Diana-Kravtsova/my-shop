"use client";

import { useAppStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";

const FavoritesList = () => {
  const { products, isLoading } = useFavoriteProducts();
  const favorites = useAppStore(state => state.favorites);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-zinc-50/50 p-12 text-center dark:bg-zinc-900/50">
        <div className="mb-6 rounded-full bg-zinc-100 p-8 dark:bg-zinc-800">
          <Heart className="h-16 w-16 text-zinc-300 dark:text-zinc-700" />
        </div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight">Your wishlist is empty</h2>
        <p className="mb-8 max-w-sm text-lg text-zinc-500">
          Save items you love here and they'll be waiting for you when you're ready to buy.
        </p>
        <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
          <Link href="/" className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const FavoritesPage = () => {
  const { clearFavorites, favorites } = useAppStore();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-black tracking-tight">Favorites</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Items you've saved while browsing our store
          </p>
        </div>
        {favorites.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={clearFavorites}
            className="w-full gap-2 sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPage;
