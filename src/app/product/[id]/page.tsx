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
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-96 rounded-lg border bg-white p-8 dark:bg-gray-800">
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
              <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
              <div className="mb-4 flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 dark:bg-yellow-900/20">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">{product.description}</p>
            </div>

            <div>
              <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm capitalize dark:bg-gray-700">
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
