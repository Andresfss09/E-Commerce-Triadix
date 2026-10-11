import { LogoutButton } from '@/components/admin/LogoutButton';
import { LayoutDashboard, Package, ReceiptText, Settings, Store } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/90 hidden md:flex flex-col backdrop-blur-sm">
        <div className="p-8 border-b border-zinc-900">
          <Link href="/admin">
            <img src="/logo.png" alt="TRIADIX Logo" className="h-6 w-auto invert dark:invert-0" style={{ filter: 'invert(1)' }} />
          </Link>
          <span className="text-[10px] font-mono text-zinc-500 mt-3 block uppercase tracking-widest">
            Control Center
          </span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col justify-between">
          <ul className="space-y-1.5">
            <li>
              <Link
                href="/admin" 
                className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:bg-zinc-900/80 group"
              >
                <LayoutDashboard className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/inventory" 
                className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:bg-zinc-900/80 group"
              >
                <Package className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span>Inventario</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders" 
                className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:bg-zinc-900/80 group"
              >
                <ReceiptText className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span>Pedidos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings" 
                className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-400 hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:bg-zinc-900/80 group"
              >
                <Settings className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span>Ajustes</span>
              </Link>
            </li>
            
            <li className="pt-4 border-t border-zinc-900/80 mt-4">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-500 hover:text-zinc-200 rounded-lg text-xs font-mono uppercase tracking-wider transition-all hover:bg-zinc-900/50 border border-zinc-900"
              >
                <Store className="w-4 h-4 text-zinc-500" />
                <span>Ver Tienda</span>
              </Link>
            </li>
          </ul>

          <div className="pt-4 border-t border-zinc-900/80 mt-auto">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      <main className="flex-1 bg-background relative overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-background to-background pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
