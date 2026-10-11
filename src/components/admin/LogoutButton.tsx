'use client';

import { logout } from '@/lib/actions/auth';
import { useTransition } from 'react';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-3 px-3.5 py-2.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg text-xs font-mono uppercase tracking-wider transition-all w-full border border-zinc-900 hover:border-red-900/40 text-left cursor-pointer disabled:opacity-50 group"
    >
      <LogOut className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 transition-colors" />
      <span>{isPending ? 'Saliendo...' : 'Cerrar Sesión'}</span>
    </button>
  );
}
