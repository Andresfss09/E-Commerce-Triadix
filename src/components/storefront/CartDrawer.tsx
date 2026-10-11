'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Lock
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

export function CartDrawer() {
  const { items, getTotal, getTotalItems, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItemsCount = mounted ? getTotalItems() : 0;
  const totalAmount = mounted ? getTotal() : 0;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors" 
          />
        }
      >
        <ShoppingBag className="h-5 w-5" />
        {mounted && totalItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-white text-black text-[10px] font-mono font-black shadow-md">
            {totalItemsCount}
          </span>
        )}
        <span className="sr-only">Bolsa de compras</span>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md md:max-w-lg flex flex-col bg-zinc-950 border-l border-zinc-900 text-zinc-100 p-0 sm:p-0 gap-0">
        {/* Editorial Header */}
        <div className="p-6 border-b border-zinc-900 bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              ESTUDIO CALI, COLOMBIA · DROP ACTUAL
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <SheetTitle className="text-xl md:text-2xl font-black uppercase tracking-tight text-white font-mono">
              Bolsa de Compras
            </SheetTitle>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              {totalItemsCount === 1 ? '1 Prenda' : `${totalItemsCount} Prendas`}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!mounted || items.length === 0 ? (
            /* Refined Minimalist Empty State */
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center space-y-6 px-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-2xl">
                  <ShoppingBag className="h-9 w-9 text-zinc-400 stroke-[1.5]" />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 bg-black rounded-full border border-zinc-800 text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-2 max-w-xs">
                <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
                  SELECCIÓN VACÍA
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Tu bolsa está esperando tus piezas
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Aún no has agregado prendas a tu orden. Descubre nuestras siluetas oversized y cortes de alto gramaje diseñados en Cali.
                </p>
              </div>

              <SheetClose 
                nativeButton={false}
                render={
                  <Link 
                    href="/catalog" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md group"
                  />
                }
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </SheetClose>

              {/* Quick links to categories */}
              <div className="pt-4 border-t border-zinc-900 w-full space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Categorías destacadas
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <SheetClose nativeButton={false} render={<Link href="/catalog?category=camisetas" className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono transition-colors" />}>
                    Camisetas
                  </SheetClose>
                  <SheetClose nativeButton={false} render={<Link href="/catalog?category=hoodies" className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono transition-colors" />}>
                    Hoodies
                  </SheetClose>
                  <SheetClose nativeButton={false} render={<Link href="/catalog?category=pantalones" className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono transition-colors" />}>
                    Pantalones
                  </SheetClose>
                </div>
              </div>
            </div>
          ) : (
            /* Items List with Quantity Controls and High-End Styling */
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-900 hover:border-zinc-800 rounded-2xl transition-all flex gap-4 group"
                >
                  {/* Image */}
                  <div className="h-24 w-20 relative flex-shrink-0 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-[10px]">
                        TRIADIX
                      </div>
                    )}
                  </div>

                  {/* Info & Controls */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white line-clamp-1 group-hover:text-zinc-200">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 -mr-1 -mt-1 transition-colors"
                          title="Eliminar de la bolsa"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase">
                          Talla: {item.size}
                        </span>
                        {item.color && (
                          <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase">
                            {item.color}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center bg-black border border-zinc-800 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black font-mono tracking-tight text-white">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] font-mono text-zinc-500">
                            ${item.price.toLocaleString('es-CO')} c/u
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-6 border-t border-zinc-900 bg-black/80 space-y-4">
          {/* Dispatch guarantee banner */}
          <div className="flex items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-900 rounded-xl text-zinc-400 text-[11px] font-mono">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Despachos asegurados desde Cali, Colombia</span>
          </div>

          {/* Pricing calculations */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200">${totalAmount.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between text-zinc-500 text-[11px]">
              <span>Envío nacional</span>
              <span>Calculado al checkout</span>
            </div>
            <div className="border-t border-zinc-900 pt-2 flex justify-between items-baseline">
              <span className="text-sm font-bold uppercase tracking-wider text-white">Total</span>
              <span className="text-lg md:text-xl font-black text-white tracking-tight">
                ${totalAmount.toLocaleString('es-CO')} <span className="text-xs font-normal text-zinc-400">COP</span>
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          {items.length === 0 ? (
            <Button 
              className="w-full h-12 bg-zinc-900 text-zinc-500 border border-zinc-800 font-mono text-xs uppercase tracking-wider rounded-xl cursor-not-allowed" 
              disabled
            >
              Bolsa Vacía
            </Button>
          ) : (
            <SheetClose 
              nativeButton={false} 
              render={
                <Link 
                  href="/checkout" 
                  className="w-full h-12 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl group"
                />
              }
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Proceder al Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </SheetClose>
          )}

          {/* Micro trust points */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Compra Segura</span>
            </div>
            <span>•</span>
            <span>Atención WhatsApp</span>
            <span>•</span>
            <span>Garantía 30 Días</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
