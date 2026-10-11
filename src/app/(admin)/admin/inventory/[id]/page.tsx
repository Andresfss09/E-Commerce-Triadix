import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Editar Producto</h1>
          <p className="text-zinc-400 font-mono text-sm">Modifica los detalles de {product.name}</p>
        </div>
        <DeleteProductButton productId={product.id} />
      </header>
      
      <ProductForm 
        categories={categories} 
        initialData={{
          ...product,
          basePrice: Number(product.basePrice)
        }} 
      />
    </div>
  );
}

