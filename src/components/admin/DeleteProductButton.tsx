'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/app/actions/product';
import { Button } from '@/components/ui/button';

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      startTransition(async () => {
        await deleteProduct(productId);
        router.push('/admin/inventory');
      });
    }
  };

  return (
    <Button 
      type="button" 
      variant="destructive" 
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 text-xs uppercase tracking-wider font-bold"
    >
      {isPending ? 'Eliminando...' : 'Eliminar Producto'}
    </Button>
  );
}

