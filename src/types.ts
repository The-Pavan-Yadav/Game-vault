export type GameStatus = 'playing' | 'completed' | 'backlog';

export interface Game {
  id: string;
  title: string;
  name: string; // Add name mapping for UI compatibility
  platform: string;
  status: GameStatus;
  storageGB: number;
  rating: number; // 0.5 to 5.0
  genre: string;
  playtimeHours: number;
  releaseYear: number;
  coverUrl: string;
  notes?: string;
  isFavorite: boolean;
  addedDate: string;
  fps: number;
  cpuTemp: string;
  gpuTemp: string;
  graphicsSettings: string;
  personalNotes: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  platform: string;
  storageGB: number;
  genre: string;
  price: number; // e.g. 59.99
  coverUrl: string;
  notes?: string;
  addedDate: string;
}

export interface PCSetupSpec {
  id: string;
  name: string; // e.g. "Primary Battle Station"
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  monitor: string;
  caseName: string;
  rgbColor: string; // hex or tailwind class
  isDefault: boolean;
}
