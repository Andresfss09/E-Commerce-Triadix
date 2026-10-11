import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SlidersHorizontal, Check, X } from 'lucide-react';
import { CatalogSort } from '@/components/storefront/CatalogSort';

export const metadata = {
  title: 'Catálogo de Streetwear | TRIADIX',
  description: 'Explora nuestra colección completa de camisetas oversize, chaquetas térmicas, joggers y pantalones de moda urbana.',
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const categorySlug = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const sortParam = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'newest';
  const sizeParam = typeof resolvedParams.size === 'string' ? resolvedParams.size : undefined;

  // Build Prisma where filter
  const whereClause: any = {
    isActive: true,
  };

  if (categorySlug) {
    whereClause.category = { slug: categorySlug };
  }

  if (sizeParam) {
    whereClause.variants = {
      some: {
        size: sizeParam,
        stock: { gt: 0 }
      }
    };
  }

  // Build Prisma orderBy
  let orderByClause: any = { createdAt: 'desc' };
  if (sortParam === 'price-asc') {
    orderByClause = { basePrice: 'asc' };
  } else if (sortParam === 'price-desc') {
    orderByClause = { basePrice: 'desc' };
  }

  const [products, categories, totalAllProducts] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { 
        images: { orderBy: { order: 'asc' } }, 
        category: true, 
        variants: true 
      },
      orderBy: orderByClause,
    }),
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: { where: { isActive: true } } }
        }
      }
    }),
    prisma.product.count({ where: { isActive: true } })
  ]);

  const hasActiveFilters = Boolean(categorySlug || sizeParam || (sortParam && sortParam !== 'newest'));

  return (
    <div className="bg-background min-h-screen text-foreground pb-24 selection:bg-white selection:text-black">
      {/* Editorial Header */}
      <section className="border-b border-zinc-900 bg-zinc-950/40 py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <span>TRIADIX STUDIO</span>
            <span>/</span>
            <span className="text-zinc-300">DROP EXCLUSIVO 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Catálogo Oficial
          </h1>
          
          <p className="text-zinc-400 font-sans max-w-2xl text-sm md:text-base font-light leading-relaxed">
            Prendas de silueta contemporánea, alto gramaje y confección artesanal colombiana. Diseñadas para resistir el paso del tiempo y destacar en las calles.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-10">
        {/* Filter & Control Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <Link
              href={`/catalog${sortParam !== 'newest' ? `?sort=${sortParam}` : ''}`}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                !categorySlug
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-900 hover:border-zinc-700'
              }`}
            >
              Todas ({totalAllProducts})
            </Link>
            
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.slug}${sortParam !== 'newest' ? `&sort=${sortParam}` : ''}${sizeParam ? `&size=${sizeParam}` : ''}`}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-900 hover:border-zinc-700'
                }`}
              >
                {cat.name} ({cat._count.products})
              </Link>
            ))}
          </div>

          {/* Right Controls: Sizes & Sort */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* Size Filter Pills */}
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
              <span className="text-[11px] font-mono text-zinc-500 uppercase px-2">Talla:</span>
              {['S', 'M', 'L'].map((sz) => {
                const isSelected = sizeParam === sz;
                const newParams = new URLSearchParams();
                if (categorySlug) newParams.set('category', categorySlug);
                if (sortParam && sortParam !== 'newest') newParams.set('sort', sortParam);
                if (!isSelected) newParams.set('size', sz);

                return (
                  <Link
                    key={sz}
                    href={`/catalog?${newParams.toString()}`}
                    className={`w-7 h-7 flex items-center justify-center rounded text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-white text-black font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {sz}
                  </Link>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <CatalogSort currentSort={sortParam} />

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-rose-400 transition-colors"
                title="Limpiar todos los filtros"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </Link>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-6 flex justify-between items-center text-xs font-mono text-zinc-500">
          <span>Mostrando {products.length} de {totalAllProducts} piezas</span>
          <span className="hidden sm:inline">Despachos express a toda Colombia</span>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-24 text-center space-y-4 border border-zinc-900/60 rounded-2xl bg-zinc-950/20">
            <SlidersHorizontal className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">No hay piezas disponibles</h3>
            <p className="text-xs font-mono text-zinc-500 max-w-md mx-auto">
              No encontramos prendas que coincidan con los filtros seleccionados. Intenta restablecer los filtros para ver la colección completa.
            </p>
            <Link
              href="/catalog"
              className="inline-block mt-4 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Ver Toda la Colección
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product) => {
              const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
              const availableSizes = Array.from(new Set(product.variants.filter(v => v.stock > 0).map(v => v.size)));
              const hasMultipleImages = product.images.length > 1;

              return (
                <Link 
                  key={product.id} 
                  href={`/product/${product.slug}`} 
                  className="group block relative space-y-3"
                >
                  {/* Image Container with Crossfade on Hover */}
                  <div className="aspect-[3/4] bg-zinc-950 overflow-hidden relative border border-zinc-900 group-hover:border-zinc-700 transition-all duration-300">
                    {/* Primary Image */}
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className={`object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                          hasMultipleImages ? 'group-hover:opacity-0 transition-opacity' : ''
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-xs font-mono text-zinc-600">
                        SIN IMAGEN
                      </div>
                    )}

                    {/* Secondary Image on Hover */}
                    {hasMultipleImages && (
                      <img
                        src={product.images[1].url}
                        alt={`${product.name} vista 2`}
                        className="object-cover w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Top Status Pill */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {totalStock === 0 ? (
                        <span className="px-2.5 py-1 bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-mono uppercase tracking-widest font-semibold backdrop-blur-md">
                          Agotado
                        </span>
                      ) : totalStock <= 5 ? (
                        <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono uppercase tracking-widest font-semibold backdrop-blur-md">
                          Últimas {totalStock} Uds
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-zinc-950/80 border border-zinc-800 text-zinc-300 text-[10px] font-mono uppercase tracking-widest font-medium backdrop-blur-md">
                          Drop Exclusivo
                        </span>
                      )}
                    </div>

                    {/* Bottom Sizes Hover Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Tallas Disp:</span>
                      <div className="flex gap-1">
                        {['S', 'M', 'L'].map((sz) => {
                          const isInStock = availableSizes.includes(sz);
                          return (
                            <span
                              key={sz}
                              className={`w-5 h-5 flex items-center justify-center text-[10px] font-mono border rounded ${
                                isInStock
                                  ? 'border-zinc-600 text-white bg-black/60'
                                  : 'border-zinc-800 text-zinc-600 line-through'
                              }`}
                            >
                              {sz}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                      <span>{product.category.name}</span>
                      <span className="text-zinc-600">EDICIÓN 01</span>
                    </div>

                    <h3 className="font-sans font-bold text-base text-zinc-200 group-hover:text-white transition-colors tracking-tight line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="font-mono text-sm font-semibold text-white">
                      ${Number(product.basePrice).toLocaleString('es-CO')}
                      <span className="text-zinc-500 text-[11px] font-normal ml-1">COP</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
