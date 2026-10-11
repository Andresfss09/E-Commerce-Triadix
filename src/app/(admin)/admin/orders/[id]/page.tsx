import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { OrderStatusSelect } from '@/components/admin/OrderStatusSelect';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/admin/orders" className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest mb-4 inline-flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Pedidos</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Pedido #{order.orderNumber}</h1>
          <p className="text-zinc-400 font-mono text-sm">Realizado el {order.createdAt.toLocaleDateString('es-CO')} a las {order.createdAt.toLocaleTimeString('es-CO')}</p>
        </div>
        <div>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-950/50 p-6 border border-zinc-800 rounded-xl h-fit">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4 border-b border-zinc-800 pb-2">Información del Cliente</h2>
          <div className="space-y-3 text-sm">
            <p><span className="text-zinc-500 w-24 inline-block">Nombre:</span> <span className="font-medium text-white">{order.customerName}</span></p>
            <p><span className="text-zinc-500 w-24 inline-block">Teléfono:</span> <span className="font-mono text-white">{order.customerPhone}</span></p>
            <p><span className="text-zinc-500 w-24 inline-block">Ciudad:</span> <span className="font-medium text-white">{order.customerCity}</span></p>
            <p><span className="text-zinc-500 w-24 inline-block">Dirección:</span> <span className="font-medium text-white">{order.customerAddress || 'N/A'}</span></p>
            <p><span className="text-zinc-500 w-24 inline-block">Notas:</span> <span className="font-medium text-white">{order.notes || 'Ninguna'}</span></p>
          </div>
        </div>

        <div className="bg-zinc-950/50 p-6 border border-zinc-800 rounded-xl">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4 border-b border-zinc-800 pb-2">Productos</h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-zinc-900/50 p-3 rounded border border-zinc-800/50">
                <div>
                  <p className="font-bold text-sm text-white">{item.name}</p>
                  <p className="text-xs text-zinc-400">{item.size} / {item.color} x {item.quantity}</p>
                </div>
                <div className="font-mono text-sm text-white">
                  ${Number(item.price * item.quantity).toLocaleString('es-CO')}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-lg font-bold">
            <span className="text-zinc-400">TOTAL</span>
            <span className="font-mono text-white">${Number(order.totalAmount).toLocaleString('es-CO')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
