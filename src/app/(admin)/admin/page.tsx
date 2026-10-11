import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import Link from 'next/link';
import { 
  Package, 
  ReceiptText, 
  Settings, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Eye, 
  Store,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-zinc-500 font-mono text-xs animate-pulse uppercase tracking-widest">Cargando Panel Central_</div>}>
      <DashboardContent />
    </Suspense>
  );
}

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  PENDING: { label: 'PENDIENTE', className: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  CONFIRMED: { label: 'CONFIRMADO', className: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  SHIPPED: { label: 'ENVIADO', className: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  DELIVERED: { label: 'ENTREGADO', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  CANCELLED: { label: 'CANCELADO', className: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

async function DashboardContent() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Efficient 2-query batch to avoid connection pool exhaustion
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  const products = await prisma.product.findMany({
    include: { variants: true },
  });

  // Calculate live order metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((acc, curr) => acc + Number(curr.totalAmount), 0);
  const recentOrders = orders.slice(0, 6);

  // Calculate live product and stock metrics
  const totalProductsCount = products.length;
  const activeProductsCount = products.filter((p) => p.isActive).length;
  const allVariants = products.flatMap((p) =>
    p.variants.map((v) => ({ ...v, productName: p.name }))
  );
  const totalStockUnits = allVariants.reduce((acc, v) => acc + v.stock, 0);
  const lowStockVariants = allVariants
    .filter((v) => v.stock <= 3)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 relative">
      {/* Background Editorial Streetwear Layer */}
      <div className="absolute -top-12 -left-8 -right-8 md:-top-16 md:-left-12 md:-right-12 h-[580px] pointer-events-none overflow-hidden select-none -z-0">
        <Image
          src="/hero-streetwear.jpg"
          alt="TRIADIX Operations Colectivo"
          fill
          priority
          quality={95}
          className="object-cover object-[center_22%] filter brightness-[0.72] contrast-[1.08]"
        />
        {/* Balanced cinematic overlays: photo is crisp & visible, text is 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/60" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* Executive Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900/80 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema Operativo · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white font-heading drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Panel Central
          </h1>
          <p className="text-zinc-400 font-mono text-xs drop-shadow-md">
            Sesión activa como: <span className="text-white font-medium">{user.email}</span>
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inventory/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md group"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nueva Prenda</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-mono text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            <ReceiptText className="w-4 h-4 text-zinc-400" />
            <span>Ver Pedidos</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs rounded-xl transition-all"
            title="Abrir tienda en nueva pestaña"
          >
            <Store className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-6 bg-zinc-950/70 border border-zinc-900 hover:border-zinc-800 rounded-2xl space-y-3 transition-all backdrop-blur-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Ingresos Totales</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-white">
              ${totalRevenue.toLocaleString('es-CO')}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500">
              {totalOrdersCount} órdenes generadas
            </p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className={`p-6 bg-zinc-950/70 border ${pendingOrdersCount > 0 ? 'border-amber-500/40 bg-amber-500/[0.02]' : 'border-zinc-900'} hover:border-zinc-800 rounded-2xl space-y-3 transition-all backdrop-blur-sm relative overflow-hidden group`}>
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Pedidos Pendientes</span>
            <div className={`w-8 h-8 rounded-lg ${pendingOrdersCount > 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400'} border flex items-center justify-center`}>
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-white">
                {pendingOrdersCount}
              </h3>
              {pendingOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase animate-pulse">
                  Por coordinar
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-zinc-500">
              Requieren confirmación WhatsApp
            </p>
          </div>
        </div>

        {/* Active Products */}
        <div className="p-6 bg-zinc-950/70 border border-zinc-900 hover:border-zinc-800 rounded-2xl space-y-3 transition-all backdrop-blur-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Prendas en Catálogo</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-white">
              {activeProductsCount}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500">
              {totalProductsCount} diseños registrados
            </p>
          </div>
        </div>

        {/* Total Stock Units */}
        <div className="p-6 bg-zinc-950/70 border border-zinc-900 hover:border-zinc-800 rounded-2xl space-y-3 transition-all backdrop-blur-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-500 font-mono text-xs uppercase">
            <span>Unidades en Taller</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black font-mono tracking-tight text-white">
              {totalStockUnits}
            </h3>
            <p className="text-[11px] font-mono text-zinc-500">
              Stock total en Cali, Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Recent Orders & Side Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                ACTIVIDAD RECIENTE
              </span>
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <ReceiptText className="w-4 h-4 text-zinc-400" />
                <span>Últimos Pedidos Registrados</span>
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-mono text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors group"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-900/40 text-[10px] uppercase tracking-wider text-zinc-500 border-b border-zinc-900">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Orden</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Ciudad</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right rounded-r-xl">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-zinc-500 font-mono text-xs">
                      No se han recibido pedidos todavía.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    const statusBadge = STATUS_BADGES[order.status] || {
                      label: order.status,
                      className: 'bg-zinc-800 text-zinc-300 border-zinc-700',
                    };

                    return (
                      <tr key={order.id} className="hover:bg-zinc-900/30 transition-colors group">
                        <td className="px-4 py-4 font-bold text-white tracking-wider">
                          #{order.orderNumber}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-zinc-200 font-sans font-medium text-xs block">
                            {order.customerName}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {order.customerPhone}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-zinc-400">
                          {order.customerCity}
                        </td>
                        <td className="px-4 py-4 font-bold text-white">
                          ${Number(order.totalAmount).toLocaleString('es-CO')}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-semibold border ${statusBadge.className}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-[11px]"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Detalle</span>
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

        {/* Right: Low Stock Alerts & Fast Modules (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Monitor */}
          <div className="bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 space-y-5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-zinc-900/80 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  MONITOR DE INVENTARIO
                </span>
                <h3 className="text-base font-bold uppercase text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Stock Crítico (&le; 3 uds)</span>
                </h3>
              </div>
              <Link
                href="/admin/inventory"
                className="text-[11px] font-mono text-zinc-400 hover:text-white"
              >
                Ajustar
              </Link>
            </div>

            {lowStockVariants.length === 0 ? (
              <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs text-zinc-300 font-medium">Stock Saludable</p>
                <p className="text-[11px] text-zinc-500">
                  Todas las prendas cuentan con existencias óptimas.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockVariants.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-white truncate text-xs">
                        {v.productName}
                      </p>
                      <p className="text-[10px] font-mono text-zinc-400">
                        {v.size} · {v.color}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase border shrink-0 ${
                      v.stock === 0
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {v.stock === 0 ? 'Agotado' : `${v.stock} uds`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Grid Modules */}
          <div className="space-y-3">
            <Link 
              href="/admin/inventory" 
              className="p-5 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/60 rounded-2xl transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">Inventario</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">Prendas, imágenes y variantes</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Link>

            <Link 
              href="/admin/orders" 
              className="p-5 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/60 rounded-2xl transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all">
                  <ReceiptText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">Pedidos</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">Gestión de órdenes y despachos</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Link>

            <Link 
              href="/admin/settings" 
              className="p-5 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/60 rounded-2xl transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-all">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">Ajustes</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">WhatsApp, perfil y anuncios</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
