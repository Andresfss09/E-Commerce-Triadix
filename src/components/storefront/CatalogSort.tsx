'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

export function CatalogSort({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', val);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900 text-xs font-mono text-zinc-400">
      <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="bg-transparent text-zinc-300 font-mono text-xs uppercase focus:outline-none cursor-pointer"
      >
        <option value="newest" className="bg-zinc-950 text-white">Más Recientes</option>
        <option value="price-asc" className="bg-zinc-950 text-white">Precio: Menor a Mayor</option>
        <option value="price-desc" className="bg-zinc-950 text-white">Precio: Mayor a Menor</option>
      </select>
    </div>
  );
}

