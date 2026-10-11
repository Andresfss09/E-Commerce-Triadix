import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { ArrowRight, Sparkles } from 'lucide-react';

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { images: true },
    take: 8,
  });

  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-zinc-900">
        {/* Background Streetwear Editorial Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/hero-streetwear.jpg"
            alt="TRIADIX Streetwear Colectivo Cali"
            fill
            priority
            quality={95}
            className="object-cover object-center filter brightness-[0.70] contrast-[1.10] scale-[1.02] transform transition-transform duration-1000 ease-out"
          />
          {/* Multi-layered cinematic shadows & vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)]" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 md:space-y-8 px-4 max-w-5xl mx-auto py-20">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-zinc-300 shadow-2xl mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DISEÑO INDEPENDIENTE · CALI, COLOMBIA</span>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 ease-out fill-mode-both">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-[0.9]">
              Rompe <br className="md:hidden" />
              <span className="text-zinc-400">Las Reglas.</span>
            </h1>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ease-out fill-mode-both">
            <p className="text-base sm:text-lg md:text-2xl text-zinc-200/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Streetwear premium diseñado desde cero en Cali, Colombia. Exclusividad y estilo para las calles.
            </p>
          </div>

          <div className="pt-4 md:pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 ease-out fill-mode-both">
            <Link 
              href="/catalog" 
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-black hover:bg-zinc-200 font-mono font-black text-xs md:text-sm tracking-widest uppercase transition-all duration-300 shadow-2xl hover:scale-105 group rounded-xl"
            >
              <span>EXPLORAR COLECCIÓN</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
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
