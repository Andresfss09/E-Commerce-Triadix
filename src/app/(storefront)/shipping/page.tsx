import { Metadata } from 'next';
import { Truck, RotateCcw, Clock, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Envíos y Devoluciones | TRIADIX Cali, Colombia',
  description: 'Políticas de despacho, tiempos de entrega y cambios con origen en Cali, Colombia.',
};

export default function ShippingPage() {
  return (
    <div className="bg-black text-zinc-300 min-h-screen py-16 px-4 md:px-8 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Truck className="w-3.5 h-3.5 text-white" />
            <span>Logística & Garantías · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Envíos, Cambios y Devoluciones
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Cada pieza de TRIADIX se despacha directamente desde nuestro taller y centro logístico en Cali, Colombia. Garantizamos entregas seguras y un proceso de cambios transparente bajo la legislación colombiana.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">Origen Cali</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Despachamos desde Cali, Colombia hacia todas las capitales y municipios del territorio nacional.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">2 - 4 Días Hábiles</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tiempos estándar para ciudades principales. Trayectos especiales de 4 a 7 días hábiles.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <RotateCcw className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">30 Días para Cambios</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tienes 30 días calendario por talla o referencia con prendas sin uso y marquillas intactas.
            </p>
          </div>
        </div>

        {/* Policies Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              1. Tiempos y Procesamiento de Despachos
            </h2>
            <p>
              Una vez formalizado el comprobante de pago por nuestros canales oficiales, tu orden entra a preparación en nuestras instalaciones en Cali, Colombia en un plazo máximo de 24 horas hábiles.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2">
              <li><strong className="text-zinc-200">Cali & Área Metropolitana:</strong> 1 a 2 días hábiles (disponibilidad de entrega prioritaria).</li>
              <li><strong className="text-zinc-200">Ciudades Principales (Bogotá, Medellín, Barranquilla, Bucaramanga):</strong> 2 a 4 días hábiles.</li>
              <li><strong className="text-zinc-200">Resto del país & Zonas especiales:</strong> 4 a 7 días hábiles vía transportadoras aliadas certificadas.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              2. Políticas de Cambio por Talla o Referencia
            </h2>
            <p>
              En TRIADIX queremos que tu ajuste sea impecable. Si necesitas cambiar de talla o color:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2">
              <li>Dispones de un plazo de <strong className="text-zinc-200">treinta (30) días calendario</strong> desde el recibo de la prenda.</li>
              <li>La prenda debe encontrarse intacta, limpia, sin señales de uso ni lavado, conservando sus marquillas y empaque original.</li>
              <li>El cliente asume los costos logísticos de retorno e reenvío, salvo que el cambio se deba a un error en el despacho o garantía de calidad atribuible a TRIADIX.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              3. Derecho de Retracto (Ley 1480 de 2011)
            </h2>
            <p>
              En conformidad con el artículo 47 del Estatuto del Consumidor de la República de Colombia, para compras efectuadas por canales digitales o a distancia:
            </p>
            <p className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed">
              El comprador podrá ejercer el derecho de retracto dentro de los <strong className="text-white">cinco (5) días hábiles</strong> siguientes a la entrega física de la prenda. El producto debe devolverse por los mismos medios y en las mismas condiciones en que fue recibido. Los costos de transporte de la devolución corren a cargo del consumidor. TRIADIX devolverá la totalidad del dinero sin deducciones dentro del plazo legal.
            </p>
          </section>

          {/* Contact Box */}
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase">¿Dudas con tu despacho?</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Escríbenos directamente a nuestra línea de atención para asistirte en tiempo real con tu número de guía.
              </p>
            </div>
            <Link
              href="https://wa.me/573215891398"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 transition-all font-mono font-bold text-xs uppercase tracking-wider rounded-xl whitespace-nowrap"
            >
              Contactar Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
