import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Mail } from 'lucide-react';

export async function Footer() {
  const config = await prisma.storeConfig.findUnique({
    where: { id: 'global' }
  });

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/80">
      <div className="container px-4 py-8 mx-auto max-w-7xl md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg tracking-tight text-white">TRIADIX</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Streetwear de corte premium y minimalismo oscuro diseñado en Cali, Colombia. Envíos garantizados a todo el país.
            </p>
            {config?.instagramUrl && (
              <a 
                href={config.instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
            )}
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-xs font-mono uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Nosotros</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-xs font-mono uppercase tracking-wider text-white">Atención al Cliente</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              {config?.contactEmail && (
                <li>
                  <a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />
                    <span>{config.contactEmail}</span>
                  </a>
                </li>
              )}
              {config?.whatsappNumber && (
                <li>
                  <a 
                    href={`https://wa.me/${config.whatsappNumber}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
              <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-xs font-mono uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li><Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-zinc-900 pt-6 text-center text-[11px] font-mono text-zinc-500">
          <p>© 2026 TRIADIX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
