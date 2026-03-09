import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAllProducts } from "@/lib/api";
import ProductList from "@/components/ProductList";

export const dynamic = "force-static";
export const revalidate = 3600; // every hour

async function ProductGrid() {
  const data = await getAllProducts();

  return <ProductList initialProducts={data.products} initialTotal={data.total} />;
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Our Products
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
          Browse through our collection of amazing products at great prices
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <ProductGrid />
      </Suspense>
    </div>
  );
}
