import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, Share2, Sparkles, PlusCircle } from 'lucide-react';
import { BouquetData } from '../types/bouquet';
import { DEFAULT_BOUQUET } from '../data/defaultBouquet';
import confetti from 'canvas-confetti';

interface BouquetViewerProps {
  data: BouquetData;
  templateType?: string;
  onSwitchTemplate?: () => void;
  onCreateNew?: () => void;
  onShare?: () => void;
  onPhotoClick?: (photoUrl: string) => void;
  isInlinePreview?: boolean;
}

export const BouquetViewer: React.FC<BouquetViewerProps> = ({
  data,
  templateType = 'tulip_classic',
  onSwitchTemplate,
  onCreateNew,
  onShare,
  onPhotoClick,
  isInlinePreview = false
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isBloomed, setIsBloomed] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [guideText, setGuideText] = useState('Ấn giữ để mở quà');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isFlyingPhotos, setIsFlyingPhotos] = useState(false);
  const [floatingPhotos, setFloatingPhotos] = useState<Array<{
    id: string;
    url: string;
    left: number;
    delay: number;
    duration: number;
    rotation: number;
    isCaught?: boolean;
    x?: number;
    y?: number;
  }>>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pressTimerRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const floatingTimerRef = useRef<number | null>(null);

  // Set real viewport height --app-h
  useEffect(() => {
    const updateAppH = () => {
      const h = window.innerHeight;
      document.documentElement.style.setProperty('--app-h', `${h}px`);
    };
    updateAppH();
    window.addEventListener('resize', updateAppH);
    window.addEventListener('orientationchange', updateAppH);
    return () => {
      window.removeEventListener('resize', updateAppH);
      window.removeEventListener('orientationchange', updateAppH);
    };
  }, []);

  // Update audio source when data changes
  useEffect(() => {
    if (audioRef.current) {
      const src = data.customMusic || data.musicPath || '/assets/musics/danhchoem.mp3';
      if (audioRef.current.src !== src) {
        audioRef.current.src = src;
      }
    }
  }, [data.musicPath, data.customMusic]);

  // Audio controls
  const togglePlayMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Stop flying photos
  const stopFloatingPhotos = useCallback(() => {
    setIsFlyingPhotos(false);
    if (floatingTimerRef.current) {
      clearInterval(floatingTimerRef.current);
      floatingTimerRef.current = null;
    }
  }, []);

  // Start spawning floating photos that drift up into the night sky
  const startFloatingPhotos = useCallback(() => {
    setIsFlyingPhotos(true);
    const photos = (data.vipPhotos && data.vipPhotos.length > 0)
      ? data.vipPhotos
      : DEFAULT_BOUQUET.vipPhotos;

    let index = 0;
    const spawnPhoto = () => {
      const url = photos[index % photos.length];
      index++;
      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const left = Math.floor(Math.random() * 66) + 12; // 12% to 78% width
      const duration = Math.floor(Math.random() * 3) + 8; // 8s to 11s float time
      const rotation = (Math.random() * 26) - 13; // -13deg to +13deg tilt

      setFloatingPhotos(prev => [
        ...prev.slice(-14), // keep last 15
        { id, url, left, delay: 0, duration, rotation }
      ]);
    };

    // Spawn first batches with staggered delay
    spawnPhoto();
    setTimeout(spawnPhoto, 800);
    setTimeout(spawnPhoto, 1800);

    if (floatingTimerRef.current) clearInterval(floatingTimerRef.current);
    floatingTimerRef.current = window.setInterval(spawnPhoto, 2800);
  }, [data.vipPhotos]);

  // Trigger experience unlock
  const openExperience = useCallback(() => {
    setIsBloomed(true);
    setIsHolding(false);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([35, 40, 70]); } catch { /* ignore */ }
    }

    // Play music
    if (audioRef.current && !isMuted) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        // Autoplay may be restricted in some browsers
      });
    }

    // Delay curtain lift
    setTimeout(() => {
      setIsUnlocked(true);
      // Auto-start floating photos 3.5s after bloom so recipient sees memories rising into the sky!
      setTimeout(() => {
        startFloatingPhotos();
      }, 3500);
    }, 400);
  }, [isMuted, startFloatingPhotos]);

  // Hold interactions
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    if (isUnlocked) return;
    e.preventDefault();
    setIsHolding(true);
    holdStartTimeRef.current = Date.now();
    setGuideText('Giữ chắc tay nhé...');

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(35); } catch { /* ignore */ }
    }

    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = window.setTimeout(() => {
      openExperience();
    }, 1100);
  };

  const handlePointerUp = () => {
    if (isUnlocked || isBloomed) return;
    setIsHolding(false);
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setGuideText('Ấn giữ để mở quà');
  };

  // Replay
  const handleReplay = () => {
    setIsUnlocked(false);
    setIsBloomed(false);
    setIsHolding(false);
    setCandlesBlown(false);
    setIsLetterOpen(false);
    stopFloatingPhotos();
    setFloatingPhotos([]);
    setGuideText('Ấn giữ để mở quà');
  };

  // Blow Birthday Candles
  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fbc531', '#e84118', '#00a8ff', '#9c88ff', '#4cd137', '#ff6b81']
      });
    } catch { /* ignore */ }

    setTimeout(() => {
      setIsLetterOpen(true);
    }, 900);
  };

  // Open Letter
  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
  };

  // Continue from letter -> Start flying photos
  const handleContinue = () => {
    setIsLetterOpen(false);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff758c', '#ff7eb3', '#f8a5c2', '#fbc531', '#ffffff']
      });
    } catch { /* ignore */ }

    startFloatingPhotos();
  };

  // Dragging caught photo
  const handleCatchPhoto = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setFloatingPhotos(prev =>
      prev.map(p => {
        if (p.id === id) {
          return { ...p, isCaught: true, x: clientX - 60, y: clientY - 80 };
        }
        return p;
      })
    );
  };

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
      if (floatingTimerRef.current) clearInterval(floatingTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[100vh] overflow-hidden select-none bg-[#020208] text-white font-['Plus_Jakarta_Sans',sans-serif] ${!isUnlocked && !isInlinePreview ? 'not-loaded' : ''}`}
      data-flower-color={data.flowerColor || 'classic'}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        id="audio-para-ti"
        src={data.customMusic || data.musicPath || '/assets/musics/danhchoem.mp3'}
        loop
        playsInline
      />

      {/* Top Floating Controls */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* Left: Music control disc */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/20 shadow-lg shadow-pink-950/20">
          <button
            onClick={togglePlayMusic}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
              isPlayingMusic ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
            title={isPlayingMusic ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-md">
              <span className="text-[10px]">🎵</span>
            </div>
          </button>
          <button
            onClick={toggleMute}
            className="text-pink-300 hover:text-white transition-colors p-1"
            title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          {/* Center/Left: Switch Version (Bản Khác) Button */}
          {onSwitchTemplate && (
            <button
              onClick={onSwitchTemplate}
              className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-rose-500/30 hover:from-pink-500/60 hover:to-rose-500/60 backdrop-blur-md text-pink-200 hover:text-white px-3.5 py-1.5 rounded-full border border-pink-400/30 text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-pink-950/40"
              title="Đổi sang bản khác (Hoa hồng, Sinh nhật thổi nến, Đèn lồng, v.v.)"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
              <span>Bản khác (6 mẫu)</span>
            </button>
          )}

          {templateType === 'love_anniversary' && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-pink-500/20 backdrop-blur-md border border-pink-400/30 rounded-full text-xs text-pink-200 font-bold animate-pulse">
              <span>💞 520 Ngày Yêu Nhau</span>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          {isUnlocked && (
            <button
              onClick={() => {
                if (isFlyingPhotos) {
                  stopFloatingPhotos();
                } else {
                  startFloatingPhotos();
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all hover:scale-105 shadow-lg ${
                isFlyingPhotos
                  ? 'bg-rose-500/40 border-rose-400/60 text-white shadow-rose-500/30 animate-pulse'
                  : 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-400/40 text-pink-200'
              }`}
              title={isFlyingPhotos ? 'Tạm dừng thả ảnh bay' : 'Cho các ảnh kỷ niệm bay lên'}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>{isFlyingPhotos ? 'Ảnh đang bay 📸' : 'Thả ảnh bay ✨'}</span>
            </button>
          )}

          {isUnlocked && (
            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-pink-200 px-3 py-1.5 rounded-full border border-pink-500/20 text-xs font-medium transition-all hover:scale-105 shadow-lg"
              title="Xem lại hiệu ứng mở quà"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xem lại</span>
            </button>
          )}

          {onShare && (
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500/80 to-rose-500/80 hover:from-pink-500 hover:to-rose-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ</span>
            </button>
          )}

          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/20 transition-all hover:scale-105"
            >
              <PlusCircle className="w-3.5 h-3.5 text-pink-400" />
              <span>Tạo bó hoa</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🔮 FINGERPRINT CURTAIN OVERLAY */}
      {/* ============================================================ */}
      {!isUnlocked && !isInlinePreview && (
        <div
          id="orientationOverlay"
          className={`intro-curtain-overlay fixed inset-0 z-40 flex flex-col justify-between items-center transition-opacity duration-1000 ${
            isHolding ? 'is-holding-veil' : ''
          } ${isBloomed ? 'is-dissolving is-curtain-lifting' : ''}`}
        >
          {/* Subtle upper glow */}
          <div className="w-full pt-16 px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs tracking-wider uppercase font-medium">
              <Sparkles className="w-3 h-3 text-pink-400" />
              Món quà bất ngờ dành riêng cho bạn
            </span>
          </div>

          {/* Bottom fingerprint area */}
          <div className="fingerprint-bottom-bar pb-12 flex flex-col items-center">
            <p
              id="fingerprintGuide"
              className={`fingerprint-guide-text mb-4 text-sm font-medium tracking-wide transition-all ${
                isHolding ? 'text-pink-300 scale-105' : 'text-pink-200/80'
              }`}
            >
              {guideText}
            </p>

            <div
              id="fingerprintBtn"
              role="button"
              tabIndex={0}
              aria-label="Ấn giữ vân tay để mở quà"
              className={`fingerprint-btn-wrap relative cursor-pointer ${
                isHolding ? 'is-pressing' : ''
              } ${isBloomed ? 'is-bloomed' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
              onTouchCancel={handlePointerUp}
            >
              {/* Ripple waves */}
              <div className="fp-ripple r1"></div>
              <div className="fp-ripple r2"></div>

              {/* Progress Circle SVG */}
              <svg className="fp-progress-svg" viewBox="0 0 100 100">
                <circle className="fp-progress-track" cx="50" cy="50" r="44" />
                <circle
                  className="fp-progress-bar"
                  id="fpProgressBar"
                  cx="50"
                  cy="50"
                  r="44"
                />
              </svg>

              {/* Shockwave burst & flare */}
              <div className="fp-burst-shockwave"></div>
              <div className="fp-burst-flash"></div>

              {/* 16 Gentle magic burst particles */}
              <div className="fp-magic-burst" id="fpMagicBurst">
                <span className="light-particle p1"></span>
                <span className="light-particle p2"></span>
                <span className="light-particle p3"></span>
                <span className="light-particle p4"></span>
                <span className="light-particle p5"></span>
                <span className="light-particle p6"></span>
                <span className="light-particle p7"></span>
                <span className="light-particle p8"></span>
                <span className="light-particle p9"></span>
                <span className="light-particle p10"></span>
                <span className="light-particle p11"></span>
                <span className="light-particle p12"></span>
                <span className="light-particle p13"></span>
                <span className="light-particle p14"></span>
                <span className="light-particle p15"></span>
                <span className="light-particle p16"></span>
              </div>

              {/* Glass dome sensor core with mini sprout */}
              <div className="fp-sensor-core" id="fpDomeSensor">
                <div className="dome-glass-glare"></div>
                <div className="mini-bloom-aura"></div>

                <div className="mini-terrarium">
                  <div className="mini-sprout-system" id="miniSprout">
                    <div className="mini-stem">
                      <div className="mini-leaf mini-leaf--left"></div>
                      <div className="mini-leaf mini-leaf--right"></div>
                    </div>
                    <div className="mini-blossom">
                      <div className="mini-petal mini-petal--back"></div>
                      <div className="mini-petal mini-petal--left"></div>
                      <div className="mini-petal mini-petal--right"></div>
                      <div className="mini-petal mini-petal--center"></div>
                      <div className="mini-petal mini-petal--front"></div>
                      <div className="mini-flower-core"></div>
                      <div className="mini-flower-glow"></div>
                      <div className="mini-sparkle sp1"></div>
                      <div className="mini-sparkle sp2"></div>
                      <div className="mini-sparkle sp3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🌸 MAIN BOUQUET & STAR SKY EXPERIENCE */}
      {/* ============================================================ */}
      <div id="contenido-principal" className="relative w-full h-full min-h-[100vh]">
        {/* Night background */}
        <div className="night"></div>
        <div className="particles"></div>

        {/* Falling Red Rose Petals if red_rose template */}
        {templateType === 'red_rose' && (
          <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-5 bg-gradient-to-br from-red-500 via-rose-600 to-red-900 rounded-[50%_50%_50%_0] opacity-80 shadow-md"
                style={{
                  left: `${(i * 7.5) + 2}%`,
                  top: '-25px',
                  animation: `fallRosePetal ${6 + (i % 5)}s linear infinite`,
                  animationDelay: `${i * 0.6}s`,
                  transform: `rotate(${i * 45}deg)`
                }}
              />
            ))}
          </div>
        )}

        {/* Rising Sky Lanterns if sky_lanterns template */}
        {templateType === 'sky_lanterns' && (
          <div className="pointer-events-none fixed inset-0 z-15 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(i * 10) + 4}%`,
                  bottom: '-120px',
                  animation: `riseLantern ${12 + (i % 6)}s linear infinite`,
                  animationDelay: `${i * 1.5}s`
                }}
              >
                <div className="w-8 h-10 rounded-t-xl bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-200 shadow-[0_0_22px_rgba(251,197,49,0.7)] opacity-85 flex items-center justify-center border border-amber-300/40">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping opacity-80" />
                </div>
                <div className="w-5 h-1 bg-amber-800/80 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Intro sparkling greeting text */}
        <div className="intro" id="intro">
          <div className="intro__mask-wrap">
            <p className="intro__text">
              {data.introText || "Happy Vietnamese Women's Day 20/10"}
            </p>
          </div>
        </div>

        {/* Shooting stars */}
        <div className="shooting-stars">
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </div>

        {/* 11 Animated Tulips Bouquet */}
        <div className="flowers" data-flower-color={data.flowerColor || 'classic'}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className={`flower flower--${n}`}>
              <div className={`flower__leafs flower__leafs--${n}`}>
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__leaf flower__leaf--5"></div>
                <div className="flower__leaf flower__leaf--6"></div>
                <div className="flower__center"></div>
                <div className="flower__light flower__light--1"></div>
                <div className="flower__light flower__light--2"></div>
                <div className="flower__light flower__light--3"></div>
                <div className="flower__light flower__light--4"></div>
                <div className="flower__light flower__light--5"></div>
                <div className="flower__light flower__light--6"></div>
                <div className="flower__light flower__light--7"></div>
                <div className="flower__light flower__light--8"></div>
              </div>
              <div className="flower__line">
                <div className="flower__line__leaf flower__line__leaf--1"></div>
                <div className="flower__line__leaf flower__line__leaf--2"></div>
                <div className="flower__line__leaf flower__line__leaf--3"></div>
                <div className="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>
          ))}

          {/* Extra bouquet filler flowers */}
          {[6, 7, 8, 9].map(n => (
            <div key={n} className={`flower flower--${n}`}>
              <div className={`flower__leafs flower__leafs--${n}`}>
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__leaf flower__leaf--5"></div>
                <div className="flower__leaf flower__leaf--6"></div>
                <div className="flower__center"></div>
              </div>
              <div className="flower__line"></div>
            </div>
          ))}

          {[10, 11].map(n => (
            <div key={n} className={`flower flower--${n}`}>
              <div className={`flower__leafs flower__leafs--${n}`}>
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__leaf flower__leaf--5"></div>
                <div className="flower__leaf flower__leaf--6"></div>
                <div className="flower__center"></div>
                <div className="flower__light flower__light--1"></div>
                <div className="flower__light flower__light--2"></div>
                <div className="flower__light flower__light--3"></div>
                <div className="flower__light flower__light--4"></div>
                <div className="flower__light flower__light--5"></div>
                <div className="flower__light flower__light--6"></div>
                <div className="flower__light flower__light--7"></div>
                <div className="flower__light flower__light--8"></div>
              </div>
              <div className="flower__line"></div>
            </div>
          ))}
        </div>

        {/* Bouquet Wrapping, Dewy Grass & Bunnies */}
        <div className={`ramo ${isUnlocked ? 'ramo--visible' : ''}`}>
          <img src="/assets/images/wrapper_flower.png" alt="Bó hoa kỉ niệm" />
          <div className="montes">
            {/* Left dewy grass SVG */}
            <svg className="monte monte-izq" viewBox="0 0 120 70" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="grassGradLeftBack" x1="0%" y1="100%" x2="20%" y2="0%">
                  <stop offset="0%" stopColor="#1a340e" stopOpacity="0" />
                  <stop offset="35%" stopColor="#244516" stopOpacity="0.5" />
                  <stop offset="68%" stopColor="#34591e" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#4a7228" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="grassGradLeftMid" x1="0%" y1="100%" x2="15%" y2="0%">
                  <stop offset="0%" stopColor="#244512" stopOpacity="0" />
                  <stop offset="35%" stopColor="#325a1b" stopOpacity="0.55" />
                  <stop offset="65%" stopColor="#4c7429" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#6e8e3b" />
                </linearGradient>
                <linearGradient id="grassGradLeftFront" x1="0%" y1="100%" x2="30%" y2="0%">
                  <stop offset="0%" stopColor="#2e5218" stopOpacity="0" />
                  <stop offset="35%" stopColor="#426b24" stopOpacity="0.6" />
                  <stop offset="65%" stopColor="#5d8236" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#8bb048" />
                </linearGradient>
                <filter id="dewGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g fill="url(#grassGradLeftBack)">
                <path d="M 28 70 Q 20 38 10 18 Q 22 28 32 70 Z" />
                <path d="M 44 70 Q 42 22 36 8 Q 46 20 48 70 Z" />
                <path d="M 68 70 Q 72 26 84 10 Q 78 30 72 70 Z" />
                <path d="M 84 70 Q 98 42 110 24 Q 96 42 88 70 Z" />
              </g>
              <g fill="url(#grassGradLeftMid)">
                <path d="M 14 70 Q 8 46 0 32 Q 8 44 18 70 Z" />
                <path d="M 34 70 Q 26 28 15 12 Q 26 24 38 70 Z" />
                <path d="M 52 70 Q 56 22 58 4 Q 62 24 57 70 Z" />
                <path d="M 72 70 Q 84 28 100 14 Q 88 32 76 70 Z" />
                <path d="M 90 70 Q 106 50 118 36 Q 104 50 94 70 Z" />
              </g>
              <g fill="url(#grassGradLeftFront)">
                <path d="M 22 70 Q 28 48 24 34 Q 32 46 26 70 Z" />
                <path d="M 42 70 Q 48 40 44 22 Q 52 38 47 70 Z" />
                <path d="M 62 70 Q 68 42 76 26 Q 70 42 66 70 Z" />
                <path d="M 78 70 Q 86 52 96 38 Q 88 52 82 70 Z" />
              </g>
              <g className="dew-sparkles" filter="url(#dewGlow)">
                <circle cx="34" cy="24" r="1.7" fill="#ffffff" />
                <circle cx="86" cy="18" r="1.4" fill="#fef9c3" />
              </g>
            </svg>

            {/* Right dewy grass SVG */}
            <svg className="monte monte-der" viewBox="0 0 120 70" preserveAspectRatio="none" aria-hidden="true">
              <g fill="url(#grassGradLeftBack)">
                <path d="M 92 70 Q 100 38 110 18 Q 98 28 88 70 Z" />
                <path d="M 76 70 Q 78 22 84 8 Q 74 20 72 70 Z" />
                <path d="M 52 70 Q 48 26 36 10 Q 42 30 48 70 Z" />
                <path d="M 36 70 Q 22 42 10 24 Q 24 42 32 70 Z" />
              </g>
              <g fill="url(#grassGradLeftMid)">
                <path d="M 106 70 Q 112 46 120 32 Q 112 44 102 70 Z" />
                <path d="M 86 70 Q 94 28 105 12 Q 94 24 82 70 Z" />
                <path d="M 68 70 Q 64 22 62 4 Q 58 24 63 70 Z" />
                <path d="M 48 70 Q 36 28 20 14 Q 32 32 44 70 Z" />
                <path d="M 30 70 Q 14 50 2 36 Q 16 50 26 70 Z" />
              </g>
              <g fill="url(#grassGradLeftFront)">
                <path d="M 98 70 Q 92 48 96 34 Q 88 46 94 70 Z" />
                <path d="M 78 70 Q 72 40 76 22 Q 68 38 73 70 Z" />
                <path d="M 58 70 Q 52 42 44 26 Q 50 42 54 70 Z" />
                <path d="M 42 70 Q 34 52 24 38 Q 32 52 38 70 Z" />
              </g>
              <g className="dew-sparkles" filter="url(#dewGlow)">
                <circle cx="86" cy="24" r="1.7" fill="#ffffff" />
                <circle cx="34" cy="18" r="1.4" fill="#fef9c3" />
              </g>
            </svg>
          </div>

          {/* Animated Rabbits */}
          <div className={`rabbit rabbit--left ${isUnlocked ? 'rabbit--visible' : ''}`}>
            <img src="/assets/images/mewmew.gif" alt="Thỏ bên trái" />
          </div>
          <div className={`rabbit rabbit--right ${isUnlocked ? 'rabbit--visible' : ''}`}>
            <img src="/assets/images/mewmew.gif" alt="Thỏ bên phải" />
          </div>
        </div>

        {/* Satin ribbon bow */}
        <div className={`flower-bow ${isUnlocked ? 'flower-bow--visible' : ''}`}>
          <img src="/assets/images/flower_bow.png" alt="Nơ hoa" />
        </div>

        {/* Interactive Birthday Cake if birthday_cake template */}
        {templateType === 'birthday_cake' && isUnlocked && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[24%] z-30 flex flex-col items-center cursor-pointer group pointer-events-auto"
            onClick={handleBlowCandles}
            title="Chạm để thổi nến sinh nhật!"
          >
            <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/50 text-amber-200 text-xs font-bold mb-2 animate-bounce shadow-xl flex items-center gap-1.5">
              <span>{candlesBlown ? '🎂 Ước nguyện đã gửi!' : '🕯️ Chạm để thổi nến!'}</span>
            </div>

            <div className="relative w-40 h-28 flex flex-col items-center justify-end drop-shadow-2xl">
              {/* 3 Candles */}
              <div className="flex gap-4 mb-1">
                {[1, 2, 3].map((candle) => (
                  <div key={candle} className="flex flex-col items-center">
                    {/* Flame */}
                    {!candlesBlown ? (
                      <div className="w-2.5 h-4 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-pulse shadow-[0_0_12px_rgba(251,197,49,0.9)]" />
                    ) : (
                      <div className="w-1.5 h-2 bg-neutral-600 rounded-full animate-ping opacity-60" />
                    )}
                    <div className="w-0.5 h-1.5 bg-neutral-800" />
                    <div className="w-2 h-6 bg-gradient-to-b from-pink-300 to-rose-400 rounded-t shadow-sm" />
                  </div>
                ))}
              </div>

              {/* Top Tier */}
              <div className="w-24 h-7 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-xl border border-amber-300/60 shadow-md relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-2 bg-pink-400 rounded-full opacity-80" />
                <span className="text-[10px] text-pink-600 font-bold font-['Pacifico',cursive]">HBD 💕</span>
              </div>

              {/* Bottom Tier */}
              <div className="w-32 h-9 bg-gradient-to-b from-rose-200 to-pink-300 rounded-t-xl border border-rose-300/60 shadow-xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-2.5 bg-rose-400 rounded-full opacity-90" />
                <div className="flex gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              {/* Cake Plate */}
              <div className="w-36 h-2 bg-neutral-200 rounded-full shadow-lg" />
            </div>
          </div>
        )}

        {/* Wax-sealed Letter in bouquet */}
        <div
          className={`letter ${isUnlocked ? 'letter--visible' : ''} cursor-pointer`}
          onClick={handleOpenLetter}
          title="Bấm để mở thư"
        >
          <div className="letter-envelope">
            <svg className="letter-flap-svg" viewBox="0 0 128 75" preserveAspectRatio="none">
              <path className="letter-flap-polyline" d="M 2.5,2.5 Q 20,20 64,44 Q 108,20 125.5,2.5" />
            </svg>
          </div>
          <div className="letter-seal animate-pulse"></div>
        </div>

        {/* ============================================================ */}
        {/* 📜 ROMANTIC LETTER MODAL */}
        {/* ============================================================ */}
        <div
          id="letterModal"
          className={`letter-modal ${isLetterOpen ? 'is-open' : ''}`}
          style={{ display: isLetterOpen ? 'flex' : 'none' }}
        >
          <div className="letter-modal__backdrop" onClick={handleCloseLetter}></div>
          <div className="letter-modal__box-wrap">
            <button
              type="button"
              className="letter-modal__close"
              onClick={handleCloseLetter}
              aria-label="Đóng thư"
            >
              &times;
            </button>
            <div className="letter-modal__box">
              <h2 className="letter-modal__title font-['Pacifico',cursive] text-rose-800 text-2xl md:text-3xl mb-4 text-center">
                {data.letterTitle || 'Gửi người tôi yêu thương nhất'}
              </h2>

              <div className="letter-modal__content font-['Dancing_Script',cursive] text-lg md:text-xl text-neutral-800 leading-relaxed space-y-3">
                {Array.isArray(data.letterContent) ? (
                  data.letterContent.map((paragraph, idx) => (
                    <p key={idx} className="indent-4">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{data.letterContent}</p>
                )}

                {data.letterSignature && (
                  <p className="text-right font-bold mt-6 text-rose-700 italic">
                    {data.letterSignature}
                  </p>
                )}
              </div>

              <div className="letter-modal__footer mt-6 text-center" style={{ display: 'block' }}>
                <button
                  type="button"
                  className="letter-modal__btn-continue px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-md shadow-pink-500/30 transition-all hover:scale-105"
                  onClick={handleContinue}
                >
                  Tiếp tục ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 📸 FLOATING POLAROID PHOTO MEMORIES */}
        {/* ============================================================ */}
        <div
          id="photoFloatContainer"
          className={`photo-float-container fixed inset-0 z-40 transition-all duration-700 ${
            isFlyingPhotos ? 'is-active opacity-100 !visible pointer-events-auto' : 'opacity-0 !invisible pointer-events-none'
          }`}
          style={{
            display: isFlyingPhotos ? 'block' : 'none'
          }}
        >
          {floatingPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => onPhotoClick && onPhotoClick(photo.url)}
              onMouseDown={(e) => handleCatchPhoto(photo.id, e)}
              onTouchStart={(e) => handleCatchPhoto(photo.id, e)}
              className={`photo-float absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-transform hover:scale-110 hover:z-50 shadow-2xl ${
                photo.isCaught ? 'is-caught is-dragging' : ''
              }`}
              style={
                photo.isCaught && photo.x !== undefined && photo.y !== undefined
                  ? {
                      position: 'fixed',
                      left: `${photo.x}px`,
                      top: `${photo.y}px`,
                      transform: `rotate(${photo.rotation}deg) scale(1.08)`,
                      zIndex: 100
                    }
                  : ({
                      left: `${photo.left}%`,
                      bottom: '-220px',
                      animation: `flyUpPhoto ${photo.duration}s linear forwards`,
                      '--rot': `${photo.rotation}deg`,
                      willChange: 'transform, opacity'
                    } as React.CSSProperties)
              }
              title="Nhấn giữ để bắt ảnh, bấm để phóng to"
            >
              <div className="bg-white/95 backdrop-blur-md p-2.5 pb-4 rounded-xl shadow-2xl border-2 border-pink-200/90 flex flex-col items-center max-w-[150px] md:max-w-[190px]">
                <img
                  src={photo.url}
                  alt="Ảnh kỷ niệm"
                  className="w-full h-auto aspect-square object-cover rounded-lg pointer-events-none shadow-inner"
                  loading="lazy"
                />
                <div className="flex items-center gap-1 mt-2 text-[11px] font-['Dancing_Script',cursive] text-pink-600 font-bold">
                  <span>Khoảnh khắc bên em</span>
                  <span>💕</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Filters for wavy paper edges */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="wavyBorder" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.006" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="wavyBorderLight" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.008" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="wavyBorderEnvelope" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.025 0.035" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
