import { prisma } from '@/lib/prisma';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { Settings, ShieldCheck, Sparkles, Store } from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage() {
  const config = await prisma.storeConfig.findUnique({
    where: { id: 'global' }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Settings className="w-3.5 h-3.5 text-zinc-300" />
            <span>Configuración Global · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white font-heading">
            Ajustes
          </h1>
          <p className="text-zinc-500 font-mono text-xs">
            Parámetros globales de la tienda, canales oficiales de WhatsApp, redes y anuncios en vivo
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono text-xs uppercase tracking-wider rounded-xl transition-all"
        >
          <Store className="w-4 h-4 text-zinc-400" />
          <span>Ver Tienda en Vivo</span>
        </Link>
      </header>

      {/* Main Form Container */}
      <SettingsForm config={config} />
    </div>
  );
}
