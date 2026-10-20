export interface BouquetData {
  id: string;
  introText: string;
  flowerColor: string;
  letterTitle: string;
  letterContent: string[];
  letterSignature: string;
  vipPhotos: string[];
  musicType: 'Sample' | 'Custom';
  musicPath: string | null;
  customMusic?: string | null;
  isSavePermanent?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MusicTrack {
  id: string;
  name: string;
  artist?: string;
  category?: string;
  duration?: string;
  url: string;
  tags?: string[];
}

export interface FlowerColorTheme {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  thumbImage?: string;
}
