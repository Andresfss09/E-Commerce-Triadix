'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createManualOrder } from '@/app/actions/order';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Variant = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

type Product = {
  id: string;
  name: string;
  basePrice: any;
  variants: Variant[];
};

export function OrderForm({ products }: { products: Product[] }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = () => {
    if (!selectedProductId || !selectedVariantId || quantity < 1) return;

    const product = products.find(p => p.id === selectedProductId);
    const variant = product?.variants.find(v => v.id === selectedVariantId);

    if (product && variant) {
      setItems([...items, {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        size: variant.size,
        color: variant.color,
        price: Number(product.basePrice),
        quantity
      }]);
      // Reset selections
      setSelectedProductId('');
      setSelectedVariantId('');
      setQuantity(1);
    }
  };

  const router = useRouter();

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Debes agregar al menos un producto');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await createManualOrder({
        customerName,
        customerPhone,
        customerCity,
        customerAddress,
        items
      });
      if (res.success) {
        router.push('/admin/orders');
      }
    } catch (error) {
      console.error(error);
      alert('Error al crear el pedido');
      setIsSubmitting(false);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Información del Cliente */}
      <form id="orderForm" onSubmit={handleSubmit} className="lg:col-span-2 space-y-8 bg-zinc-950/50 p-8 border border-zinc-800 rounded-xl h-fit">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">1. Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Nombre Completo</label>
              <input type="text" required value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Teléfono / WhatsApp</label>
              <input type="text" required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Ciudad</label>
              <input type="text" required value={customerCity} onChange={e => setCustomerCity(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Dirección</label>
              <input type="text" required value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">2. Añadir Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5 space-y-2">
              <label className="text-sm font-medium text-zinc-300">Producto</label>
              <select value={selectedProductId} onChange={e => { setSelectedProductId(e.target.value); setSelectedVariantId(''); }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white appearance-none">
                <option value="">Seleccione...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="text-sm font-medium text-zinc-300">Variante</label>
              <select value={selectedVariantId} onChange={e => setSelectedVariantId(e.target.value)} disabled={!selectedProductId} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white appearance-none">
                <option value="">Seleccione...</option>
                {selectedProduct?.variants.map(v => (
                  <option key={v.id} value={v.id} disabled={v.stock === 0}>
                    {v.size} - {v.color} ({v.stock} disp)
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-zinc-300">Cant.</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <Button type="button" onClick={handleAddItem} variant="outline" className="w-full h-[42px] border-zinc-800">
                Añadir
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Resumen del Pedido */}
      <div className="bg-zinc-950/50 p-8 border border-zinc-800 rounded-xl h-fit sticky top-24">
        <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b border-zinc-800 pb-2">Resumen</h2>
        
        {items.length === 0 ? (
          <p className="text-zinc-500 font-mono text-sm mb-8 text-center py-8 border border-dashed border-zinc-800 rounded-lg">No hay productos</p>
        ) : (
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-md border border-zinc-800/50">
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-zinc-400">{item.size} / {item.color} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-mono">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                  <button type="button" onClick={() => handleRemoveItem(idx)} className="text-zinc-500 hover:text-red-500">×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-zinc-800 pt-4 mb-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="font-mono text-white">${totalAmount.toLocaleString('es-CO')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button type="submit" form="orderForm" disabled={items.length === 0 || isSubmitting} className="w-full bg-white text-black hover:bg-zinc-200 font-bold tracking-widest uppercase">
            {isSubmitting ? 'Guardando...' : 'Procesar Pedido'}
          </Button>
          <Link href="/admin/orders" className="block text-center w-full py-2 text-sm text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}

