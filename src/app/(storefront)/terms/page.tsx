import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso y Compra | TRIADIX',
  description: 'Conoce los términos, condiciones, políticas de despacho, garantías y derecho de retracto de TRIADIX conforme al Estatuto del Consumidor (Ley 1480 de 2011).',
};

export default function TermsPage() {
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
              <Scale className="w-5 h-5 text-zinc-300" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Marco Contractual y Comercial</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Términos y Condiciones de Uso y Compra
          </h1>
          <p className="text-zinc-400 font-mono text-xs">
            Regulado bajo el Estatuto del Consumidor (Ley 1480 de 2011) de la República de Colombia
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              1. Aceptación y Ámbito de Aplicación
            </h2>
            <p>
              El presente documento establece los términos y condiciones generales aplicables al acceso, navegación y adquisición de prendas y accesorios a través del portal de comercio electrónico de <strong className="text-white">TRIADIX</strong> en el territorio de la República de Colombia.
            </p>
            <p>
              Al navegar en este sitio o iniciar el proceso de checkout y confirmación de pedidos, el usuario manifiesta haber leído, comprendido y aceptado en su totalidad estas disposiciones.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              2. Precios, Moneda y Facturación
            </h2>
            <p>
              Todos los precios exhibidos en la plataforma virtual están expresados en <strong className="text-white">Pesos Colombianos (COP)</strong> e incluyen los impuestos legalmente aplicables conforme a la legislación tributaria colombiana. Los precios están sujetos a modificación sin previo aviso; no obstante, el valor facturado al cliente corresponderá invariablemente al publicado al momento de confirmar la orden de compra.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              3. Proceso de Pedidos y Medios de Pago
            </h2>
            <p>
              Las compras en TRIADIX se tramitan a través de nuestra pasarela de solicitud conectada directamente con nuestros asesores comerciales vía canal oficial verificado.
            </p>
            <p>
              Los métodos de pago aceptados comprenden transferencias bancarias directas (Bancolombia, Nequi, Daviplata) y pasarelas de pago electrónico autorizadas. La orden solo se considerará confirmada y programada para despacho una vez el comprobante de pago sea verificado y conciliado por nuestro equipo de tesorería.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              4. Política de Envíos y Tiempos de Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Cobertura Nacional</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Despachamos desde nuestro centro logístico en Cali, Colombia a las principales ciudades y municipios del país a través de empresas transportadoras aliadas certificadas (Coordinadora, Servientrega, Envia).
                </p>
              </div>

              <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Tiempos de Entrega</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Ciudades principales: 2 a 4 días hábiles. Trayectos especiales o reexpediciones: 4 a 7 días hábiles contados a partir de la confirmación formal del pago.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              5. Derecho de Retracto (Ley 1480 de 2011)
            </h2>
            <div className="p-5 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-white font-mono font-bold text-xs uppercase">
                <RefreshCcw className="w-4 h-4 text-zinc-300" />
                <span>Término Legal de 5 Días</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                De conformidad con el artículo 47 de la Ley 1480 de 2011, en los contratos para la venta de bienes mediante métodos a distancia o por medios no tradicionales, el consumidor tendrá derecho a ejercer el retracto dentro de los <strong className="text-white">cinco (5) días hábiles</strong> siguientes a la entrega del producto.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Condiciones: La prenda debe ser devuelta en las mismas condiciones en que fue recibida, sin uso, sin lavar, con marquillas intactas y en su empaque original. Los costos de transporte por concepto de retracto serán asumidos por el consumidor según lo dispuesto por la ley.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              6. Políticas de Cambios de Talla y Garantía de Calidad
            </h2>
            <p>
              <strong className="text-white">Garantía Legal:</strong> Todas nuestras prendas cuentan con un periodo de garantía por defectos de confección o confección textil de treinta (30) días calendario. La garantía no cubre el desgaste natural de la prenda ni daños ocasionados por lavado inadecuado o uso indebido.
            </p>
            <p>
              <strong className="text-white">Cambios por Talla:</strong> Si la talla seleccionada no es la adecuada, el cliente podrá solicitar cambio dentro de los diez (10) días hábiles posteriores a la recepción, sujeto a disponibilidad en el inventario de bodega.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              7. Propiedad Intelectual
            </h2>
            <p>
              Todos los diseños, logotipos, imágenes, fotografías de campañas, textos, código fuente y elementos gráficos que componen la plataforma son de propiedad exclusiva de <strong className="text-white">TRIADIX</strong> o cuentan con las respectivas licencias de uso. Queda prohibida su reproducción total o parcial sin autorización previa y por escrito.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white border-l-2 border-white pl-4">
              8. Legislación Aplicable y Resolución de Controversias
            </h2>
            <p>
              Estos términos y condiciones se rigen e interpretan con arreglo a las leyes de la República de Colombia. Cualquier controversia derivada del presente contrato que no pueda ser resuelta directamente entre las partes se someterá a los jueces ordinarios competentes o a las facultades jurisdiccionales de la Superintendencia de Industria y Comercio (SIC).
            </p>
          </section>
        </div>

        {/* Footer info */}
        <footer className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 TRIADIX. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/" className="hover:text-white transition-colors">Tienda Oficial</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
