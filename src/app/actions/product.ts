'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(data: FormData) {
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const basePrice = parseFloat(data.get('basePrice') as string);
  const categoryId = data.get('categoryId') as string;
  const imageFile = data.get('imageFile') as File;
  
  let imageUrl = '';
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = Date.now() + '_' + imageFile.name.replace(/\s/g, '_');
    const path = await import('path');
    const fs = await import('fs/promises');
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try { await fs.mkdir(uploadsDir, { recursive: true }); } catch (e) {}
    
    await fs.writeFile(path.join(uploadsDir, filename), buffer);
    imageUrl = `/uploads/${filename}`;
  }
  // Simple slugification
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const stockS = parseInt(data.get('stock_S')?.toString() || '5', 10);
  const stockM = parseInt(data.get('stock_M')?.toString() || '10', 10);
  const stockL = parseInt(data.get('stock_L')?.toString() || '5', 10);

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      basePrice,
      categoryId,
      isActive: true,
      images: {
        create: {
          url: imageUrl || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
          alt: name,
        }
      },
      variants: {
        create: [
          { size: 'S', color: 'Negro', stock: Math.max(0, isNaN(stockS) ? 0 : stockS), sku: `SKU-${Date.now()}-S` },
          { size: 'M', color: 'Negro', stock: Math.max(0, isNaN(stockM) ? 0 : stockM), sku: `SKU-${Date.now()}-M` },
          { size: 'L', color: 'Negro', stock: Math.max(0, isNaN(stockL) ? 0 : stockL), sku: `SKU-${Date.now()}-L` },
        ]
      }
    }
  });

  revalidatePath('/admin/inventory');
  revalidatePath('/catalog');
  revalidatePath('/');
  redirect('/admin/inventory');
}


export async function updateProduct(productId: string, data: FormData) {
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const basePrice = parseFloat(data.get('basePrice') as string);
  const categoryId = data.get('categoryId') as string;
  const imageFile = data.get('imageFile') as File | null;
  const isActive = data.get('isActive') === 'on';
  
  let imageUrl: string | undefined = undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = Date.now() + '_' + imageFile.name.replace(/\s/g, '_');
    const path = await import('path');
    const fs = await import('fs/promises');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try { await fs.mkdir(uploadsDir, { recursive: true }); } catch (e) {}
    await fs.writeFile(path.join(uploadsDir, filename), buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (imageUrl) {
    await prisma.image.deleteMany({ where: { productId } });
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      slug,
      description,
      basePrice,
      categoryId,
      isActive,
      ...(imageUrl ? {
        images: {
          create: {
            url: imageUrl,
            alt: name,
          }
        }
      } : {})
    }
  });

  // Update variant stock if present in FormData
  const variants = await prisma.variant.findMany({ where: { productId } });
  for (const variant of variants) {
    const stockVal = data.get(`variant_stock_${variant.id}`);
    if (stockVal !== null && stockVal !== undefined) {
      const stockInt = parseInt(stockVal.toString(), 10);
      if (!isNaN(stockInt)) {
        await prisma.variant.update({
          where: { id: variant.id },
          data: { stock: Math.max(0, stockInt) }
        });
      }
    }
  }

  revalidatePath('/admin/inventory');
  revalidatePath('/catalog');
  revalidatePath('/');
  redirect('/admin/inventory');
}

export async function deleteProduct(productId: string) {
  // First, find all variants for this product
  const variants = await prisma.variant.findMany({ where: { productId } });
  const variantIds = variants.map(v => v.id);
  
  // Delete associated order items
  if (variantIds.length > 0) {
    await prisma.orderItem.deleteMany({ where: { variantId: { in: variantIds } } });
  }
  
  await prisma.image.deleteMany({ where: { productId } });
  await prisma.variant.deleteMany({ where: { productId } });
  await prisma.product.delete({ where: { id: productId } });
  
  revalidatePath('/admin/inventory');
  revalidatePath('/catalog');
  revalidatePath('/');
}
