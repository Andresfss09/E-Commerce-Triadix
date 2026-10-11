'use client';

import Link from 'next/link';
import { Printer, FileSpreadsheet, Plus } from 'lucide-react';

export function ExportButtons() {
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => window.print()} 
        className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 text-zinc-300 px-3.5 py-2 font-mono tracking-wider uppercase text-xs hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-lg cursor-pointer"
      >
        <Printer className="w-3.5 h-3.5 text-zinc-400" />
        <span>PDF</span>
      </button>

      <a 
        href="/api/export-orders?format=csv" 
        download 
        className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 text-zinc-300 px-3.5 py-2 font-mono tracking-wider uppercase text-xs hover:bg-zinc-900 hover:border-zinc-700 transition-all rounded-lg"
      >
        <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-400" />
        <span>Excel (CSV)</span>
      </a>

      <Link 
        href="/admin/orders/new" 
        className="flex items-center gap-2 bg-white text-black px-4 py-2 font-mono font-bold tracking-wider uppercase text-xs hover:bg-zinc-200 transition-all rounded-lg shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Nuevo Pedido</span>
      </Link>
    </div>
  );
}
