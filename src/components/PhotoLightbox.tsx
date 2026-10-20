import React from 'react';
import { X, Heart, Download } from 'lucide-react';

interface PhotoLightboxProps {
  photoUrl: string | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photoUrl, onClose }) => {
  if (!photoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-neutral-900 border border-pink-500/30 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:text-pink-300 flex items-center justify-center transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
          <img
            src={photoUrl}
            alt="Ảnh kỉ niệm"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full flex items-center justify-between mt-4 px-2 text-pink-200 text-sm">
          <div className="flex items-center gap-1.5 font-['Dancing_Script',cursive] text-lg font-bold text-pink-400">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>Kỷ niệm đong đầy yêu thương</span>
          </div>

          <a
            href={photoUrl}
            download="ky_niem.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải về</span>
          </a>
        </div>
      </div>
    </div>
  );
};
