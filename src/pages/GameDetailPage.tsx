import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameVault } from '../context/GameVaultContext';
import { 
  ArrowLeft, 
  Tv, 
  Gamepad2, 
  HardDrive, 
  Cpu, 
  Activity, 
  Calendar,
  Settings,
  Star,
  Quote,
  Flame,
  Gauge
} from 'lucide-react';
import { motion } from 'motion/react';

export const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { games } = useGameVault();

  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 font-sans text-slate-100 mt-12">
        <Tv className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-200 uppercase tracking-widest">Telemetry Lost</h3>
        <p className="text-xs text-slate-400 font-medium">This game registry index cannot be located in current database vaults.</p>
        <button 
          onClick={() => navigate('/games')}
          className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 rounded-xl hover:bg-cyan-950/60 transition-all cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-16">
      
      {/* Header Back Button & Page Badge */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 group px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 bg-slate-900/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Vault</span>
        </button>

        <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>PROTOCOL: {game.platform.toUpperCase()} SPEC</span>
        </span>
      </div>

      {/* Hero Showcase Grid with Immersive Backdrop */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl">
        {/* Blurry Background image overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img 
            src={game.coverUrl} 
            alt="Blur backplate shadow" 
            className="w-full h-full object-cover filter blur-3xl opacity-[0.16] scale-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        {/* Content Frame */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
          
          {/* Cover Art Wrapper */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl group max-w-md">
              <img 
                src={game.coverUrl} 
                alt={game.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none animate-fade-in"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              {/* Overlay rating brand */}
              <div className="absolute top-4 right-4 bg-amber-500/15 border border-amber-500/45 text-amber-400 font-mono font-black text-xs px-3 py-1 rounded-xl backdrop-blur-md gap-1 flex items-center shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                <span>{game.rating.toFixed(1)} / 10.0</span>
              </div>
            </div>
          </div>

          {/* Meta and Status Title */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest">{game.genre}</span>
              <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-md">
                {game.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Year: {game.releaseYear}</span>
                </span>
                <span>•</span>
                <span className="uppercase text-fuchsia-400 font-bold">{game.platform} Launcher</span>
              </div>
            </div>

            {/* General Description */}
            <div className="relative bg-slate-900/40 border border-slate-850 p-4 rounded-xl">
              <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1">System Intel briefing</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {game.notes || "Become Agent 47 and travel across the world eliminating targets through stealth, disguise, strategy, and creativity. Features large sandbox maps with multiple approaches and high replay value."}
              </p>
            </div>

            {/* Live Play Status capsule */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/25 border border-slate-850">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Cabinet Vault Status:</span>
                <span className={`text-[10px] font-extrabold font-mono px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                  game.status === 'playing' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                  game.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                  'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                }`}>
                  {game.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">ID: #{game.id}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Target specs & hardware index metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: RIG TELEMETRY SCREEN (6Cols) */}
        <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-cyan-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">HP Victus Intel Telemetry Metrics</h3>
            </div>
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">FPS STREAM ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* FPS index block */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Average FPS (High Peak)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-[#00f0ff]">{game.fps || 85}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Frames/Sec</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full stats-bar-anim" 
                  style={{ width: `${Math.min(((game.fps || 85) / 144) * 100, 100)}%` }} 
                />
              </div>
              <span className="text-[8px] font-mono text-cyan-400/80 block uppercase tracking-wider">Smooth play verified (144Hz screen)</span>
            </div>

            {/* Storage metric block */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850 space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Storage Footprint size</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-fuchsia-400">{game.storageGB}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">GB SSD</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-fuchsia-500 to-violet-500 h-full" 
                  style={{ width: `${Math.min((game.storageGB / 512) * 100, 100)}%` }} 
                />
              </div>
              <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-wider">Total capacity occupied: {((game.storageGB / 512) * 100).toFixed(1)}%</span>
            </div>

            {/* CPU temperature core block */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850 space-y-1">
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>CPU Core Temperature</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-rose-400">{game.cpuTemp || "72°C"}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Under load</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-rose-500 h-full" 
                  style={{ width: `${Math.min((parseInt(game.cpuTemp || '72') / 100) * 100, 100)}%` }} 
                />
              </div>
              <span className="text-[8px] font-mono text-rose-400/80 block uppercase tracking-wider">HP cooling system operating normal</span>
            </div>

            {/* GPU temperature core block */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850 space-y-1">
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>GPU Core Temperature</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-amber-400">{game.gpuTemp || "68°C"}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">VRAM load</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full" 
                  style={{ width: `${Math.min((parseInt(game.gpuTemp || '68') / 100) * 100, 100)}%` }} 
                />
              </div>
              <span className="text-[8px] font-mono text-amber-400/80 block uppercase tracking-wider">RTX 3050 heat dissipation active</span>
            </div>

          </div>

          {/* Graphics detailed settings configuration */}
          <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Optimal Graphics Profile Setting</h4>
            </div>
            <p className="text-sm font-bold text-[#00f0ff] uppercase tracking-wide font-sans">{game.graphicsSettings || "High Preset (DLSS Quality / Direct X12)"}</p>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1">
              Optimized mix mapped directly to leverage the 6GB GDDR6 dedicated frame buffet of our RTX 3050 GPU, ensuring steady rendering above 60Hz.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: PERSONAL REVIEW MODULE & LOGISTICS (5Cols) */}
        <div className="lg:col-span-5 bg-slate-900/30 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-4.5 h-4.5 text-[#ffe600]" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Player Log Review</h3>
            </div>
            <span className="text-[9px] font-mono text-[#ffe600] uppercase tracking-widest">VERDICT</span>
          </div>

          {/* Quality Score circular frame */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 flex flex-col items-center text-center space-y-2">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest">CALCULATED VAULT RATING</span>
            <div className="flex items-center justify-center gap-2.5 bg-slate-900 border border-slate-800 py-3.5 px-6 rounded-2xl">
              <span className="text-2xl text-amber-400">★</span>
              <span className="text-3xl font-mono font-black text-amber-400">{game.rating.toFixed(1)}</span>
              <span className="text-sm font-mono text-slate-500">/ 10.0</span>
            </div>
            {game.rating >= 9.0 ? (
              <span className="text-[9px] font-mono font-black text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 rounded-md py-1 px-3 uppercase mt-2 tracking-widest">
                🏆 BOOKMARKED MASTERPIECE
              </span>
            ) : null}
          </div>

          {/* Personal gaming notes block */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest block">PERSONAL LOG ENTRY</span>
            <div className="relative bg-slate-950 p-5 rounded-2xl border border-slate-850/80 border-l-[4px] border-l-[#00f0ff] min-h-[148px]">
              <Quote className="absolute top-4 right-4 text-slate-850 w-10 h-10 pointer-events-none" />
              <p className="text-xs text-slate-300 leading-relaxed italic font-sans font-medium relative z-10">
                "{game.personalNotes || game.notes || "One of the best stealth games ever made. Every mission can be completed in dozens of different ways, making it highly replayable."}"
              </p>
            </div>
          </div>

          {/* Catalog Registry indicators */}
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850/50 flex flex-col space-y-2.5 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold uppercase">ADDED TO HARDWARE VAULT:</span>
              <span className="text-slate-200 font-bold">{game.addedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold uppercase">REGISTRY SESSION ID:</span>
              <span className="text-[#ffe600] font-bold">#GVALT-00{game.id}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
