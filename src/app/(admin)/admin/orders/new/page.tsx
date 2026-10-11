import { prisma } from '@/lib/prisma';
import { OrderForm } from '@/components/admin/OrderForm';

export default async function NewOrderPage() {
  const productsRaw = await prisma.product.findMany({
    include: { variants: true },
    where: { isActive: true }
  });

  const products = productsRaw.map(product => ({
    ...product,
    basePrice: Number(product.basePrice)
  }));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Crear Pedido Manual</h1>
        <p className="text-zinc-400 font-mono text-sm">Registra una compra procesada por WhatsApp</p>
      </header>

      <OrderForm products={products} />
    </div>
  );
}

