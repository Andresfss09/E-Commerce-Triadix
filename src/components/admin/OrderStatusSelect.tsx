'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { updateOrderStatus } from '@/app/actions/order';
import { ChevronDown, Check } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'PENDIENTE', color: 'text-yellow-400' },
  { value: 'CONFIRMED', label: 'CONFIRMADO', color: 'text-blue-400' },
  { value: 'SHIPPED', label: 'ENVIADO', color: 'text-purple-400' },
  { value: 'DELIVERED', label: 'ENTREGADO', color: 'text-emerald-400' },
  { value: 'CANCELLED', label: 'CANCELADO', color: 'text-rose-400' },
];

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = STATUS_OPTIONS.find(opt => opt.value === selectedStatus) || STATUS_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setIsOpen(false);
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
    });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
      >
        <span className="text-zinc-500">Estado:</span>
        <span className={`font-bold ${currentOption.color}`}>
          {isPending ? 'Actualizando...' : currentOption.label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-between hover:bg-zinc-900 ${
                option.value === selectedStatus ? 'bg-zinc-900/60 font-bold' : 'text-zinc-400'
              }`}
            >
              <span className={option.color}>{option.label}</span>
              {option.value === selectedStatus && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
