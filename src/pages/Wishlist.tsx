import React, { useState } from 'react';
import { useGameVault } from '../context/GameVaultContext';
import { WishlistItem, GameStatus } from '../types';
import { GameCover } from '../components/GameCover';
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Search, 
  HardDrive, 
  DollarSign, 
  Plus,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

interface BuyClaimFormProps {
  item: WishlistItem;
  onConfirm: (id: string, playtime: number, rating: number, status: GameStatus) => void;
  onCancel: () => void;
}

const BuyClaimForm: React.FC<BuyClaimFormProps> = ({ item, onConfirm, onCancel }) => {
  const [playtime, setPlaytime] = useState(0);
  const [rating, setRating] = useState(4);
  const [status, setStatus] = useState<GameStatus>('playing');

  const handleConfirm = () => {
    onConfirm(item.id, playtime, rating, status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ffe600] to-emerald-400" />
        
        <div>
          <h3 className="text-base font-black uppercase text-white tracking-wide">License Registry Confirmation</h3>
          <p className="text-xs text-slate-400 mt-1">Ready to catalog <strong className="text-white">{item.title}</strong> into your game database?</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Set Current Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as GameStatus)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="playing">🎮 Playing Now</option>
              <option value="backlog">📦 Backlogged</option>
              <option value="completed">🏆 Completed Campaign</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Initial Playtime</label>
              <input
                type="number"
                min="0"
                value={playtime}
                onChange={(e) => setPlaytime(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Star Quality</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="5">★★★★★ Outstanding (5)</option>
                <option value="4">★★★★☆ Good Choice (4)</option>
                <option value="3">★★★☆☆ Average Game (3)</option>
                <option value="2">★★☆☆☆ Mediocre (2)</option>
                <option value="1">★☆☆☆☆ Poor Quality (1)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-bold uppercase"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ffe600] to-emerald-400 hover:brightness-110 text-slate-950 text-xs font-bold uppercase shadow-md transition-all"
          >
            Catalog Game
          </button>
        </div>
      </div>
    </div>
  );
};

export const Wishlist: React.FC = () => {
  const { wishlist, deleteWishlistItem, claimWishlistItem } = useGameVault();
  const [search, setSearch] = useState('');
  const [claimingItem, setClaimingItem] = useState<WishlistItem | null>(null);

  // Stats calculation
  const totalItems = wishlist.length;
  const projectedStorage = wishlist.reduce((acc, current) => acc + current.storageGB, 0);
  const totalBudget = wishlist.reduce((acc, current) => acc + current.price, 0);

  const filteredWishlist = wishlist.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
           item.genre.toLowerCase().includes(search.toLowerCase()) ||
           item.platform.toLowerCase().includes(search.toLowerCase());
  });

  const handleClaimConfirm = (id: string, playtime: number, rating: number, status: GameStatus) => {
    claimWishlistItem(id, playtime, rating, status);
    setClaimingItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Top Ledger display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total wishlisted metric */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-rose-950/50 p-3 rounded-xl border border-rose-800/40 text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Wishlisted Titles</span>
            <h3 className="text-2xl font-black font-sans text-white mt-0.5">{totalItems} Games</h3>
          </div>
        </div>

        {/* Projected budget metric */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-emerald-950/50 p-3 rounded-xl border border-emerald-800/40 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Estimated Budget</span>
            <h3 className="text-2xl font-black font-sans text-white mt-0.5">${totalBudget.toFixed(2)}</h3>
          </div>
        </div>

        {/* Projected storage space metric */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-cyan-950/50 p-3 rounded-xl border border-cyan-800/40 text-cyan-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Required Disk Space</span>
            <h3 className="text-2xl font-black font-sans text-white mt-0.5">{projectedStorage} GB</h3>
          </div>
        </div>
      </div>

      {/* Action panel & search */}
      <div className="flex flex-col sm:flex-row p-4 rounded-xl bg-slate-900/40 border border-slate-850 justify-between items-center gap-3 select-none">
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search wishlist indices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-medium"
          />
        </div>

        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          SYSTEM SCANNING: {filteredWishlist.length} OF {totalItems} matches
        </div>

      </div>

      {/* Wishlist grid list */}
      {filteredWishlist.length === 0 ? (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
          <Heart className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300 uppercase">Wishlist Vault Unallocated</h3>
          <p className="text-xs text-slate-400">Add games you wish to purchase or play in the future to keep them pinned under budget alerts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredWishlist.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-slate-900/45 border border-slate-800 hover:border-slate-705 p-4 rounded-2xl flex flex-col gap-4 shadow duration-300 hover:shadow-rose-950/5 transition-all"
            >
              {/* Cover background or image frame */}
              <div className="relative overflow-hidden bg-slate-955 rounded-xl border border-slate-850">
                <GameCover 
                  title={item.title} 
                  coverUrl={item.coverUrl} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
                
                {/* Cost sticker */}
                <div className="absolute top-2.5 right-2.5 bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 font-mono font-black text-xs px-2.5 py-1 rounded-lg shadow-md">
                  ${item.price.toFixed(2)}
                </div>

                {/* Left indicators */}
                <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 flex-wrap">
                  <span className="bg-slate-950/80 text-slate-350 border border-slate-800 text-[9px] font-mono py-0.5 px-2 rounded">
                    {item.platform}
                  </span>
                  <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 text-[9px] font-mono py-0.5 px-2 rounded">
                    {item.genre}
                  </span>
                </div>
              </div>

              {/* Specs & info text */}
              <div className="flex-1 space-y-2">
                <h3 className="text-sm font-black text-slate-100 uppercase group-hover:text-cyan-400 transition-colors line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 italic line-clamp-2 min-h-[2rem]">
                  "{item.notes || 'No objectives written.'}"
                </p>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-850 leading-none">
                  <HardDrive className="w-3.5 h-3.5 text-slate-600" />
                  <span>Expected space payload: {item.storageGB} GB</span>
                </div>
              </div>

              {/* Buying / Claim trigger buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-850">
                
                {/* Buy & Move */}
                <button
                  onClick={() => setClaimingItem(item)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 text-xs font-mono font-bold uppercase transition-all shadow-md shadow-emerald-950/20 hover:scale-[1.02] cursor-pointer"
                  title="Move to purchased library catalog"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy & Catalog</span>
                </button>

                {/* Delete/trash */}
                <button
                  onClick={() => deleteWishlistItem(item.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-950/20 hover:border-rose-500/10 border border-transparent transition-all cursor-pointer"
                  title="Forget game"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Buying claims modal state checks */}
      {claimingItem && (
        <BuyClaimForm 
          item={claimingItem}
          onConfirm={handleClaimConfirm}
          onCancel={() => setClaimingItem(null)}
        />
      )}

    </div>
  );
};
