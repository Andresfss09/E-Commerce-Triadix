import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'csv';

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });

  if (format === 'csv') {
    // Generate CSV
    const headers = ['ID Pedido', 'Fecha', 'Cliente', 'Teléfono', 'Ciudad', 'Dirección', 'Total', 'Estado'];
    
    const rows = orders.map(order => [
      order.orderNumber,
      order.createdAt.toISOString().split('T')[0],
      `"${order.customerName}"`,
      order.customerPhone,
      `"${order.customerCity}"`,
      `"${order.customerAddress || ''}"`,
      order.totalAmount.toString(),
      order.status
    ]);

    const csvContent = '\uFEFF' + [
      headers.join(';'),
      ...rows.map(row => row.join(';'))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="reporte_pedidos_triadix.csv"',
      },
    });
  }

  return NextResponse.json({ error: 'Formato no soportado' }, { status: 400 });
}

