import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import ClientProductActions from "./ClientProductActions";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product?.title || "Product not found",
    description: product?.description || "Product details page",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 bg-white dark:bg-gray-800 rounded-lg p-8 border">
            <Image
              src={product.images?.[0] || product.thumbnail || ""}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <span className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                {product.category}
              </span>
            </div>

            <ClientProductActions productId={product.id} />
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
