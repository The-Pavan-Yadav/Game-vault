import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameVault } from '../context/GameVaultContext';
import { Game, GameStatus } from '../types';
import { GameCover } from '../components/GameCover';
import { 
  Search, 
  HardDrive, 
  Calendar, 
  X, 
  Tv, 
  Star, 
  SlidersHorizontal 
} from 'lucide-react';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  const navigate = useNavigate();

  // Dynamic fallback mapping for modal banner backdrop image stream
  const cleanTitle = game.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  let defaultSteam = '';
  if (cleanTitle.includes('cyberpunk')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1091500/library_600x900_2x.jpg';
  else if (cleanTitle.includes('forza') || cleanTitle.includes('horizon')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1551360/library_600x900_2x.jpg';
  else if (cleanTitle.includes('daysgone')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1030840/library_600x900_2x.jpg';
  else if (cleanTitle.includes('eldenring')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1245620/library_600x900_2x.jpg';
  else if (cleanTitle.includes('reddead') || cleanTitle.includes('rdr2') || cleanTitle.includes('redemption')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1174180/library_600x900_2x.jpg';
  else if (cleanTitle.includes('doometernal') || cleanTitle.includes('doom')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/782330/library_600x900_2x.jpg';
  else if (cleanTitle.includes('hades')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1145360/library_600x900_2x.jpg';
  else if (cleanTitle.includes('flight') || cleanTitle.includes('mfs') || cleanTitle.includes('microsoftflight')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1250410/library_600x900_2x.jpg';
  else if (cleanTitle.includes('godofwar')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1593500/library_600x900_2x.jpg';
  else if (cleanTitle.includes('hitman')) defaultSteam = 'https://cdn.cloudflaresteamstatic.com/steam/apps/1659040/library_600x900_2x.jpg';

  const [modalSrc, setModalSrc] = useState<string>(game.coverUrl);

  const handleImgError = () => {
    if (defaultSteam && modalSrc !== defaultSteam) {
      setModalSrc(defaultSteam);
    } else {
      setModalSrc('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Design accents */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 z-10" />
        
        {/* Top banner / Image placeholder */}
        <div className="relative h-60 shrink-0 overflow-hidden bg-slate-950 flex items-end p-5 md:p-6">
          <img 
            src={modalSrc} 
            alt={game.title} 
            onError={handleImgError}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.22] blur-md scale-105 pointer-events-none" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-black/35" />
          
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/85 border border-slate-800/80 hover:bg-slate-800 text-slate-350 hover:text-white transition-all cursor-pointer shadow-lg hover:rotate-90 duration-300 z-20"
            title="Close telemetry details"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex gap-4 items-end w-full">
            <div className="w-20 sm:w-24 shrink-0 shadow-2xl rounded-xl overflow-hidden border border-slate-700/60 self-center sm:self-auto select-none">
              <GameCover 
                title={game.title} 
                coverUrl={game.coverUrl} 
                showHoverEffect={false} 
              />
            </div>
            <div className="flex-1 pb-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-950/95 border border-cyan-800/50 text-cyan-400 px-2.5 py-0.5 rounded-md">
                {game.platform}
              </span>
              <h3 className="text-lg md:text-xl font-black font-sans text-white uppercase tracking-tight mt-2 line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {game.name || game.title}
              </h3>
              <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mt-1">
                {game.genre} • Released {game.releaseYear}
              </p>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Main gaming statistics / Hardware requirements metrics grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* FPS Benchmarks */}
            <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-0.5">Average Performance</span>
              <span className="text-base font-mono font-bold text-cyan-400">{game.fps || 60} FPS</span>
            </div>

            {/* Scale / Storage size */}
            <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-0.5">Storage Footprint</span>
              <span className="text-base font-mono font-bold text-fuchsia-400">{game.storageGB} GB</span>
            </div>

            {/* CPU temperature */}
            <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-0.5">CPU Core Temp</span>
              <span className="text-base font-mono font-bold text-rose-400">{game.cpuTemp || '65°C'}</span>
            </div>

            {/* GPU temperature */}
            <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-0.5">GPU Core Temp</span>
              <span className="text-base font-mono font-bold text-amber-400">{game.gpuTemp || '70°C'}</span>
            </div>
          </div>

          {/* Graphics Configurations details */}
          <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1">Target Graphics Quality Settings</span>
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wide font-sans">{game.graphicsSettings || 'Ultra Preset (RT Active)'}</p>
          </div>

          {/* Stars rating */}
          <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">Calculated Quality Rating</span>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
              <span className="text-sm text-amber-400 font-mono">★</span>
              <span className="text-xs font-mono font-black text-amber-400">{game.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Personal Telemetry Notes */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block">Personal Gaming Notes</label>
            <div className="w-full bg-slate-950/80 border border-slate-850 rounded-xl px-4 py-3.5 text-xs text-slate-300 leading-relaxed font-sans italic border-l-2 border-l-cyan-400">
              "{game.personalNotes || game.notes || 'No registry logging custom defined.'}"
            </div>
          </div>

          {/* Status index bottom meta */}
          <div className="border-t border-slate-850 pt-3.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-600" />
              <span>Catalog Registry: {game.addedDate}</span>
            </span>
            <span className="flex items-center gap-1.5 uppercase font-bold text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Status: {game.status}</span>
            </span>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-850">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(`/game/${game.id}`);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-xs font-mono font-bold uppercase tracking-wider text-white border border-cyan-500/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Open Full Tech Specs
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer"
            >
              Close Telemetry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export const MyGames: React.FC = () => {
  const { games } = useGameVault();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'size'>('name');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Derive unique Genres and Platforms dynamically from the games payload
  const genres = ['all', ...Array.from(new Set(games.map(g => g.genre)))];
  const platforms = ['all', ...Array.from(new Set(games.map(g => g.platform)))];

  // Filtering Logic
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase()) || 
                          game.name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
    const matchesPlatform = selectedPlatform === 'all' || game.platform === selectedPlatform;
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  // Sorting Logic
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'rating') return b.rating - a.rating; // highest score first
    if (sortBy === 'size') return b.storageGB - a.storageGB; // largest size first
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Page Title & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            Active Game Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Displaying {filteredGames.length} of {games.length} registered system titles loaded index.
          </p>
        </div>
      </div>

      {/* Modern Search and Filters Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-850 backdrop-blur-md">
        
        {/* Search by game name */}
        <div className="relative">
          <label className="block text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Search Game Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Filter by genre */}
        <div>
          <label className="block text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Filter Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer capitalize"
          >
            {genres.map(g => (
              <option key={g} value={g}>{g === 'all' ? 'All Genres' : g}</option>
            ))}
          </select>
        </div>

        {/* Filter by platform */}
        <div>
          <label className="block text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Filter Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer capitalize"
          >
            {platforms.map(p => (
              <option key={p} value={p}>{p === 'all' ? 'All Platforms' : p}</option>
            ))}
          </select>
        </div>

        {/* Sort drop conditions */}
        <div>
          <label className="block text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1.5">
            Sort Catalog By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="name">Game Name (A-Z)</option>
            <option value="rating">Rating (Highest)</option>
            <option value="size">Size (Largest)</option>
          </select>
        </div>

      </div>

      {/* Main Game Grid List */}
      {sortedGames.length === 0 ? (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
          <Tv className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200 uppercase tracking-wide">Telemetry Record Not Found</h3>
          <p className="text-xs text-slate-400 font-medium">Verify your search keywords, filter conditions or active presets.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {sortedGames.map((game) => (
            <div 
              key={game.id}
              className="group relative bg-slate-900/30 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:translate-y-[-4px] flex flex-col cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              {/* Cover Image Frame */}
              <div className="relative w-full overflow-hidden shrink-0 bg-slate-950 rounded-t-2xl">
                <GameCover 
                  title={game.title} 
                  coverUrl={game.coverUrl} 
                  className="rounded-b-none border-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                {/* Rating badge Overlay */}
                <span className="absolute top-3 right-3 bg-amber-500/90 text-amber-400 border border-amber-550/40 text-[10px] font-extrabold font-mono py-1 px-2.5 rounded-lg uppercase tracking-wider backdrop-blur-sm shadow-md z-10">
                  ★ {game.rating.toFixed(1)}
                </span>
                
                {/* Completion status badge and platform Overlay */}
                <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap z-10">
                  <span className={`text-[9px] font-bold font-mono py-0.5 px-2 rounded uppercase tracking-wider ${
                    game.status === 'playing' ? 'bg-cyan-500/85 text-black' :
                    game.status === 'completed' ? 'bg-emerald-500/85 text-black' :
                    'bg-amber-500/85 text-black'
                  }`}>
                    {game.status}
                  </span>
                  
                  <span className="bg-slate-950/85 text-slate-200 border border-slate-800 text-[9px] font-mono py-0.5 px-2 rounded font-bold">
                    {game.platform}
                  </span>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{game.genre}</span>
                  <h3 className="text-base font-black font-sans text-slate-100 group-hover:text-cyan-400 transition-colors uppercase line-clamp-1 mt-1">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed italic font-sans">
                    "{game.personalNotes || game.notes || 'No notes defined yet.'}"
                  </p>
                </div>

                {/* Storage size index */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="font-medium text-slate-500 text-[10px] font-mono">STORAGE ALLOCATION</span>
                  <div className="flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-fuchsia-500" />
                    <span className="font-mono font-bold text-slate-200">{game.storageGB} GB</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Render selected game details modal */}
      {selectedGame && (
        <GameDetailModal 
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

    </div>
  );
};
