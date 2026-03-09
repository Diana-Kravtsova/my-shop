"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore, type Product } from "@/lib/store";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, HeartOff, Loader2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFav = isFavorite(product.id);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="bg-muted relative block h-48">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}
        {!imageError ? (
          <Image
            src={product.thumbnail || product.images?.[0] || ""}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-contain p-4 transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        ) : (
          <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
            No image
          </div>
        )}
      </Link>

      <CardHeader className="p-4 pb-0">
        <Link href={`/product/${product.id}`}>
          <h3 className="hover:text-primary line-clamp-2 font-semibold transition-colors">
            {product.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${product.price.toFixed(2)}
          </span>
          <Badge variant="outline" className="gap-1">
            <span className="text-yellow-500">★</span>
            <span>{product.rating}</span>
            <span className="text-muted-foreground text-xs">({product.reviews?.length || 0})</span>
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0">
        <Button
          onClick={() => toggleFavorite(product.id)}
          variant={isMounted && isFav ? "destructive" : "secondary"}
          className="w-full gap-2"
          aria-label={isMounted && isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isMounted && isFav ? (
            <HeartOff className="h-5 w-5" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
          <span>
            {isLoading
              ? "Processing..."
              : isMounted && isFav
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
