import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { images: true },
    take: 8,
  });

  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-background to-background z-0" />
        
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 text-white drop-shadow-2xl">
              Rompe <br className="md:hidden" />
              <span className="text-zinc-500">Las Reglas.</span>
            </h1>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ease-out fill-mode-both">
            <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Streetwear premium diseñado desde cero en Cali, Colombia. Exclusividad y estilo para las calles.
            </p>
          </div>

          <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 ease-out fill-mode-both">
            <Link 
              href="/catalog" 
              className={buttonVariants({ 
                size: "lg", 
                className: "bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-none font-bold tracking-widest group" 
              })}
            >
              EXPLORAR COLECCIÓN
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-in fade-in duration-1000">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Nuevos<br/>Lanzamientos</h2>
          </div>
          <Link href="/catalog" className="hidden md:flex items-center text-zinc-400 hover:text-white transition-colors group uppercase tracking-widest text-sm font-bold mt-4 md:mt-0">
            Ver Todo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.map((product, i) => (
            <Link 
              key={product.id} 
              href={`/product/${product.slug}`} 
              className="group block animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-both"
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="aspect-[3/4] bg-zinc-900 overflow-hidden relative mb-6 border border-zinc-800">
                {product.images[0] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-sm">NOT_FOUND</div>
                )}
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg leading-tight uppercase tracking-wide group-hover:text-zinc-300 transition-colors">{product.name}</h3>
                <p className="text-zinc-400 font-mono">${Number(product.basePrice).toLocaleString('es-CO')}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/catalog" className={buttonVariants({ variant: "outline", className: "w-full rounded-none border-zinc-800 hover:bg-zinc-900 uppercase tracking-widest text-xs" })}>
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/50 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-both">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto text-2xl font-serif italic">01</div>
              <h3 className="font-bold text-xl uppercase tracking-widest">Envíos Nacionales</h3>
              <p className="text-zinc-500 font-light leading-relaxed max-w-xs mx-auto">Despachos directos desde Cali a cada rincón de Colombia. Cobertura garantizada.</p>
            </div>
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto text-2xl font-serif italic">02</div>
              <h3 className="font-bold text-xl uppercase tracking-widest">Checkout Ágil</h3>
              <p className="text-zinc-500 font-light leading-relaxed max-w-xs mx-auto">Finaliza tu compra al instante a través de WhatsApp. Sin complicaciones.</p>
            </div>
            <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <div className="w-16 h-16 bg-white text-black flex items-center justify-center mx-auto text-2xl font-serif italic">03</div>
              <h3 className="font-bold text-xl uppercase tracking-widest">Material Premium</h3>
              <p className="text-zinc-500 font-light leading-relaxed max-w-xs mx-auto">Telas seleccionadas, cortes exactos y detalles que marcan la diferencia.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
