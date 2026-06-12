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
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Top Banner section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0e122b] to-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
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
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card: Total Games */}
        <div className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-violet-950/20 transition-all duration-300">
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
        </div>

        {/* Metric Card: Total Storage */}
        <div className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-cyan-950/20 transition-all duration-300">
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
        </div>

        {/* Metric Card: Average Rating */}
        <div className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-amber-950/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full filter blur-xl transition-all duration-300 group-hover:from-amber-500/20" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-sans tracking-widest text-slate-400 uppercase">Average Rating</span>
            <div className="bg-amber-950/50 p-2.5 rounded-xl border border-amber-800/40 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-sans tracking-tight text-white">{averageRating} <span className="text-sm font-normal text-slate-500">/ 5.0</span></h3>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">General Quality Index</p>
          </div>
        </div>

        {/* Metric Card: Completed Games */}
        <div className="relative group overflow-hidden bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-fuchsia-500/40 rounded-2xl p-5 hover:shadow-lg hover:shadow-fuchsia-950/20 transition-all duration-300">
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
            <div className="w-full bg-slate-850 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </div>
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
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/80 rounded-xl gap-4 transition-all hover:bg-slate-950/80"
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
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-64 shadow-2xl group">
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
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight line-clamp-1">{favoriteGame.title}</h3>
                  <p className="text-xs text-slate-350 line-clamp-2 max-w-lg mt-1 font-medium italic">
                    "{favoriteGame.notes || 'No log details custom defined yet.'}"
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800/60 p-3 rounded-xl shrink-0 backdrop-blur-sm self-start sm:self-auto">
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
          
          {/* Pro Gaming Streak telemetry summary */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#ffe600] flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Vault Heat Index</span>
            </h2>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Total Investment</span>
                <span className="text-xs font-mono font-bold text-[#ffe600]">{totalPlaytime} HR Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Average Game Size</span>
                <span className="text-xs font-mono font-bold text-[#ffe600]">
                  {totalGames > 0 ? `${Math.round(totalStorage / totalGames)} GB` : '0 GB'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Current XP Tier</span>
                <span className="text-xs font-mono font-bold text-[#ffe600]">TIER_IV_LEGEND</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                <span>XP Level Progression</span>
                <span>{Math.min(100, Math.round(totalPlaytime / 1.5))}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                <div 
                  className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.round(totalPlaytime / 1.5))}%` }} 
                />
              </div>
              <p className="text-[9px] font-mono text-slate-500 uppercase mt-1">Unlock Next level at 200 playtime hours</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
