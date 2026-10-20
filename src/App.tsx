import React, { useState, useEffect } from 'react';
import { BouquetViewer } from './components/BouquetViewer';
import { BouquetCreator } from './components/BouquetCreator';
import { PhotoLightbox } from './components/PhotoLightbox';
import { ShareModal } from './components/ShareModal';
import { TemplateSwitcherModal } from './components/TemplateSwitcherModal';
import { DEFAULT_BOUQUET } from './data/defaultBouquet';
import { GIFT_TEMPLATES, GiftTemplate } from './data/templates';
import { BouquetData } from './types/bouquet';
import { X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'giftory_bouquets_v1';

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState<GiftTemplate>(GIFT_TEMPLATES[0]);
  const [currentBouquet, setCurrentBouquet] = useState<BouquetData>(DEFAULT_BOUQUET);
  const [viewMode, setViewMode] = useState<'view' | 'create'>('view');
  const [previewBouquet, setPreviewBouquet] = useState<BouquetData | null>(null);
  const [activePhotoUrl, setActivePhotoUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTemplateSwitcherOpen, setIsTemplateSwitcherOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load bouquet from URL or LocalStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const isCreate = params.get('create') === '1';

    if (isCreate) {
      setViewMode('create');
      return;
    }

    if (id) {
      // 1. Check if ID matches any pre-built template
      const matchedTemplate = GIFT_TEMPLATES.find((t) => t.data.id === id);
      if (matchedTemplate) {
        setActiveTemplate(matchedTemplate);
        setCurrentBouquet(matchedTemplate.data);
        return;
      }

      // 2. Check local storage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const list: BouquetData[] = JSON.parse(saved);
          const found = list.find((b) => b.id === id);
          if (found) {
            setCurrentBouquet(found);
            return;
          }
        }
      } catch { /* ignore */ }

      // 3. If it's the default ID
      if (id === DEFAULT_BOUQUET.id) {
        setCurrentBouquet(DEFAULT_BOUQUET);
        return;
      }

      // 4. Try to fetch from Giftory server API
      setIsLoading(true);
      fetch(`https://api.giftory.pro/api/gift83s/${id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setCurrentBouquet(json.data);
          }
        })
        .catch(() => {
          // If network or API fails, fallback smoothly to default
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Default to the requested gift ID demo
      setCurrentBouquet(DEFAULT_BOUQUET);
    }
  }, []);

  // Handle switching to another pre-built template
  const handleSelectTemplate = (template: GiftTemplate) => {
    setActiveTemplate(template);
    setCurrentBouquet(template.data);
    setViewMode('view');

    // Update URL param
    const newUrl = `${window.location.pathname}?id=${template.data.id}`;
    window.history.pushState({ id: template.data.id }, '', newUrl);
  };

  // Save new bouquet created by user
  const handleSaveBouquet = (newBouquet: BouquetData) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const list: BouquetData[] = saved ? JSON.parse(saved) : [];
      list.unshift(newBouquet);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch { /* ignore */ }

    setCurrentBouquet(newBouquet);
    setViewMode('view');
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?id=${newBouquet.id}`;
    window.history.pushState({ id: newBouquet.id }, '', newUrl);
    setIsShareModalOpen(true);
  };

  // Preview bouquet before saving
  const handlePreviewBouquet = (data: BouquetData) => {
    setPreviewBouquet(data);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#020208]">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm text-pink-300 text-sm font-medium">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <span className="font-['Pacifico',cursive] text-lg">Đang tải bản quà tặng...</span>
          </div>
        </div>
      )}

      {/* Main View Mode */}
      {viewMode === 'view' ? (
        <BouquetViewer
          data={currentBouquet}
          templateType={activeTemplate.templateType}
          onSwitchTemplate={() => setIsTemplateSwitcherOpen(true)}
          onCreateNew={() => setViewMode('create')}
          onShare={() => setIsShareModalOpen(true)}
          onPhotoClick={(url) => setActivePhotoUrl(url)}
        />
      ) : (
        <BouquetCreator
          initialData={currentBouquet}
          onSave={handleSaveBouquet}
          onPreview={handlePreviewBouquet}
          onCancel={() => setViewMode('view')}
        />
      )}

      {/* Live Preview Modal */}
      {previewBouquet && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center animate-in fade-in">
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Chế độ xem trước (Live Preview)
            </span>
            <button
              onClick={() => setPreviewBouquet(null)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shadow-lg"
              title="Đóng xem trước"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full h-full">
            <BouquetViewer
              data={previewBouquet}
              templateType={activeTemplate.templateType}
              onPhotoClick={(url) => setActivePhotoUrl(url)}
              isInlinePreview={false}
            />
          </div>
        </div>
      )}

      {/* Template Switcher Modal (Chọn bản khác) */}
      <TemplateSwitcherModal
        isOpen={isTemplateSwitcherOpen}
        onClose={() => setIsTemplateSwitcherOpen(false)}
        activeTemplateId={activeTemplate.id}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Lightbox for Photos */}
      <PhotoLightbox
        photoUrl={activePhotoUrl}
        onClose={() => setActivePhotoUrl(null)}
      />

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        giftId={currentBouquet.id}
        bouquetTitle={currentBouquet.introText}
      />
    </div>
  );
}
