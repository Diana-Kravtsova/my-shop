"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { type Product } from "@/lib/store";
import { getAllProducts, getProductsByCategory } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface ProductListProps {
  initialProducts: Product[];
  initialTotal: number;
  category?: string;
}

export const ProductList = ({ initialProducts, initialTotal, category }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(initialProducts.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length < initialTotal);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const limit = 20;
      const data = category ? await getProductsByCategory(category, limit, skip) : await getAllProducts(limit, skip);

      setProducts(prev => [...prev, ...data.products]);
      setSkip(prev => prev + data.products.length);
      setHasMore(skip + data.products.length < data.total);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={loadMore} disabled={isLoading} variant="outline" size="lg" className="min-w-[200px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
