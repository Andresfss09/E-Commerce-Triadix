import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, Shield, Scissors } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros | Origen Cali, Colombia | TRIADIX',
  description: 'Conoce la historia, visión y confección de TRIADIX. Streetwear minimalista nacido en las calles de Cali, Colombia.',
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-foreground pb-24 selection:bg-white selection:text-black">
      {/* Hero Manifesto */}
      <section className="border-b border-zinc-900 bg-zinc-950/40 py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-300" />
            <span>Nacidos en Cali, Colombia</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
            El Asfalto de Cali <br className="hidden md:inline" />
            <span className="text-zinc-500">Hecho Prenda.</span>
          </h1>

          <p className="text-zinc-300 font-sans text-base md:text-xl font-light leading-relaxed max-w-3xl">
            TRIADIX nace en <strong className="text-white font-medium">Cali, Colombia</strong>, donde la energía de la calle, la arquitectura brutalista y el minimalismo oscuro convergen. No seguimos tendencias efímeras; creamos piezas de culto diseñadas para resistir y destacar.
          </p>
        </div>
      </section>

      {/* Main Narrative & Values */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl py-20 space-y-24">
        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              01 // NUESTRO ORIGEN
            </div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              Cali como Epicentro Creativo
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Cali siempre ha sido una ciudad de movimiento, resistencia y estilo propio. Desde los talleres locales en el Valle del Cauca hasta el diseño de cada patrón, cada prenda de TRIADIX se concibe, corta y confecciona pensando en el clima, la silueta y la autenticidad urbana de nuestro país.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Combinamos el orgullo de la manufactura local con una visión estética global: tonos monocromáticos, tejidos pesados y cortes que dan libertad absoluta.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden relative p-6 md:p-8 flex flex-col justify-between group hover:border-zinc-800 transition-all space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">ESTUDIO CENTRAL</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">TRIADIX HEADQUARTERS</h3>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cra 15a #33b-69, Cali, Colombia</span>
              </div>
              <p className="text-[11px] font-mono text-zinc-500">Envíos a todo el territorio nacional</p>
            </div>

            {/* Google Maps Embed (Sin costo de API) */}
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-inner group/map">
              <iframe
                title="Ubicación TRIADIX Headquarters Cali"
                src="https://maps.google.com/maps?q=Cra%2015a%20%23%2033b-69%2C%20Cali%2C%20Valle%20del%20Cauca%2C%20Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[30%] contrast-[1.05] hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Cra+15a+%23+33b-69,+Cali,+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-zinc-700 hover:border-zinc-500 text-[10px] font-mono text-zinc-300 hover:text-white rounded-lg flex items-center gap-1 transition-all shadow-lg"
              >
                <span>Ver en Google Maps</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>
            
            <div className="border-t border-zinc-900 pt-5 space-y-2.5 font-mono text-xs text-zinc-500">
              <div className="flex justify-between">
                <span>DIRECCIÓN:</span>
                <span className="text-zinc-300 font-semibold">Cra 15a #33b-69</span>
              </div>
              <div className="flex justify-between">
                <span>CIUDAD:</span>
                <span className="text-zinc-300">Cali, Valle del Cauca</span>
              </div>
              <div className="flex justify-between">
                <span>CONFECCIÓN:</span>
                <span className="text-zinc-300">100% Colombiana</span>
              </div>
              <div className="flex justify-between">
                <span>ESTILO:</span>
                <span className="text-zinc-300">Dark Minimalist Oversize</span>
              </div>
              <div className="flex justify-between">
                <span>DISTRIBUCIÓN:</span>
                <span className="text-zinc-300">Nacional e Internacional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              02 // PILARES DE CALIDAD
            </div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              Por Qué Elegir TRIADIX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Scissors className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">Alto Gramaje Textil</h3>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                Utilizamos telas de algodón pesado de 240g a 320g que mantienen su caída estructurada, peso y textura lavado tras lavado.
              </p>
            </div>

            <div className="p-8 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">Cortes Boxy & Oversize</h3>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                Patrones exclusivos con hombros caídos y proporciones arquitectónicas pensadas para favorecer cualquier tipo de cuerpo.
              </p>
            </div>

            <div className="p-8 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-800 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">Hecho en Cali, Colombia</h3>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                Apoyamos de forma directa la mano de obra colombiana y el talento de los talleres textiles locales del Valle del Cauca.
              </p>
            </div>
          </div>
        </div>

        {/* Cursive Quote Section */}
        <div className="p-12 md:p-16 bg-gradient-to-b from-zinc-950 to-black border border-zinc-900 rounded-3xl text-center space-y-6">
          <p className="font-[family-name:var(--font-cursive)] text-3xl md:text-5xl text-zinc-200 leading-snug">
            «La ropa urbana no se trata de seguir a los demás, sino de tener la identidad para definir tu propio camino.»
          </p>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            — Manifiesto TRIADIX • Cali, Colombia
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6 pt-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            ¿Listo para elevar tu estilo?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Explora las piezas de nuestra última colección con despachos directos desde Cali a toda Colombia.
          </p>
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all shadow-lg hover:scale-105"
            >
              <span>Ver Colección Completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
