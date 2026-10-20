import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Heart,
  Music,
  Image as ImageIcon,
  Check,
  Eye,
  Send,
  ArrowLeft,
  Upload,
  Trash2,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { BouquetData, FlowerColorTheme } from '../types/bouquet';
import {
  FLOWER_COLOR_THEMES,
  MUSIC_PLAYLIST,
  LETTER_SUGGESTIONS,
  INTRO_TEXT_PRESETS,
  DEFAULT_BOUQUET
} from '../data/defaultBouquet';
import { GIFT_TEMPLATES } from '../data/templates';
import confetti from 'canvas-confetti';

interface BouquetCreatorProps {
  onSave: (data: BouquetData) => void;
  onPreview: (data: BouquetData) => void;
  onCancel: () => void;
  initialData?: BouquetData;
}

export const BouquetCreator: React.FC<BouquetCreatorProps> = ({
  onSave,
  onPreview,
  onCancel,
  initialData
}) => {
  const [introText, setIntroText] = useState(
    initialData?.introText || "Happy Vietnamese Women's Day 20/10"
  );
  const [flowerColor, setFlowerColor] = useState(initialData?.flowerColor || 'classic');
  const [letterTitle, setLetterTitle] = useState(
    initialData?.letterTitle || 'Gửi người tôi yêu thương nhất,'
  );
  const [letterContent, setLetterContent] = useState(
    Array.isArray(initialData?.letterContent)
      ? initialData?.letterContent.join('\n\n')
      : initialData?.letterContent || DEFAULT_BOUQUET.letterContent.join('\n\n')
  );
  const [letterSignature, setLetterSignature] = useState(
    initialData?.letterSignature || 'Một nửa của em 💞'
  );
  const [photos, setPhotos] = useState<string[]>(
    initialData?.vipPhotos || DEFAULT_BOUQUET.vipPhotos
  );
  const [musicType, setMusicType] = useState<'Sample' | 'Custom'>(
    initialData?.musicType || 'Sample'
  );
  const [selectedMusicUrl, setSelectedMusicUrl] = useState(
    initialData?.musicPath || '/assets/musics/danhchoem.mp3'
  );
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(
    initialData?.customMusic || null
  );

  // Audio Preview Player
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const togglePreviewAudio = () => {
    if (!previewAudioRef.current) return;
    const targetSrc = musicType === 'Custom' ? customAudioUrl : selectedMusicUrl;
    if (!targetSrc) return;

    if (previewAudioRef.current.src !== targetSrc) {
      previewAudioRef.current.src = targetSrc;
    }

    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch(() => {});
    }
  };

  // Image Upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Custom Audio Upload handler
  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setCustomAudioUrl(uploadEvent.target.result as string);
        setMusicType('Custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (indexToRemove: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const loadSamplePhotos = () => {
    setPhotos(DEFAULT_BOUQUET.vipPhotos);
  };

  const applyLetterSuggestion = (item: (typeof LETTER_SUGGESTIONS)[0]) => {
    setLetterTitle(item.title);
    setLetterContent(item.content.join('\n\n'));
    setLetterSignature(item.signature);
  };

  const loadTemplate = (tmpl: (typeof GIFT_TEMPLATES)[0]) => {
    setIntroText(tmpl.data.introText);
    setFlowerColor(tmpl.data.flowerColor);
    setLetterTitle(tmpl.data.letterTitle);
    setLetterContent(tmpl.data.letterContent.join('\n\n'));
    setLetterSignature(tmpl.data.letterSignature);
    setPhotos(tmpl.data.vipPhotos);
    if (tmpl.data.musicPath) setSelectedMusicUrl(tmpl.data.musicPath);
    setMusicType('Sample');
  };

  const constructBouquetData = (): BouquetData => {
    const paragraphs = letterContent
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    return {
      id: initialData?.id || Math.random().toString(36).substring(2, 14) + Date.now().toString(36),
      introText,
      flowerColor,
      letterTitle,
      letterContent: paragraphs.length > 0 ? paragraphs : ['Gửi người tôi yêu thương nhất.'],
      letterSignature,
      vipPhotos: photos.length > 0 ? photos : DEFAULT_BOUQUET.vipPhotos,
      musicType,
      musicPath: selectedMusicUrl,
      customMusic: musicType === 'Custom' ? customAudioUrl : null,
      isSavePermanent: true,
      createdAt: new Date().toISOString()
    };
  };

  const handlePreviewClick = () => {
    const data = constructBouquetData();
    onPreview(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = constructBouquetData();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch { /* ignore */ }
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-[#0d0714] text-white p-4 md:p-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Audio element for preview */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setIsPlayingPreview(false)}
        className="hidden"
      />

      <div className="max-w-4xl mx-auto pb-24">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-pink-500/20">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 text-pink-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại xem quà</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-['Pacifico',cursive] text-lg text-pink-300">
              Giftory Bouquet Studio
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-500 font-['Pacifico',cursive] tracking-wide mb-3">
            Tạo Bó Hoa Kỷ Niệm
          </h1>
          <p className="text-sm md:text-base text-pink-200/70 max-w-lg mx-auto">
            Tự tay thiết kế bó hoa điện tử với hiệu ứng mở khóa vân tay ma thuật, câu chúc ngàn sao, bức thư tình và ảnh kỉ niệm bay bổng!
          </p>
        </div>

        {/* Template Starter Quick Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-black/40 border border-pink-500/20">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-sm">✨</span>
            <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              Chọn mẫu có sẵn để điền nhanh (6 bản):
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {GIFT_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => loadTemplate(tmpl)}
                className="p-2.5 rounded-xl border border-pink-500/20 bg-white/5 hover:bg-pink-500/20 hover:border-pink-400 text-left transition-all hover:scale-105 flex flex-col items-center text-center group"
                title={tmpl.tagline}
              >
                <span className="text-xl mb-1 group-hover:scale-125 transition-transform">
                  {tmpl.icon}
                </span>
                <span className="text-[11px] font-bold text-white group-hover:text-pink-200 truncate w-full">
                  {tmpl.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ========================================================= */}
          {/* PHẦN 1: INTRO & TÔNG MÀU BÓ HOA */}
          {/* ========================================================= */}
          <div className="bg-[#170e24] border border-pink-500/20 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">1. Intro & Tông Màu Bó Hoa</h2>
                <p className="text-xs text-pink-300/70">
                  Câu chúc ngàn sao xuất hiện khi mở khóa và màu sắc cánh hoa
                </p>
              </div>
            </div>

            {/* Intro text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-pink-200 mb-2">
                Câu chúc mở đầu (Hiển thị dạng các vì sao lấp lánh):
              </label>
              <input
                type="text"
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
                placeholder="Ví dụ: Happy Vietnamese Women's Day 20/10"
                className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-2xl text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {INTRO_TEXT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setIntroText(preset)}
                    className="text-xs px-3 py-1 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 transition-all hover:scale-105"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-pink-200">
                  Chọn tông màu bó hoa:
                </label>
                <span className="text-xs font-bold text-pink-400 px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                  {FLOWER_COLOR_THEMES.find((t) => t.id === flowerColor)?.name || 'Hồng Tulip'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {FLOWER_COLOR_THEMES.map((theme) => {
                  const isSelected = flowerColor === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setFlowerColor(theme.id)}
                      className={`relative p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-pink-400 bg-gradient-to-b from-pink-500/20 to-pink-500/10 shadow-lg shadow-pink-500/20 scale-[1.02]'
                          : 'border-pink-500/20 bg-black/30 hover:border-pink-500/40 hover:bg-black/50'
                      }`}
                    >
                      {/* Check badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[11px] font-bold shadow-md">
                          <Check className="w-3 h-3" />
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-5 h-5 rounded-full shadow-inner border border-white/30"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                          }}
                        />
                        <span className="font-bold text-xs text-white truncate">
                          {theme.name}
                        </span>
                      </div>

                      <span className="text-[11px] text-pink-300/70 truncate">
                        {theme.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHẦN 2: THƯ TÌNH & NHẠC NỀN */}
          {/* ========================================================= */}
          <div className="bg-[#170e24] border border-pink-500/20 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">2. Thư Tình & Nhạc Nền</h2>
                <p className="text-xs text-pink-300/70">
                  Lá thư giấu trong bó hoa và giai điệu tình ca du dương
                </p>
              </div>
            </div>

            {/* Letter Title */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-pink-200 mb-2">
                Tiêu đề lá thư:
              </label>
              <input
                type="text"
                value={letterTitle}
                onChange={(e) => setLetterTitle(e.target.value)}
                placeholder="Gửi người anh thương nhất,"
                className="w-full px-4 py-2.5 bg-black/40 border border-pink-500/30 rounded-2xl text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            {/* Letter Suggestions */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-pink-300/90 block mb-2">
                💡 Gợi ý mẫu thư nhanh:
              </span>
              <div className="flex flex-wrap gap-2">
                {LETTER_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyLetterSuggestion(item)}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all hover:scale-105"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter Content */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-pink-200 mb-2">
                Nội dung bức thư (Mỗi đoạn cách nhau một dòng trống):
              </label>
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                rows={5}
                placeholder="Hãy viết những lời chân thành nhất gửi gắm đến người ấy..."
                className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-2xl text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-500 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]"
                required
              />
            </div>

            {/* Letter Signature */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-pink-200 mb-2">
                Chữ ký / Lời kết:
              </label>
              <input
                type="text"
                value={letterSignature}
                onChange={(e) => setLetterSignature(e.target.value)}
                placeholder="Một nửa của em 💞"
                className="w-full px-4 py-2.5 bg-black/40 border border-pink-500/30 rounded-2xl text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Music Picker */}
            <div className="pt-6 border-t border-pink-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-pink-400" />
                  <label className="text-sm font-semibold text-pink-200">
                    Nhạc nền lãng mạn:
                  </label>
                </div>

                {/* Preview music toggle */}
                <button
                  type="button"
                  onClick={togglePreviewAudio}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 transition-all"
                >
                  {isPlayingPreview ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-pink-400" />
                      <span>Dừng nghe thử</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-pink-400" />
                      <span>Nghe thử bài hát</span>
                    </>
                  )}
                </button>
              </div>

              {/* Music type options */}
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-pink-200 cursor-pointer">
                  <input
                    type="radio"
                    name="musicType"
                    checked={musicType === 'Sample'}
                    onChange={() => setMusicType('Sample')}
                    className="accent-pink-500"
                  />
                  <span>Chọn từ danh sách tình ca</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-pink-200 cursor-pointer">
                  <input
                    type="radio"
                    name="musicType"
                    checked={musicType === 'Custom'}
                    onChange={() => setMusicType('Custom')}
                    className="accent-pink-500"
                  />
                  <span>Tải file MP3 của riêng bạn</span>
                </label>
              </div>

              {musicType === 'Sample' ? (
                <div className="space-y-3">
                  <select
                    value={selectedMusicUrl}
                    onChange={(e) => {
                      setSelectedMusicUrl(e.target.value);
                      setIsPlayingPreview(false);
                    }}
                    className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-2xl text-white focus:outline-none focus:border-pink-500"
                  >
                    {MUSIC_PLAYLIST.map((song) => (
                      <option key={song.id} value={song.url} className="bg-neutral-900 text-white">
                        🎵 {song.name} {song.artist ? `— ${song.artist}` : ''} ({song.duration})
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MUSIC_PLAYLIST.slice(0, 6).map((song) => (
                      <button
                        key={song.id}
                        type="button"
                        onClick={() => {
                          setSelectedMusicUrl(song.url);
                          setIsPlayingPreview(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedMusicUrl === song.url
                            ? 'border-pink-400 bg-pink-500/20 text-white font-bold'
                            : 'border-white/10 bg-black/20 text-pink-200/80 hover:bg-black/40'
                        }`}
                      >
                        <div className="truncate font-medium">{song.name}</div>
                        <div className="text-[10px] text-pink-400/70 truncate">{song.artist}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-black/30 border border-dashed border-pink-500/40 text-center">
                  <input
                    type="file"
                    id="customMusicInput"
                    accept="audio/*"
                    onChange={handleCustomAudioUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="customMusicInput"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-semibold border border-pink-500/30 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Tải lên bài hát (.mp3, .m4a, .wav)</span>
                  </label>
                  {customAudioUrl && (
                    <p className="text-xs text-emerald-400 mt-2 font-medium">
                      ✓ Đã nạp bài hát tùy chỉnh thành công!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHẦN 3: ẢNH KỶ NIỆM (VIP PHOTOS) */}
          {/* ========================================================= */}
          <div className="bg-[#170e24] border border-pink-500/20 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">3. Kho Ảnh Kỷ Niệm</h2>
                  <p className="text-xs text-pink-300/70">
                    Những tấm ảnh Polaroid bay lên bầu trời sau khi đọc thư
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loadSamplePhotos}
                className="flex items-center gap-1.5 text-xs text-pink-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                title="Khôi phục lại ảnh mẫu mặc định"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Dùng ảnh mẫu</span>
              </button>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-pink-500/30 shadow-md"
                >
                  <img
                    src={url}
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="w-8 h-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-pink-200">
                    #{idx + 1}
                  </span>
                </div>
              ))}

              {/* Upload Card */}
              <label className="aspect-square rounded-2xl border-2 border-dashed border-pink-500/40 hover:border-pink-400 bg-pink-500/5 hover:bg-pink-500/10 flex flex-col items-center justify-center cursor-pointer transition-all p-3 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-pink-400 mb-1" />
                <span className="text-xs font-semibold text-pink-200">Thêm ảnh mới</span>
                <span className="text-[10px] text-pink-300/60 mt-0.5">Tải từ điện thoại/máy tính</span>
              </label>
            </div>
            <p className="text-xs text-pink-300/60">
              * Khuyến nghị thêm từ 3 đến 8 bức ảnh để hiệu ứng bay bổng sinh động nhất!
            </p>
          </div>

          {/* ========================================================= */}
          {/* ACTIONS: PREVIEW & CREATE GIFT LINK */}
          {/* ========================================================= */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0d0714]/90 backdrop-blur-md border-t border-pink-500/20 z-40">
            <div className="max-w-4xl mx-auto flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handlePreviewClick}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4 text-pink-400" />
                <span>Xem trước (Live Preview)</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-bold shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Tạo & Lưu quà tặng</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
