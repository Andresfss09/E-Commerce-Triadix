'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

type AddToCartProps = {
  product: {
    id: string;
    name: string;
    basePrice: number;
    image: string;
  };
  variants: {
    id: string;
    size: string;
    color: string;
    stock: number;
  }[];
};

export function AddToCart({ product, variants }: AddToCartProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      id: selectedVariant.id, // using variant id as cart item unique id for now
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: product.basePrice,
      quantity: 1,
      image: product.image,
      stock: selectedVariant.stock,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Talla y Color</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              disabled={variant.stock === 0}
              className={`flex items-center justify-center rounded-md border py-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary ${
                selectedVariantId === variant.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-input bg-transparent'
              } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {variant.size} - {variant.color}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant || isOutOfStock}
          size="lg"
          className="w-full"
        >
          {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
      </div>
    </div>
  );
}

