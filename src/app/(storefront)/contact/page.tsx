import { Metadata } from 'next';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto | TRIADIX',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573185753889'}?text=Hola%20TRIADIX,%20necesito%20ayuda%20con...`;

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Contáctanos</h1>
      <p className="text-lg text-muted-foreground mb-10">
        ¿Tienes dudas sobre tallas, envíos o quieres saber más sobre tu pedido? 
        Escríbenos directamente y te responderemos lo más pronto posible.
      </p>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
        Escribir por WhatsApp
      </a>

      <div className="mt-12 text-sm text-muted-foreground">
        <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 AM a 6:00 PM</p>
        <p className="mt-2">También puedes visitar nuestra sección de <Link href="/faq" className="underline text-primary">Preguntas Frecuentes</Link>.</p>
      </div>
    </div>
  );
}

