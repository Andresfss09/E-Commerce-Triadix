'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('triadix-cookie-consent');
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('triadix-cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-4 shadow-lg md:p-6">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground flex-1">
          <p>
            Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y mostrarte contenido personalizado. Al continuar navegando, aceptas nuestra{' '}
            <a href="/privacy" className="underline hover:text-primary">
              Política de Tratamiento de Datos Personales
            </a>{' '}
            y uso de cookies.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 w-full md:w-auto">
          <Button onClick={acceptCookies} className="w-full md:w-auto">
            Aceptar Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}

