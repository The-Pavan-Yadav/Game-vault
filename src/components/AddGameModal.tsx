import React, { useState } from 'react';
import { X, Search, Gamepad, Info, DollarSign, Star, StarHalf } from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { GameStatus } from '../types';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'library' | 'wishlist';
}

const COVER_PRESETS = [
  { name: 'Racing GT', url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop' },
  { name: 'Drifter Moto', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sonic Flight', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop' },
  { name: 'Neon Arcade', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Netrunner Cyber', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Magic Citadel', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pro Controller', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop' }
];

export const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, initialType = 'library' }) => {
  const { addGame, addWishlistItem } = useGameVault();
  const [mode, setMode] = useState<'library' | 'wishlist'>(initialType);

  // Form states
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [status, setStatus] = useState<GameStatus>('playing');
  const [storageGB, setStorageGB] = useState<number | ''>('');
  const [rating, setRating] = useState<number>(4);
  const [genre, setGenre] = useState('RPG');
  const [playtimeHours, setPlaytimeHours] = useState<number>(0);
  const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
  const [price, setPrice] = useState<number>(29.99);
  const [coverUrl, setCoverUrl] = useState(COVER_PRESETS[3].url);
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedStorage = Number(storageGB) || 20;

    if (mode === 'library') {
      addGame({
        title,
        platform,
        status,
        storageGB: parsedStorage,
        rating,
        genre,
        playtimeHours: Number(playtimeHours) || 0,
        releaseYear: Number(releaseYear) || 2024,
        coverUrl,
        notes,
        isFavorite
      });
    } else {
      addWishlistItem({
        title,
        platform,
        storageGB: parsedStorage,
        genre,
        price: Number(price) || 0,
        coverUrl,
        notes
      });
    }

    // Reset Form
    setTitle('');
    setStorageGB('');
    setPlaytimeHours(0);
    setNotes('');
    setIsFavorite(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="add-game-modal-body"
      >
        {/* Glow edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-[#ffe600] to-cyan-400" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold font-sans flex items-center gap-2">
              <Gamepad className="w-5 h-5 text-fuchsia-400" />
              <span>Deploy New Game Data</span>
            </h3>
            <p className="text-xs text-slate-400">Save detailed telemetry to your local hardware vaults.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Vault Selection Mode toggle */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('library'); }}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === 'library' 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              My Games Catalog
            </button>
            <button
              type="button"
              onClick={() => { setMode('wishlist'); }}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === 'wishlist' 
                  ? 'bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Target Wishlist
            </button>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Game Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cyberpunk 2077"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all cursor-pointer"
                  >
                    <option value="PC">PC (Steam/Epic)</option>
                    <option value="PlayStation 5">PS5</option>
                    <option value="Xbox Series X">Xbox Series X</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="PC (GOG)">PC (GOG)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all cursor-pointer"
                  >
                    <option value="Action RPG">Action RPG</option>
                    <option value="RPG">RPG</option>
                    <option value="Racing">Racing</option>
                    <option value="Simulation">Simulation</option>
                    <option value="FPS Channel">FPS</option>
                    <option value="Horror">Horror</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Souls-like">Souls-like</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Disk Size (GB)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 70"
                    value={storageGB}
                    onChange={(e) => setStorageGB(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all"
                  />
                </div>

                {mode === 'library' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Playtime (Hours)</label>
                    <input
                      type="number"
                      min="0"
                      value={playtimeHours}
                      onChange={(e) => setPlaytimeHours(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Prod. Year</label>
                  <input
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all"
                  />
                </div>

                {mode === 'library' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Vault Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as GameStatus)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white transition-all cursor-pointer"
                    >
                      <option value="playing">Playing</option>
                      <option value="completed">Completed</option>
                      <option value="backlog">Backlogged</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Right side inputs (Covers & Notes) */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="Paste external Unsplash image URL..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all font-mono text-xs"
                />
              </div>

              {/* Cover Presets */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Or Choose Cyber Preset Theme</span>
                <div className="grid grid-cols-4 gap-2">
                  {COVER_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setCoverUrl(preset.url)}
                      className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer group ${
                        coverUrl === preset.url ? 'border-cyan-400 ring-1 ring-cyan-400/50' : 'border-slate-800 hover:border-slate-600'
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center py-0.5">
                        <span className="text-[8px] font-mono tracking-tighter text-slate-300 truncate block px-1 w-full text-center bg-black/60">{preset.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'library' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Personal Star Rating</label>
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-2.5 rounded-xl">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          className={`text-xl font-bold p-0.5 transition-all text-amber-400 cursor-pointer ${
                            rating >= starValue ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-75'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 ml-2">{rating}.0 / 5.0</span>
                  </div>
                </div>
              )}

              {mode === 'library' && (
                <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <input
                    type="checkbox"
                    id="is-fav-checkbox"
                    checked={isFavorite}
                    onChange={(e) => setIsFavorite(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20"
                  />
                  <label htmlFor="is-fav-checkbox" className="text-xs font-bold uppercase tracking-wider text-slate-400 cursor-pointer">
                    Bookmark as favorite gaming masterpiece
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Interactive Notes / Backlog Goal</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record your achievements, boss challenges, hardware performance metrics, or gaming thoughts here..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-600 transition-all resize-none font-medium text-slate-300"
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-100 bg-slate-950/40 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              Abort Mission
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 transition-all uppercase shadow-lg shadow-cyan-950/25 cursor-pointer"
            >
              Commit Data To Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
