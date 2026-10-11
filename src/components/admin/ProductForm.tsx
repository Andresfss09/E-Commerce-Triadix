'use client';

import { createProduct, updateProduct } from '@/app/actions/product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Category = {
  id: string;
  name: string;
};

type Variant = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

type ProductFormProps = {
  categories: Category[];
  initialData?: {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    categoryId: string;
    isActive: boolean;
    images?: { url: string }[];
    variants?: Variant[];
  };
};

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const isEditing = !!initialData;
  const action = isEditing ? updateProduct.bind(null, initialData.id) : createProduct;

  return (
    <form action={action} className="space-y-8 bg-zinc-950/60 p-8 border border-zinc-900 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-400">Nombre del Producto</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            defaultValue={initialData?.name || ''}
            required 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 font-mono"
            placeholder="Ej: Camiseta Oversize Negra"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="basePrice" className="text-xs font-mono uppercase tracking-wider text-zinc-400">Precio Base (COP)</label>
          <input 
            type="number" 
            id="basePrice" 
            name="basePrice" 
            defaultValue={initialData?.basePrice || ''}
            required 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 font-mono"
            placeholder="Ej: 65000"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="text-xs font-mono uppercase tracking-wider text-zinc-400">Descripción</label>
          <textarea 
            id="description" 
            name="description" 
            defaultValue={initialData?.description || ''}
            required 
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none font-sans"
            placeholder="Detalles de la prenda..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-xs font-mono uppercase tracking-wider text-zinc-400">Categoría</label>
          <select 
            id="categoryId" 
            name="categoryId" 
            defaultValue={initialData?.categoryId || ''}
            required 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 appearance-none font-mono"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="imageFile" className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {isEditing ? 'Cambiar Imagen (Opcional)' : 'Imagen Principal'}
          </label>
          <input 
            type="file" 
            accept="image/*"
            id="imageFile" 
            name="imageFile" 
            required={!isEditing}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
          />
          {isEditing && initialData.images && initialData.images.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-500">Imagen actual:</span>
              <div className="w-10 h-10 relative rounded border border-zinc-800 overflow-hidden bg-zinc-900">
                <img src={initialData.images[0].url} alt={initialData.name} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Control Real de Stock por Variante */}
        {isEditing && initialData.variants && initialData.variants.length > 0 && (
          <div className="space-y-4 md:col-span-2 pt-4 border-t border-zinc-900">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Stock Real por Variante</h3>
              <p className="text-xs text-zinc-500 font-mono">Modifica las unidades físicas reales existentes en bodega para cada talla y color</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {initialData.variants.map((v) => (
                <div key={v.id} className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-lg space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-bold">Talla {v.size}</span>
                    <span className="text-zinc-500">{v.color}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`variant_stock_${v.id}`} className="text-[11px] font-mono text-zinc-400">Uds:</label>
                    <input 
                      type="number" 
                      id={`variant_stock_${v.id}`}
                      name={`variant_stock_${v.id}`}
                      defaultValue={v.stock}
                      min="0"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stock inicial al crear producto nuevo */}
        {!isEditing && (
          <div className="space-y-4 md:col-span-2 pt-4 border-t border-zinc-900">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Stock Inicial por Talla (Color Negro)</h3>
              <p className="text-xs text-zinc-500 font-mono">Define cuántas unidades iniciales se guardarán en la base de datos para cada talla</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-lg space-y-1.5">
                <span className="text-white font-bold text-xs font-mono">Talla S</span>
                <div className="flex items-center gap-2">
                  <label htmlFor="stock_S" className="text-[11px] font-mono text-zinc-400">Uds:</label>
                  <input 
                    type="number" 
                    id="stock_S"
                    name="stock_S"
                    defaultValue={5}
                    min="0"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-lg space-y-1.5">
                <span className="text-white font-bold text-xs font-mono">Talla M</span>
                <div className="flex items-center gap-2">
                  <label htmlFor="stock_M" className="text-[11px] font-mono text-zinc-400">Uds:</label>
                  <input 
                    type="number" 
                    id="stock_M"
                    name="stock_M"
                    defaultValue={10}
                    min="0"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-lg space-y-1.5">
                <span className="text-white font-bold text-xs font-mono">Talla L</span>
                <div className="flex items-center gap-2">
                  <label htmlFor="stock_L" className="text-[11px] font-mono text-zinc-400">Uds:</label>
                  <input 
                    type="number" 
                    id="stock_L"
                    name="stock_L"
                    defaultValue={5}
                    min="0"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="space-y-2 flex items-center pt-2 gap-3 md:col-span-2">
            <input 
              type="checkbox" 
              id="isActive" 
              name="isActive" 
              defaultChecked={initialData?.isActive ?? true}
              className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-white focus:ring-0 cursor-pointer"
            />
            <label htmlFor="isActive" className="text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer">
              Producto Activo (Visible en la tienda pública)
            </label>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-900 flex justify-end space-x-4">
        <Link href="/admin/inventory" className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors">
          Cancelar
        </Link>
        <Button type="submit" className="bg-white text-black hover:bg-zinc-200 font-mono font-bold tracking-wider uppercase text-xs rounded-lg px-6">
          {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
        </Button>
      </div>
    </form>
  );
}
