'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createManualOrder(data: any) {
  const { customerName, customerPhone, customerCity, customerAddress, items } = data;

  if (!items || items.length === 0) {
    throw new Error('El pedido debe tener al menos un producto');
  }

  // Calculate total amount
  const totalAmount = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);

  // Generate a random order number like TRD-1234
  const orderNumber = `TRD-${Math.floor(1000 + Math.random() * 9000)}`;

  await prisma.order.create({
    data: {
      orderNumber,
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      totalAmount,
      status: 'CONFIRMED', // Manual orders are usually confirmed
      items: {
        create: items.map((item: any) => ({
          variantId: item.variantId,
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        }))
      }
    }
  });

  // Deduct stock
  for (const item of items) {
    await prisma.variant.update({
      where: { id: item.variantId },
      data: {
        stock: {
          decrement: item.quantity
        }
      }
    });
  }

  revalidatePath('/admin/orders');
  revalidatePath('/admin/inventory');
  
  return { success: true, orderId: orderNumber };
}


export async function updateOrderStatus(orderId: string, status: string) {
  // @ts-ignore
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any }
  });
  
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
}
