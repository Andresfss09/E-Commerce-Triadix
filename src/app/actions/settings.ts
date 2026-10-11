'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateStoreSettings(data: FormData) {
  const whatsappNumber = (data.get('whatsappNumber') as string || '').trim();
  const contactEmail = (data.get('contactEmail') as string || '').trim();
  const instagramUrl = (data.get('instagramUrl') as string || '').trim();
  const announcementBar = (data.get('announcementBar') as string || '').trim();
  const adminProfilePic = (data.get('adminProfilePic') as string || '').trim();

  await prisma.storeConfig.upsert({
    where: { id: 'global' },
    update: {
      whatsappNumber,
      contactEmail,
      instagramUrl,
      announcementBar,
      adminProfilePic
    },
    create: {
      id: 'global',
      whatsappNumber,
      contactEmail,
      instagramUrl,
      announcementBar,
      adminProfilePic
    }
  });

  // Revalidate layout and pages
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  revalidatePath('/');
  revalidatePath('/catalog');
  revalidatePath('/checkout');

  return { success: true };
}
