import React, { useEffect, useState, useRef } from 'react';
import { X, Copy, Check, Download, Share2, MessageCircle, Send } from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftId: string;
  bouquetTitle?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  giftId,
  bouquetTitle = "Bó Hoa Kỷ Niệm"
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const shareUrl = `${window.location.origin}${window.location.pathname}?id=${giftId}`;

  useEffect(() => {
    if (isOpen && giftId) {
      QRCode.toDataURL(shareUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#9d174d',
          light: '#ffffff'
        }
      })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error('QR code error', err));
    }
  }, [isOpen, giftId, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch { /* ignore */ }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `bo_hoa_giftory_${giftId.substring(0, 8)}.png`;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-gradient-to-b from-[#181024] to-[#0d0714] border border-pink-500/30 rounded-3xl p-6 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 mb-3 shadow-lg shadow-pink-500/30">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Pacifico',cursive]">
            Gửi Tặng Bó Hoa Kỷ Niệm
          </h3>
          <p className="text-xs text-pink-200/70 mt-1">
            Gửi link này hoặc quét mã QR để người ấy mở món quà bất ngờ!
          </p>
        </div>

        {/* QR Code */}
        {qrDataUrl && (
          <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-pink-500/20 mb-5">
            <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
              <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 object-contain" />
            </div>
            <button
              onClick={handleDownloadQR}
              className="flex items-center gap-1.5 text-xs text-pink-300 hover:text-pink-100 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải ảnh mã QR về máy</span>
            </button>
          </div>
        )}

        {/* Copy Link Input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
            Đường dẫn quà tặng trực tiếp:
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-black/40 border border-pink-500/30 rounded-xl">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-pink-100 px-2 py-1 flex-1 outline-none font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-xs font-semibold text-pink-300/80 mb-2 text-center">
            Chia sẻ nhanh qua:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-xs text-blue-200 transition-colors"
            >
              <span>Facebook</span>
            </a>
            <a
              href={`https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/40 border border-sky-500/30 text-xs text-sky-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Zalo</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Món quà đặc biệt dành riêng cho bạn: ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-xs text-emerald-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
