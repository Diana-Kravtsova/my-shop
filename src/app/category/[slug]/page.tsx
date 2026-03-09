import { Suspense } from "react";
import { notFound } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getProductsByCategory, getAllCategories } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map(slug => ({ slug }));
}

import ProductList from "@/components/ProductList";

async function CategoryProductGrid({ slug }: { slug: string }) {
  const data = await getProductsByCategory(slug);

  if (!data.products || data.products.length === 0) {
    notFound();
  }

  return <ProductList initialProducts={data.products} initialTotal={data.total} category={slug} />;
}

function formatCategory(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          {formatCategory(slug)}
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
          Browse all products in the {formatCategory(slug)} category
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <CategoryProductGrid slug={slug} />
      </Suspense>
    </div>
  );
}
