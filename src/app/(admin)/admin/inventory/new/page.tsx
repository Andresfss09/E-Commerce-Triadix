import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Nuevo Producto</h1>
        <p className="text-zinc-400 font-mono text-sm">Añade una nueva prenda al catálogo</p>
      </header>

      <ProductForm categories={categories} />
    </div>
  );
}

