"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore, type Product } from "@/lib/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <Link href={`/product/${product.id}`} className="block relative h-48 bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
        {!imageError ? (
          <Image
            src={product.image}
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
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <CardHeader className="p-4 pb-0">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 font-semibold hover:text-primary transition-colors">
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
            <span>{product.rating.rate}</span>
            <span className="text-xs text-muted-foreground">({product.rating.count})</span>
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => toggleFavorite(product.id)}
          variant={isMounted && isFav ? "destructive" : "secondary"}
          className="w-full gap-2"
          aria-label={isMounted && isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <span>{isMounted && isFav ? "❤️" : "🤍"}</span>
          {isMounted && isFav ? "In Favorites" : "Add to Favorites"}
        </Button>
      </CardFooter>
    </Card>
  );
}
