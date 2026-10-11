import { prisma } from '@/lib/prisma';
import { ExportButtons } from '@/components/admin/ExportButtons';
import Link from 'next/link';
import { 
  Eye, 
  ReceiptText, 
  Clock, 
  Truck, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  MessageSquare,
  Package,
  Calendar
} from 'lucide-react';
import { OrderStatusSelect } from '@/components/admin/OrderStatusSelect';

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'PENDIENTE', className: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  CONFIRMED: { label: 'CONFIRMADO', className: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  SHIPPED: { label: 'ENVIADO', className: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  DELIVERED: { label: 'ENTREGADO', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  CANCELLED: { label: 'CANCELADO', className: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const inTransitOrders = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'SHIPPED').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((acc, o) => acc + Number(o.totalAmount), 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      {/* Executive Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Truck className="w-3.5 h-3.5 text-zinc-300" />
            <span>Despachos Nacionales · Centro Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white font-heading">
            Pedidos
          </h1>
          <p className="text-zinc-500 font-mono text-xs">
            Gestiona órdenes, despachos, comprobantes de pago y estados logísticos en tiempo real
          </p>
        </div>

        <ExportButtons />
      </header>

      {/* Mini KPIs & Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Facturado */}
        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Facturación Total</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black font-mono text-white">
            ${totalRevenue.toLocaleString('es-CO')}
          </p>
          <p className="text-[11px] font-mono text-zinc-500">{totalOrders} pedidos totales</p>
        </div>

        {/* Pendientes */}
        <div className={`p-5 bg-zinc-950/70 border ${pendingOrders > 0 ? 'border-amber-500/40 bg-amber-500/[0.02]' : 'border-zinc-900'} rounded-2xl space-y-1.5 backdrop-blur-sm`}>
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Por Confirmar</span>
            <Clock className={`w-4 h-4 ${pendingOrders > 0 ? 'text-amber-400' : 'text-zinc-400'}`} />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black font-mono text-white">{pendingOrders}</p>
            {pendingOrders > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase font-bold animate-pulse">
                WhatsApp
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-zinc-500">Pendientes de validar</p>
        </div>

        {/* En Proceso / En Camino */}
        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>En Proceso / Ruta</span>
            <Truck className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black font-mono text-white">{inTransitOrders}</p>
          <p className="text-[11px] font-mono text-zinc-500">Confirmados o despachados</p>
        </div>

        {/* Entregados */}
        <div className="p-5 bg-zinc-950/70 border border-zinc-900 rounded-2xl space-y-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Entregados</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black font-mono text-white">{deliveredOrders}</p>
          <p className="text-[11px] font-mono text-zinc-500">Completados con éxito</p>
        </div>
      </div>

      {/* Main Orders Table */}
      <div className="bg-zinc-950/70 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-400">
            <thead className="bg-zinc-900/40 border-b border-zinc-900 text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              <tr>
                <th className="px-6 py-4">Orden & Fecha</th>
                <th className="px-6 py-4">Cliente & Contacto</th>
                <th className="px-6 py-4">Prendas Solicitadas</th>
                <th className="px-6 py-4">Destino</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 font-mono text-xs">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-zinc-500 font-mono text-xs">
                    No hay pedidos registrados en el sistema. Los nuevos pedidos generados desde la tienda aparecerán aquí automáticamente.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const statusBadge = STATUS_BADGES[order.status] || {
                    label: order.status,
                    className: 'bg-zinc-800 text-zinc-300 border-zinc-700',
                  };

                  const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
                  const hasDirectPhone = cleanPhone.length >= 7;

                  return (
                    <tr key={order.id} className="hover:bg-zinc-900/30 transition-colors group">
                      {/* Order Code & Date */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="font-bold text-white tracking-wider text-sm block">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-zinc-600" />
                            {new Date(order.createdAt).toLocaleDateString('es-CO', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Customer & Direct WhatsApp Action */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="text-zinc-200 font-sans font-bold text-sm block">
                            {order.customerName}
                          </span>
                          <div className="flex items-center gap-2">
                            {hasDirectPhone ? (
                              <a
                                href={`https://wa.me/57${cleanPhone.startsWith('57') ? cleanPhone.slice(2) : cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                                title="Abrir chat en WhatsApp"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>{order.customerPhone}</span>
                              </a>
                            ) : (
                              <span className="text-[11px] text-zinc-500 font-mono">
                                {order.customerPhone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Items Purchased Preview */}
                      <td className="px-6 py-4">
                        <div className="space-y-1 max-w-[240px]">
                          {order.items.length === 0 ? (
                            <span className="text-zinc-600 text-[11px]">-</span>
                          ) : (
                            order.items.map((item) => (
                              <div 
                                key={item.id} 
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 mr-1 mb-1"
                              >
                                <span className="font-bold text-white">{item.quantity}×</span>
                                <span className="truncate max-w-[120px]">{item.name}</span>
                                <span className="text-zinc-500 font-normal">({item.size})</span>
                              </div>
                            ))
                          )}
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-[11px]">
                            {order.customerCity}
                          </span>
                          {order.customerAddress && (
                            <p 
                              className="text-[10px] text-zinc-500 truncate max-w-[160px]" 
                              title={order.customerAddress}
                            >
                              {order.customerAddress}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 font-mono font-bold text-white text-sm">
                        ${Number(order.totalAmount).toLocaleString('es-CO')}
                        <span className="text-[10px] text-zinc-500 font-normal ml-1">COP</span>
                      </td>

                      {/* Status Selector Inline */}
                      <td className="px-6 py-4">
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </td>

                      {/* Action Detail Link */}
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/admin/orders/${order.id}`} 
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-black bg-zinc-900 hover:bg-white border border-zinc-800 hover:border-white transition-all py-1.5 px-3 rounded-lg font-mono font-medium"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver</span>
                        </Link>
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
