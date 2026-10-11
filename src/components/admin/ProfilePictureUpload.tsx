'use client';

import { useState } from 'react';
import { User, Upload } from 'lucide-react';

export function ProfilePictureUpload({ currentUrl }: { currentUrl?: string | null }) {
  const [imageUrl, setImageUrl] = useState(currentUrl || '');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error subiendo imagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-6 mb-8 border-b border-zinc-900 pb-8">
      <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User className="w-7 h-7 text-zinc-600" />
        )}
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Foto de Perfil</h3>
        <p className="text-xs text-zinc-500 font-mono mb-3">Formato PNG, JPG o WEBP</p>
        <div className="relative inline-block overflow-hidden">
          <button 
            type="button" 
            disabled={loading} 
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors rounded-lg text-xs font-mono uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{loading ? 'Subiendo...' : 'Subir Imagen'}</span>
          </button>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>
        <input type="hidden" name="adminProfilePic" value={imageUrl} />
      </div>
    </div>
  );
}
