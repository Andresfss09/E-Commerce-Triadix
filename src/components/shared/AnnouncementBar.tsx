import { prisma } from '@/lib/prisma';
import { Sparkles } from 'lucide-react';

export async function AnnouncementBar() {
  const config = await prisma.storeConfig.findUnique({
    where: { id: 'global' }
  });

  if (!config?.announcementBar) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/80 py-2 px-4 text-center">
      <div className="container mx-auto flex items-center justify-center gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
        <span className="font-[family-name:var(--font-cursive)] text-lg text-zinc-100 tracking-wide font-medium">
          {config.announcementBar}
        </span>
      </div>
    </div>
  );
}
