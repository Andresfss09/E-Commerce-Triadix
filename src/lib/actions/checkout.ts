'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  phone: z.string().optional(),
  city: z.string().min(2, 'Ciudad es requerida'),
  address: z.string().optional(),
  notes: z.string().optional(),
  cartItems: z.string(),
});

type CheckoutItem = {
  variantId?: string;
  id?: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

export async function processCheckout(formData: FormData) {
  try {
    const data = checkoutSchema.parse({
      name: formData.get('name'),
      phone: formData.get('phone') || undefined,
      city: formData.get('city'),
      address: formData.get('address'),
      notes: formData.get('notes'),
      cartItems: formData.get('cartItems'),
    });

    const items: CheckoutItem[] = JSON.parse(data.cartItems);
    
    // Generar número de pedido único con prefijo TRX
    const orderNumber = `TRX-${Math.floor(1000 + Math.random() * 9000)}`;

    // Calcular total
    const totalAmount = items.reduce((acc: number, item: CheckoutItem) => acc + (item.price * item.quantity), 0);

    // Guardar pedido en Prisma (DB) con estado PENDING (Pendiente)
    const { prisma } = await import('@/lib/prisma');
    
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.name,
        customerPhone: data.phone?.trim() || 'Por WhatsApp',
        customerCity: data.city,
        customerAddress: data.address || null,
        notes: data.notes || null,
        totalAmount,
        status: 'PENDING',
        items: {
          create: items.map((item) => ({
            variantId: item.variantId || item.id || 'standard',
            name: item.name,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    });
    
    // Descontar inventario real en base de datos
    for (const item of items) {
      const vId = item.variantId || item.id;
      if (vId) {
        try {
          await prisma.variant.update({
            where: { id: vId },
            data: { stock: { decrement: item.quantity } }
          });
        } catch (stockErr) {
          console.warn(`[STOCK_UPDATE_WARN] No se pudo descontar stock para variante ${vId}:`, stockErr);
        }
      }
    }

    // Revalidar inmediatamente las rutas de administración para que aparezca en tiempo real
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
    revalidatePath('/admin/inventory');
    revalidatePath('/catalog');

    // Obtener número de WhatsApp desde la configuración global en la BD
    const config = await prisma.storeConfig.findUnique({ where: { id: 'global' } });
    const phoneNumber = config?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573185753889';
    
    let text = `*NUEVO PEDIDO: ${orderNumber}*\n\n`;
    text += `*Cliente:* ${data.name}\n`;
    if (data.phone) text += `*Teléfono:* ${data.phone}\n`;
    text += `*Ciudad:* ${data.city}\n`;
    if (data.address) text += `*Dirección:* ${data.address}\n`;
    if (data.notes) text += `*Notas:* ${data.notes}\n\n`;
    
    text += `*PRODUCTOS:*\n`;
    items.forEach((item: CheckoutItem) => {
      text += `- ${item.quantity}x ${item.name} (${item.size} - ${item.color}) - $${item.price.toLocaleString('es-CO')}\n`;
    });
    
    text += `\n*TOTAL: $${totalAmount.toLocaleString('es-CO')}*\n\n`;
    text += `¡Hola! Confirmo mi pedido ${orderNumber}. Quedo atento(a) a los medios de pago para coordinar el despacho.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    return { success: true, url: whatsappUrl, orderNumber: newOrder.orderNumber };
  } catch (error) {
    console.error('[PROCESS_CHECKOUT_ERROR]', error);
    return { success: false, error: 'Revisa los datos e intenta de nuevo' };
  }
}
