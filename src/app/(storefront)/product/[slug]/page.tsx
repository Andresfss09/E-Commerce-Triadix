import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { AddToCart } from '@/components/storefront/AddToCart';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, variants: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Images */}
        <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden relative">
          {product.images[0] ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">Sin imagen</div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4 md:pt-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-medium mb-6">
            ${Number(product.basePrice).toLocaleString('es-CO')}
          </p>

          <div className="prose prose-sm mb-8 text-muted-foreground">
            <p>{product.description}</p>
          </div>

          {/* Client Component for selection and cart */}
          <AddToCart
            product={{
              id: product.id,
              name: product.name,
              basePrice: Number(product.basePrice),
              image: product.images[0]?.url || '',
            }}
            variants={product.variants.map(v => ({
              size: v.size,
              color: v.color,
              stock: v.stock,
              id: v.id,
              sku: v.sku || ''
            }))}
          />
        </div>
      </div>
    </div>
  );
}

