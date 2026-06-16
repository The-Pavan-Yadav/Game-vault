import React from 'react';
import { useGameVault } from '../context/GameVaultContext';
import { 
  Gamepad2, 
  HardDrive, 
  Star, 
  Trophy, 
  Timer, 
  Plus, 
  TrendingUp, 
  Flame,
  ChevronRight,
  Heart,
  Cpu,
  Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { games } = useGameVault();
  const navigate = useNavigate();

  // 1. Total Games (cataloged)
  const totalGames = games.length;

  // 2. Total Storage Used
  const totalStorage = games.reduce((acc, game) => acc + game.storageGB, 0);

  // 3. Average Rating
  const averageRating = totalGames > 0
    ? (games.reduce((acc, game) => acc + game.rating, 0) / totalGames).toFixed(1)
    : '0.0';

  // 4. Completed Games count
  const completedGames = games.filter(g => g.status === 'completed').length;
  const completionRate = totalGames > 0 
    ? Math.round((completedGames / totalGames) * 100) 
    : 0;

  // Compute total playtime
  const totalPlaytime = games.reduce((acc, game) => acc + game.playtimeHours, 0);

  // Filter playing games
  const activeGames = games.filter(g => g.status === 'playing');

  // Favorite showcase
  const favoriteGame = games.find(g => g.isFavorite) || games[0];

  // Dynamic Greeting based on time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return { text: 'Good Morning, Commander', icon: '🌅' };
    if (hours < 18) return { text: 'Good Afternoon, Agent', icon: '☀️' };
    return { text: 'Good Evening, Operative', icon: '🌌' };
  };

  const greeting = getGreeting();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 450,
        damping: 28
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 font-sans"
    >
      {/* Top Banner section */}
      <motion.div 
        variants={itemVariants}
        className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0e122b] to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
      >
        {/* Animated grid overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-violet-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{greeting.icon}</span>
            <h1 className="text-xl md:text-3xl font-black tracking-tight text-white uppercase font-sans">
              {greeting.text}
            </h1>
          </div>
          <p className="text-slate-400 text-xs md:text-sm font-medium">
            Your telemetry cache is hot. Ready for mission briefing.
          </p>
        </div>

        <button
          onClick={() => navigate('/games')}
          className="relative group px-5 py-3 rounded-xl bg-slate-950/60 border border-slate-700/60 text-xs font-mono tracking-wider text-cyan-400 hover:text-white hover:border-cyan-400/50 hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-2"
          id="dashboard-explore-button"
        >
          <span>Catalog Database</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card: Total Games */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.1 } }}
          className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-violet-950/20 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full filter blur-xl transition-all duration-300 group-hover:from-violet-500/20" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans tracking-widest text-slate-400 uppercase">Total Games</span>
            <div className="bg-violet-950/50 p-2.5 rounded-xl border border-violet-800/40 text-violet-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-sans tracking-tight text-white">{totalGames}</h3>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Active Titles Cataloged</p>
          </div>
        </motion.div>

        {/* Metric Card: Total Storage */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.1 } }}
          className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-cyan-950/20 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full filter blur-xl transition-all duration-300 group-hover:from-cyan-500/20" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans tracking-widest text-slate-400 uppercase">Storage Cache</span>
            <div className="bg-cyan-950/50 p-2.5 rounded-xl border border-cyan-800/40 text-cyan-400">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-sans tracking-tight text-white">
              {totalStorage >= 1024 ? `${(totalStorage/1024).toFixed(1)} TB` : `${totalStorage} GB`}
            </h3>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Allocated Sector Space</p>
          </div>
        </motion.div>

        {/* Metric Card: Average Rating */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.1 } }}
          className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-amber-950/20 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full filter blur-xl transition-all duration-300 group-hover:from-amber-500/20" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans tracking-widest text-slate-400 uppercase">Average Rating</span>
            <div className="bg-amber-950/50 p-2.5 rounded-xl border border-amber-800/40 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-sans tracking-tight text-white">{averageRating} <span className="text-sm font-normal text-slate-500">/ 10.0</span></h3>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">General Quality Index</p>
          </div>
        </motion.div>

        {/* Metric Card: Completed Games */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.1 } }}
          className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-fuchsia-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-fuchsia-950/20 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-fuchsia-500/10 to-transparent rounded-full filter blur-xl transition-all duration-300 group-hover:from-fuchsia-500/20" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans tracking-widest text-slate-400 uppercase">Completion Rate</span>
            <div className="bg-fuchsia-950/50 p-2.5 rounded-xl border border-fuchsia-800/40 text-fuchsia-400">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-sans tracking-tight text-white">
              {completedGames} <span className="text-sm font-normal text-slate-500">({completionRate}%)</span>
            </h3>
            {/* Completion Mini Progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Play Room & System Telemetry */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active play session control room */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative backdrop-blur-md">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#00f0ff] mb-4 flex items-center gap-2">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span>Active Hardware Sessions</span>
            </h2>

            {activeGames.length === 0 ? (
              <div className="bg-slate-950/50 border border-slate-800/60 p-8 rounded-xl text-center space-y-3">
                <Gamepad2 className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-medium">No games are currently flagged as "Playing".</p>
                <button
                  onClick={() => navigate('/games')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/20 border border-cyan-800/30 rounded-lg hover:bg-cyan-950/40 transition-all cursor-pointer"
                >
                  Activate Game Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeGames.map((game) => (
                  <div 
                    key={game.id} 
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/40 border border-slate-800/80 hover:border-cyan-500/30 rounded-xl gap-4 transition-all hover:bg-slate-950/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded overflow-hidden relative shrink-0 border border-slate-800">
                        <img 
                          src={game.coverUrl} 
                          alt={game.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 font-sans group-hover:text-cyan-400 transition-colors uppercase">{game.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono font-bold text-slate-500 uppercase">
                          <span className="text-cyan-400">{game.genre}</span>
                          <span>•</span>
                          <span>{game.platform}</span>
                          <span>•</span>
                          <span className="text-slate-300 font-bold">{game.playtimeHours} Hours Logged</span>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry status badge */}
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-slate-900 border border-emerald-500/35 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                        <span>TELEMETRY_STREAMING</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Epic Showcase Card of Featured game */}
          {favoriteGame && (
            <div 
              onClick={() => navigate(`/game/${favoriteGame.id}`)}
              className="relative rounded-2xl overflow-hidden border border-slate-800 h-64 shadow-2xl group cursor-pointer hover:border-cyan-500/40"
            >
              <img 
                src={favoriteGame.coverUrl} 
                alt={favoriteGame.title} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] saturate-[1.1] scale-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="bg-[#ffe600]/10 text-[#ffe600] border border-[#ffe600]/30 text-[9px] font-bold font-mono py-0.5 px-2 rounded-md uppercase tracking-wider backdrop-blur-md">
                  ★ HIGHEST RATED
                </span>
                <span className="bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 text-[9px] font-bold font-mono py-0.5 px-2 rounded-md uppercase tracking-wider backdrop-blur-md">
                  {favoriteGame.platform}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">{favoriteGame.genre}</span>
                  <p className="text-[9px] font-mono tracking-wider font-semibold text-cyan-400/80 animate-pulse">CLICK TO DEPLOY DETAILED METRICS</p>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#00f0ff] transition-colors">{favoriteGame.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 max-w-lg mt-1 font-medium italic">
                    "{favoriteGame.notes || 'No log details custom defined yet.'}"
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800/60 p-3 rounded-xl shrink-0 backdrop-blur-sm self-start sm:self-auto group-hover:border-cyan-500/20">
                  <Timer className="w-4 h-4 text-fuchsia-400" />
                  <div className="text-right">
                    <p className="text-[9px] font-mono text-slate-400 font-medium uppercase">Time Investment</p>
                    <p className="text-xs font-mono font-bold text-fuchsia-400">{favoriteGame.playtimeHours} hours</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Col: telemetry status, quick statistics */}
        <div className="space-y-6">
          
          {/* PREMIUM GLASSMORPHIC HARDWARE ENGINE CARD (HP VICTUS 15) */}
          <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-500">
            
            {/* Glossy gradient overlays */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full filter blur-2xl pointer-events-none transition-all duration-500 group-hover:from-cyan-500/20 group-hover:via-emerald-500/10" />
            
            {/* Modern gaming chassis decoration */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500" />

            {/* Header with Title and Gaming Ready Badge */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-mono font-black tracking-widest text-[#00f0ff] uppercase">Victus Engine</h3>
                <h2 className="text-base font-black text-white tracking-tight uppercase mt-0.5">HP Victus 15 Rig</h2>
              </div>
              
              {/* Pulsating Gaming Ready badge */}
              <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-black rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)] select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse relative">
                  <span className="absolute -inset-1 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
                <span>SYSTEM READY</span>
              </span>
            </div>

            {/* Hardware Specifications Modules */}
            <div className="space-y-4 pt-4">
              
              {/* CPU Section */}
              <div className="space-y-1.5 hover:bg-slate-950/20 p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-slate-455 font-bold uppercase tracking-wider text-[10px]">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CPU ENGINE</span>
                  </span>
                  <span className="text-slate-500 text-[10px] font-black uppercase">AMD Ryzen 7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase font-sans">Ryzen 7 7445HS</span>
                  <span className="text-[10px] font-mono font-black text-cyan-400">8C / 16T @ 4.0 GHz</span>
                </div>
                {/* Animated Capacity bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                    <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-700 w-[38%]" />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 font-bold uppercase">
                    <span>Performance: 38% Active</span>
                    <span>CORE TEMP: 58°C</span>
                  </div>
                </div>
              </div>

              {/* GPU Section */}
              <div className="space-y-1.5 hover:bg-slate-950/20 p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-slate-455 font-bold uppercase tracking-wider text-[10px]">
                    <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GPU CORE</span>
                  </span>
                  <span className="text-slate-500 text-[10px] font-black uppercase">NVIDIA RTX</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase font-sans">RTX 3050 6GB GDDR6</span>
                  <span className="text-[10px] font-mono font-black text-emerald-400">Ray Tracing active</span>
                </div>
                {/* Animated Capacity bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 w-[45%]" />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 font-bold uppercase">
                    <span>Active load: 45%</span>
                    <span>CORE TEMP: 62°C</span>
                  </div>
                </div>
              </div>

              {/* Memory RAM Section */}
              <div className="space-y-1.5 hover:bg-slate-950/20 p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-slate-455 font-bold uppercase tracking-wider text-[10px]">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>SYSTEM MEMORY</span>
                  </span>
                  <span className="text-slate-500 text-[10px] font-black uppercase">16GB Dual Channel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase font-sans">16GB DDR5 RAM</span>
                  <span className="text-[10px] font-mono font-black text-amber-500">4800 MHz active</span>
                </div>
                {/* Animated Capacity bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-700 w-[58%]" />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 font-bold uppercase">
                    <span>Memory Allocation: 9.2 GB</span>
                    <span>Available: 6.8 GB</span>
                  </div>
                </div>
              </div>

              {/* SSD Storage Section */}
              <div className="space-y-1.5 hover:bg-slate-950/20 p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-slate-455 font-bold uppercase tracking-wider text-[10px]">
                    <HardDrive className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span>Chassis storage</span>
                  </span>
                  <span className="text-slate-500 text-[10px] font-black uppercase">PCIe NVMe</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase font-sans">512GB NVMe SSD</span>
                  <span className="text-[10px] font-mono font-black text-fuchsia-400">ULTRA HIGH SPEED M.2</span>
                </div>
                {/* Storage Capacity bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                    <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-full rounded-full transition-all duration-700 w-[72%]" />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 font-bold uppercase">
                    <span>Used space: 368 GB</span>
                    <span>FREE SPACE: 144 GB</span>
                  </div>
                </div>
              </div>

              {/* Display Refresh Section */}
              <div className="space-y-1.5 hover:bg-slate-950/20 p-2 rounded-xl border border-transparent hover:border-slate-800 transition-all">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-slate-455 font-bold uppercase tracking-wider text-[10px]">
                    <Monitor className="w-3.5 h-3.5 text-violet-400" />
                    <span>DISPLAY SOURCE</span>
                  </span>
                  <span className="text-slate-500 text-[10px] font-black uppercase">IPS LAPTOP PANEL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase font-sans">15.6" Full HD 1080p</span>
                  <span className="text-[10px] font-mono font-black text-violet-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span>144Hz Active Sync</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Core telemetry quick index */}
          <div className="bg-slate-900/40 border border-[#1e293b]/65 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <h3 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">Telemetry index overview</h3>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Platform type:</span>
                <span className="font-bold text-slate-200 uppercase text-right">HP Victus LAPTOP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Playtime:</span>
                <span className="font-bold text-[#ffe600] text-right">{totalPlaytime} HRS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Average Game Size:</span>
                <span className="font-bold text-cyan-400 text-right">
                  {totalGames > 0 ? `${Math.round(totalStorage / totalGames)} GB` : '0 GB'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
