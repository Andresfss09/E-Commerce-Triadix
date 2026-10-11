'use client';

import { useState, useTransition } from 'react';
import { updateStoreSettings } from '@/app/actions/settings';
import { ProfilePictureUpload } from '@/components/admin/ProfilePictureUpload';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Megaphone, 
  Save, 
  User, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

type SettingsFormProps = {
  config: {
    whatsappNumber?: string | null;
    contactEmail?: string | null;
    instagramUrl?: string | null;
    announcementBar?: string | null;
    adminProfilePic?: string | null;
  } | null;
};

export function SettingsForm({ config }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [announcementPreview, setAnnouncementPreview] = useState(
    config?.announcementBar || '¡Envío gratis por compras superiores a $150.000 COP!'
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(false);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateStoreSettings(formData);
      if (res.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 font-mono text-xs shadow-xl">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>¡Parámetros actualizados con éxito! Los cambios se sincronizaron en PostgreSQL y ya están visibles en la tienda en tiempo real.</span>
        </div>
      )}

      {/* Module 1: Admin Profile Card */}
      <div className="p-6 md:p-8 bg-zinc-950/70 border border-zinc-900 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            SECCIÓN 01 // IDENTIDAD
          </span>
          <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            <span>Perfil de Administrador</span>
          </h2>
        </div>

        <ProfilePictureUpload currentUrl={config?.adminProfilePic} />
      </div>

      {/* Module 2: Official Contact Channels */}
      <div className="p-6 md:p-8 bg-zinc-950/70 border border-zinc-900 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            SECCIÓN 02 // CANALES DE VENTA Y CONVERSIÓN
          </span>
          <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp & Correo de Notificaciones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <span>Línea Oficial de WhatsApp</span>
              <span className="text-emerald-400 font-bold">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                name="whatsappNumber" 
                defaultValue={config?.whatsappNumber || ''} 
                className="w-full bg-black/60 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-all" 
                placeholder="573215891398"
                required
              />
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              Número internacional sin signos '+' ni espacios (ej. 573215891398). Aquí se reciben todas las órdenes del checkout.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <span>Correo Oficial de Notificaciones</span>
            </label>
            <input 
              type="email" 
              name="contactEmail" 
              defaultValue={config?.contactEmail || ''} 
              className="w-full bg-black/60 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-all" 
              placeholder="contacto@triadix.com"
            />
            <p className="text-[11px] text-zinc-500 font-mono">
              Mostrado en la sección de atención al cliente y soporte.
            </p>
          </div>
        </div>
      </div>

      {/* Module 3: Digital Presence & Social Media */}
      <div className="p-6 md:p-8 bg-zinc-950/70 border border-zinc-900 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            SECCIÓN 03 // PRESENCIA DIGITAL
          </span>
          <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
            <InstagramIcon className="w-4 h-4 text-purple-400" />
            <span>Redes Sociales de la Marca</span>
          </h2>
        </div>

        <div className="space-y-2 max-w-xl">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
            URL de Perfil de Instagram
          </label>
          <input 
            type="url" 
            name="instagramUrl" 
            defaultValue={config?.instagramUrl || ''} 
            className="w-full bg-black/60 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-all" 
            placeholder="https://instagram.com/triadix"
          />
          <p className="text-[11px] text-zinc-500 font-mono">
            Enlace directo al perfil que se desplegará en el footer de la plataforma.
          </p>
        </div>
      </div>

      {/* Module 4: Live Storefront Announcement Bar */}
      <div className="p-6 md:p-8 bg-zinc-950/70 border border-zinc-900 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-zinc-900 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            SECCIÓN 04 // CINTILLO SUPERIOR DE LA TIENDA
          </span>
          <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Barra de Anuncios en la Portada</span>
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Texto del Mensaje Promocional
            </label>
            <input 
              type="text" 
              name="announcementBar" 
              value={announcementPreview}
              onChange={(e) => setAnnouncementPreview(e.target.value)}
              className="w-full bg-black/60 border border-zinc-800 focus:border-white focus:ring-1 focus:ring-white rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-zinc-600 transition-all" 
              placeholder="¡Envío gratis por compras superiores a $150.000 COP!"
            />
            <p className="text-[11px] text-zinc-500 font-mono">
              Aparece en la parte más alta de toda la tienda web pública con tipografía editorial.
            </p>
          </div>

          {/* Live Preview of the Announcement */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Previsualización en Vivo del Encabezado:
            </span>
            <div className="py-2.5 px-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-center text-xs md:text-sm text-zinc-200 font-cursive tracking-wider shadow-inner flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>{announcementPreview || 'Sin anuncio activo'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating or Bottom Action Bar */}
      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Sincronización en tiempo real con Postgres</span>
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          size="lg"
          className="bg-white hover:bg-zinc-200 text-black font-mono font-bold tracking-wider uppercase text-xs rounded-xl px-8 py-6 shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? 'Guardando en Base de Datos...' : 'Guardar Cambios'}</span>
        </Button>
      </div>
    </form>
  );
}
