import React from 'react';
import { X, Sparkles, Check, Heart, Cake, Sun, Moon, Flame } from 'lucide-react';
import { GIFT_TEMPLATES, GiftTemplate } from '../data/templates';
import confetti from 'canvas-confetti';

interface TemplateSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: string;
  onSelectTemplate: (template: GiftTemplate) => void;
}

export const TemplateSwitcherModal: React.FC<TemplateSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeTemplateId,
  onSelectTemplate
}) => {
  if (!isOpen) return null;

  const handleSelect = (tmpl: GiftTemplate) => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch { /* ignore */ }
    onSelectTemplate(tmpl);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#191028] via-[#120a1f] to-[#0a0512] border border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl text-white custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Bộ Sưu Tập Quà Kỷ Niệm
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 font-['Pacifico',cursive]">
            Chọn Bản Mẫu Quà Tặng
          </h2>
          <p className="text-xs md:text-sm text-pink-200/70 mt-1 max-w-md mx-auto">
            Khám phá 6 phong cách quà tặng đặc sắc: từ bó hoa Tulip cổ điển, Hoa hồng nhung, Bánh kem sinh nhật đến Thả đèn trời điều ước!
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GIFT_TEMPLATES.map((tmpl) => {
            const isCurrent = activeTemplateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleSelect(tmpl)}
                className={`relative group p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  isCurrent
                    ? 'border-pink-400 bg-pink-500/20 shadow-lg shadow-pink-500/30 ring-2 ring-pink-400/50'
                    : 'border-pink-500/20 bg-black/40 hover:border-pink-500/50 hover:bg-black/60'
                }`}
              >
                {/* Active checkmark */}
                {isCurrent && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform">
                      {tmpl.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">
                        {tmpl.badge}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-pink-200 transition-colors">
                        {tmpl.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-pink-200/70 leading-relaxed mb-3 line-clamp-2">
                    {tmpl.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-pink-400 font-medium truncate max-w-[170px]">
                    {tmpl.data.introText}
                  </span>
                  <button
                    type="button"
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
                      isCurrent
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/10 group-hover:bg-pink-500 group-hover:text-white text-pink-200'
                    }`}
                  >
                    {isCurrent ? 'Đang chọn' : 'Áp dụng'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
