import { Suspense } from "react";
import { ProductList } from "@/components/ProductList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getAllProducts } from "@/lib/api";

const ProductGrid = async () => {
  const { products, total } = await getAllProducts(20, 0);
  return <ProductList initialProducts={products} initialTotal={total} />;
};

const HomePage = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 border-b pb-8">
        <h1 className="text-4xl font-black tracking-tight">Our Collection</h1>
        <p className="text-muted-foreground text-lg">
          Discover our latest arrivals and premium selection
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
};

export default HomePage;
