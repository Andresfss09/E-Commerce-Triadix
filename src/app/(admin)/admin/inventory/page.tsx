import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { 
  Plus, 
  Edit2, 
  ExternalLink, 
  Package, 
  Layers, 
  AlertTriangle, 
  Sparkles,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    include: { 
      category: true, 
      variants: true,
      images: {
        orderBy: { order: 'asc' },
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;
  const totalUnits = products.reduce(
    (acc, p) => acc + p.variants.reduce((vAcc, v) => vAcc + v.stock, 0),
    0
  );
  const outOfStockCount = products.filter(
    p => p.variants.reduce((vAcc, v) => vAcc + v.stock, 0) === 0
  ).length;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Package className="w-3.5 h-3.5 text-zinc-300" />
            <span>Control de Stock · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white font-heading">
            Inventario
          </h1>
          <p className="text-zinc-500 font-mono text-xs">
            Gestiona el catálogo de prendas, imágenes, precios y existencias por variante
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/admin/inventory/new" 
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 font-mono font-bold tracking-wider uppercase text-xs hover:bg-zinc-200 transition-all rounded-xl shadow-lg group"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo Producto</span>
          </Link>
        </div>
      </header>

      {/* Mini Inventory Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Total Diseños</span>
          <p className="text-2xl font-black font-mono text-white">{totalProducts}</p>
          <p className="text-[11px] font-mono text-zinc-500">{activeProducts} visibles en tienda</p>
        </div>

        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Unidades Físicas</span>
          <p className="text-2xl font-black font-mono text-white">{totalUnits}</p>
          <p className="text-[11px] font-mono text-zinc-500">En taller de Cali</p>
        </div>

        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Estado Catálogo</span>
          <p className="text-2xl font-black font-mono text-emerald-400">
            {Math.round((activeProducts / (totalProducts || 1)) * 100)}%
          </p>
          <p className="text-[11px] font-mono text-zinc-500">Disponibilidad activa</p>
        </div>

        <div className={`p-5 bg-zinc-950/70 border ${outOfStockCount > 0 ? 'border-amber-500/30' : 'border-zinc-900'} rounded-2xl space-y-1.5 backdrop-blur-sm`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Sin Stock</span>
          <p className={`text-2xl font-black font-mono ${outOfStockCount > 0 ? 'text-amber-400' : 'text-zinc-400'}`}>
            {outOfStockCount}
          </p>
          <p className="text-[11px] font-mono text-zinc-500">
            {outOfStockCount > 0 ? 'Prendas agotadas' : 'Catálogo abastecido'}
          </p>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="bg-zinc-950/70 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-400">
            <thead className="bg-zinc-900/40 border-b border-zinc-900 text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              <tr>
                <th className="px-6 py-4">Prenda / Diseño</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio Base</th>
                <th className="px-6 py-4">Stock & Variantes</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 font-mono text-xs">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-zinc-500 font-mono text-xs">
                    No hay productos registrados en el inventario. Haz clic en "Nuevo Producto" para comenzar.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                  const firstImage = product.images[0]?.url;

                  return (
                    <tr key={product.id} className="hover:bg-zinc-900/30 transition-colors group">
                      {/* Product Thumbnail & Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-14 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shrink-0 group-hover:border-zinc-700 transition-colors">
                            {firstImage ? (
                              <img 
                                src={firstImage} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-sm text-white block truncate">
                                {product.name}
                              </span>
                              {product.isFeatured && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono uppercase text-amber-300">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Drop</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-500 block truncate font-mono">
                              /catalog/{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300 font-mono uppercase">
                          {product.category?.name || 'General'}
                        </span>
                      </td>

                      {/* Base Price */}
                      <td className="px-6 py-4 font-mono font-bold text-white text-xs">
                        ${Number(product.basePrice).toLocaleString('es-CO')}
                        <span className="text-[10px] text-zinc-500 font-normal ml-1">COP</span>
                      </td>

                      {/* Stock & Variant chips */}
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold border ${
                            totalStock === 0 
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                              : totalStock <= 5 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}>
                            {totalStock === 0 ? 'Agotado' : `${totalStock} UDS TOTAL`}
                          </span>

                          {/* Individual Variant Tags */}
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {product.variants.map((v) => (
                              <span 
                                key={v.id} 
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                                  v.stock === 0 
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                                    : v.stock <= 3 
                                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-800'
                                }`}
                              >
                                <span>{v.size}{v.color && v.color !== 'Negro' && v.color !== 'Black' ? `·${v.color}` : ''}:</span>
                                <strong className="font-bold">{v.stock}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {product.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Activo</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            <span>Inactivo</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link 
                            href={`/product/${product.slug}`} 
                            target="_blank"
                            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                            title="Ver en tienda pública"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link 
                            href={`/admin/inventory/${product.id}`} 
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-black bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white transition-all py-1.5 px-3 rounded-lg font-mono font-medium"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Editar</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
