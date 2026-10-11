import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales | TRIADIX',
  description: 'Conoce los lineamientos de privacidad, recolección y tratamiento de datos personales de TRIADIX conforme a la Ley 1581 de 2012.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen text-foreground py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-zinc-900 pb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la tienda</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Documento Legal Vigente</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Política de Tratamiento de Datos Personales
          </h1>
          <p className="text-zinc-400 font-mono text-xs">
            En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Habeas Data) • República de Colombia
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              1. Identificación del Responsable del Tratamiento
            </h2>
            <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2 font-mono text-xs text-zinc-400">
              <p><strong className="text-white">Razón Social:</strong> TRIADIX Streetwear</p>
              <p><strong className="text-white">Domicilio Principal:</strong> Colombia</p>
              <p><strong className="text-white">Canal Oficial de Atención:</strong> Sección de Contacto y Soporte Web</p>
              <p><strong className="text-white">Alcance:</strong> Usuarios, compradores y visitantes de la plataforma virtual www.triadix.co</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              2. Principios Rectores
            </h2>
            <p>
              TRIADIX aplica de manera estricta los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad en todos los procesos de recolección, almacenamiento, uso y circulación de información de clientes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              3. Datos Recolectados y Finalidad del Tratamiento
            </h2>
            <p>
              Al realizar pedidos en nuestra tienda, TRIADIX recopila datos personales indispensables para la operación comercial, tales como nombre completo, número de teléfono/WhatsApp, ciudad y dirección exacta de despacho, y notas de entrega.
            </p>
            <p>La información recolectada tiene como finalidades exclusivas:</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2">
              <li>Coordinar el despacho físico, transporte y entrega efectiva de las prendas adquiridas en territorio colombiano.</li>
              <li>Notificar el estado en tiempo real de la orden, números de guía y confirmación de recepción.</li>
              <li>Prestar soporte postventa, cambios de talla o solicitudes de garantía bajo el Estatuto del Consumidor (Ley 1480 de 2011).</li>
              <li>Atender requerimientos judiciales o administrativos debidamente fundados en la ley colombiana.</li>
              <li>Remitir comunicaciones promocionales exclusivas, lanzamientos de colecciones y descuentos únicamente si media autorización expresa del titular.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              4. Derechos de los Titulares (Habeas Data)
            </h2>
            <p>
              De conformidad con el artículo 8 de la Ley 1581 de 2012, usted, en calidad de titular de la información, tiene derecho a:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg">
                <h3 className="font-bold text-white text-xs font-mono uppercase mb-1">Conocer y Actualizar</h3>
                <p className="text-xs text-zinc-400">Acceder de forma gratuita a sus datos personales y solicitar su rectificación cuando sean inexactos, incompletos o fraccionados.</p>
              </div>
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg">
                <h3 className="font-bold text-white text-xs font-mono uppercase mb-1">Supresión y Revocatoria</h3>
                <p className="text-xs text-zinc-400">Solicitar la eliminación definitiva de sus datos cuando considere que no se respetan los principios legales o contractuales.</p>
              </div>
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg">
                <h3 className="font-bold text-white text-xs font-mono uppercase mb-1">Prueba de Autorización</h3>
                <p className="text-xs text-zinc-400">Exigir constancia de la autorización concedida para el tratamiento de su información personal.</p>
              </div>
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg">
                <h3 className="font-bold text-white text-xs font-mono uppercase mb-1">Reclamos ante la SIC</h3>
                <p className="text-xs text-zinc-400">Presentar quejas ante la Superintendencia de Industria y Comercio una vez agotado el trámite directo con TRIADIX.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              5. Procedimiento para Consultas y Reclamos
            </h2>
            <p>
              Para ejercer cualquiera de sus derechos, podrá radicar una solicitud a través de nuestros canales de atención oficiales indicando su nombre completo, número de documento de identidad, descripción clara de la petición y los datos de contacto para la respuesta.
            </p>
            <p className="text-zinc-400 text-xs font-mono">
              Tiempo máximo de respuesta: Quince (15) días hábiles conforme a los términos legales estipulados por la Superintendencia de Industria y Comercio.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              6. Seguridad y Confidencialidad
            </h2>
            <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl flex items-start gap-4">
              <Lock className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                TRIADIX implementa protocolos de cifrado y estrictas políticas de control de acceso. En ningún caso vendemos, alquilamos ni transferimos sus datos personales a terceros no autorizados con propósitos ajenos a la prestación del servicio logístico y comercial de la tienda.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              7. Vigencia de las Bases de Datos
            </h2>
            <p>
              Las bases de datos conservarán la información durante el tiempo razonable y necesario para cumplir las finalidades del tratamiento y las obligaciones fiscales, contables y mercantiles exigidas por la normatividad colombiana.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <footer className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 TRIADIX. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link href="/" className="hover:text-white transition-colors">Tienda Oficial</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
