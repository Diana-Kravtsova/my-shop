import { getProductById, getAllProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ClientProductActions } from './ClientProductActions';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const generateStaticParams = async () => {
  const {products} = await getAllProducts(100, 0);
  return products.map(product => ({
    id: String(product.id),
  }));
};

const ProductPage = async ({params}: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const images = product.images || [product.thumbnail || ''];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative w-full">
          <Carousel className="w-full">
            <div className="bg-zinc-50 dark:bg-zinc-900 overflow-hidden rounded-3xl border shadow-inner">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="relative aspect-square w-full">
                    <Image
                      src={img}
                      alt={`${product.title} image ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-8"
                      draggable={false}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            {images.length > 1 && (
              <>
                <CarouselPrevious
                  className="left-4 h-10 w-10 border-none bg-white/50 backdrop-blur-md transition-opacity hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80"/>
                <CarouselNext
                  className="right-4 h-10 w-10 border-none bg-white/50 backdrop-blur-md transition-opacity hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80"/>
              </>
            )}
          </Carousel>
        </div>

        <div className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="outline"
                   className="from-primary/10 to-primary/5 bg-gradient-to-r px-3 py-1 text-sm font-semibold capitalize">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-yellow-500">★</span>
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground text-sm">({product.reviews?.length} reviews)</span>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight">{product.title}</h1>
          <p className="text-primary text-3xl font-bold">${product.price.toFixed(2)}</p>

          <Separator className="my-8"/>

          <div className="mb-8 space-y-4">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div
            className="bg-zinc-50 dark:bg-zinc-900 mb-8 grid grid-cols-1 gap-4 rounded-2xl border p-6 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Truck className="text-primary h-5 w-5"/>
              <span className="text-sm font-medium">{product.shippingInformation}</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="text-primary h-5 w-5"/>
              <span className="text-sm font-medium">{product.returnPolicy}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary h-5 w-5"/>
              <span className="text-sm font-medium">{product.warrantyInformation}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-primary h-5 w-5"/>
              <span className="text-sm font-medium">{product.availabilityStatus}</span>
            </div>
          </div>

          <ClientProductActions productId={product.id}/>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
