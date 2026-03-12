import { getProductsByCategory, getAllCategories } from '@/lib/api';
import { ProductList } from '@/components/ProductList';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const categories = await getAllCategories();
  return categories.map(slug => ({
    slug,
  }));
};

const CategoryPage = async ({params}: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  const categories = await getAllCategories();

  if (!categories.includes(slug)) {
    notFound();
  }

  const {products, total} = await getProductsByCategory(slug, 20, 0);

  const formatTitle = (s: string) =>
    s
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b pb-8">
        <h1 className="text-4xl font-black tracking-tight">{formatTitle(slug)}</h1>
        <p className="text-muted-foreground text-lg">
          Browse our selection of products in {formatTitle(slug)}
        </p>
      </div>

      <ProductList initialProducts={products} initialTotal={total} category={slug}/>
    </div>
  );
};

export default CategoryPage;
