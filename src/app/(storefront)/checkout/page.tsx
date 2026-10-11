'use client';

import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { processCheckout } from '@/lib/actions/checkout';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  MapPin, 
  User, 
  FileText,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotal, getTotalItems, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
        Cargando orden...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-black min-h-screen text-zinc-300 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
              ESTADO DE LA ORDEN
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              Tu bolsa está vacía
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No tienes artículos seleccionados en tu pedido. Explora nuestro catálogo para elegir tus prendas antes de completar la orden.
            </p>
          </div>
          <Button 
            onClick={() => router.push('/catalog')}
            className="w-full bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider py-6 rounded-xl transition-all shadow-lg"
          >
            Explorar Catálogo
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('cartItems', JSON.stringify(items));

    const result = await processCheckout(formData);
    
    setLoading(false);
    
    if (result.success && result.url) {
      clearCart();
      window.location.href = result.url; // Redirect to official WhatsApp channel
    } else {
      alert(result.error);
    }
  };

  const totalAmount = getTotal();
  const totalItemsCount = getTotalItems();

  return (
    <div className="bg-black min-h-screen text-zinc-300 py-12 md:py-20 px-4 md:px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Editorial Page Header */}
        <div className="space-y-3 border-b border-zinc-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Checkout Privado & Seguro · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase font-heading">
            Finalizar Compra
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl leading-relaxed">
            Ingresa tus datos de envío nacional. Confirmaremos la disponibilidad inmediata desde nuestro taller en Cali, Colombia y coordinaremos el despacho prioritario de tus prendas.
          </p>
        </div>
        
        {/* Grid: Form on Left, Order Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Shipping Details Form */}
          <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  PASO 01 DE 02
                </span>
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span>Datos de Destinatario y Entrega</span>
                </h2>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase">
                Envíos Nacionales
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Nombre Completo <span className="text-emerald-400">*</span>
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Ej. Juan Pérez Morales" 
                    className="bg-black/60 border-zinc-800 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-zinc-600 rounded-xl h-12 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Celular / WhatsApp <span className="text-emerald-400">*</span>
                  </Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    required 
                    placeholder="Ej. 321 589 1398" 
                    className="bg-black/60 border-zinc-800 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-zinc-600 rounded-xl h-12 text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Ciudad / Municipio <span className="text-emerald-400">*</span>
                  </Label>
                  <Input 
                    id="city" 
                    name="city" 
                    required 
                    placeholder="Ej. Cali, Bogotá, Medellín..." 
                    className="bg-black/60 border-zinc-800 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-zinc-600 rounded-xl h-12 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Dirección de Entrega
                  </Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="Ej. Carrera 15 # 33B - 69, Apto 201" 
                    className="bg-black/60 border-zinc-800 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-zinc-600 rounded-xl h-12 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                  <span>Instrucciones o Notas Especiales</span>
                  <span className="text-[10px] text-zinc-500 lowercase">opcional</span>
                </Label>
                <Input 
                  id="notes" 
                  name="notes" 
                  placeholder="Ej. Dejar en portería, avisar antes de entregar..." 
                  className="bg-black/60 border-zinc-800 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-zinc-600 rounded-xl h-12 text-sm"
                />
              </div>

              {/* Legal & Habeas Data Accordance */}
              <div className="p-4 bg-black/40 border border-zinc-900 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="habeas" 
                    required 
                    className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-zinc-500 cursor-pointer accent-white" 
                  />
                  <Label htmlFor="habeas" className="text-xs text-zinc-400 leading-relaxed cursor-pointer font-sans">
                    Acepto la{' '}
                    <Link href="/privacy" target="_blank" className="text-zinc-200 underline hover:text-white transition-colors">
                      Política de Tratamiento de Datos (Ley 1581)
                    </Link>{' '}
                    y los{' '}
                    <Link href="/terms" target="_blank" className="text-zinc-200 underline hover:text-white transition-colors">
                      Términos de Servicio
                    </Link>{' '}
                    de TRIADIX con sede en Cali, Colombia.
                  </Label>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3 pt-2">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs md:text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl group" 
                  disabled={loading}
                >
                  {loading ? (
                    <span>Generando Orden...</span>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 fill-black" />
                      <span>Confirmar y Pedir por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] font-mono text-zinc-500 leading-normal">
                  Al pulsar confirmar, serás redirigido a nuestro chat oficial con tu pedido formateado para coordinar el pago vía Bancolombia, Nequi o Daviplata.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Sticky Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-zinc-950/70 border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    PASO 02 DE 02
                  </span>
                  <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                    Resumen de Pedido
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Prenda' : 'Prendas'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3 bg-zinc-900/40 border border-zinc-900 rounded-2xl items-center"
                  >
                    <div className="h-16 w-14 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shrink-0">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] font-mono text-zinc-600">
                          TRX
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-bold uppercase text-white truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-zinc-300 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {item.size}
                        </span>
                        {item.color && (
                          <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                            {item.color}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-400">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-white">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-zinc-900/80 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal piezas</span>
                  <span className="text-zinc-200">${totalAmount.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>Logística de despacho</span>
                  <span>Calculado al coordinar</span>
                </div>
                <div className="border-t border-zinc-900 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">Total a Pagar</span>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
                      ${totalAmount.toLocaleString('es-CO')}
                    </span>
                    <span className="text-xs font-normal text-zinc-400 ml-1">COP</span>
                  </div>
                </div>
              </div>

              {/* Dispatch note */}
              <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-xl flex items-center gap-2.5 text-[11px] font-mono text-zinc-400">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Despachos asegurados a toda Colombia desde Cali</span>
              </div>
            </div>

            {/* Trust Badges Panel */}
            <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-2xl grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
                <h5 className="text-[11px] font-mono font-bold text-white uppercase">Garantía Real</h5>
                <p className="text-[10px] text-zinc-500">30 días por cambio de talla</p>
              </div>
              <div className="space-y-1">
                <Lock className="w-4 h-4 text-emerald-400 mx-auto" />
                <h5 className="text-[11px] font-mono font-bold text-white uppercase">Atención 1 a 1</h5>
                <p className="text-[10px] text-zinc-500">Asesoría directa personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
