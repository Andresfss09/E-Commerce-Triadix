import { Metadata } from 'next';
import { HelpCircle, CreditCard, Truck, RotateCcw, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | TRIADIX Cali, Colombia',
  description: 'Respuestas a las preguntas habituales sobre envíos, pagos y pedidos en TRIADIX Cali, Colombia.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: '¿Cómo realizo una compra en TRIADIX?',
      a: 'Selecciona las prendas y tallas que deseas, agrégalas a tu bolsa y haz clic en "Continuar Pedido". Completa tus datos de envío en el checkout y serás redirigido a nuestro canal oficial de WhatsApp con tu orden resumida para confirmar el pago de inmediato.',
    },
    {
      q: '¿Desde dónde despachan y cuáles son los tiempos de entrega?',
      a: 'Todos nuestros despachos se originan desde nuestro centro de operaciones en Cali, Colombia. Para Cali y el Valle del Cauca las entregas tardan de 1 a 2 días hábiles; para principales ciudades (Bogotá, Medellín, Barranquilla) de 2 a 4 días hábiles, y de 4 a 7 días hábiles para el resto del territorio nacional.',
    },
    {
      q: '¿Qué medios de pago aceptan?',
      a: 'Aceptamos transferencias bancarias a través de Bancolombia, Nequi y Daviplata. Todas las transacciones se verifican directamente a través de nuestro canal de WhatsApp para brindarte atención personalizada y comprobante instantáneo.',
    },
    {
      q: '¿Puedo solicitar cambio de talla o color?',
      a: 'Sí. Cuentas con un plazo de hasta treinta (30) días calendario tras recibir tu pedido para solicitar cambio por talla o referencia, siempre que la prenda se encuentre en perfecto estado, sin uso y con sus etiquetas originales.',
    },
    {
      q: '¿Tienen tienda física en Cali, Colombia?',
      a: 'Actualmente operamos como estudio de diseño y taller digital con base en Cali, Colombia, realizando entregas locales prioritarias y despachos a nivel nacional a través de transportadoras certificadas.',
    },
  ];

  return (
    <div className="bg-black text-zinc-300 min-h-screen py-16 px-4 md:px-8 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-900 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Centro de Ayuda · Cali, Colombia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Preguntas Frecuentes
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Todo lo que necesitas saber sobre nuestros procesos de compra, métodos de pago, despachos desde Cali, Colombia y garantías.
          </p>
        </div>

        {/* Accordion / FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-2xl hover:border-zinc-800 transition-colors space-y-2"
            >
              <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                {faq.q}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              ¿Aún tienes preguntas?
            </h3>
            <p className="text-xs text-zinc-400">
              Nuestro equipo en Cali, Colombia está listo para asistirte directamente en WhatsApp.
            </p>
          </div>
          <Link
            href="https://wa.me/573215891398"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-all font-mono font-bold text-xs uppercase tracking-wider rounded-xl whitespace-nowrap inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hablar por WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
