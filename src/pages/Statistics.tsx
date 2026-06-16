import React from 'react';
import { useGameVault } from '../context/GameVaultContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Clock, 
  HardDrive, 
  Inbox, 
  Activity, 
  Trophy, 
  Star, 
  Cpu 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Statistics: React.FC = () => {
  const { games } = useGameVault();

  if (games.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 animate-fade-in">
        <BarChart3 className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-sm font-bold text-slate-300 uppercase">Interactive Databanks offline</h3>
        <p className="text-xs text-slate-400">Add games to your active catalog to populate statistical layouts and breakdown curves.</p>
      </div>
    );
  }

  // 1. Data Prep for Disk Space per Game (BarChart)
  const storageData = games.map(g => ({
    name: g.title.length > 12 ? `${g.title.substring(0, 12)}...` : g.title,
    fullTitle: g.title,
    Storage: g.storageGB
  }));

  // 2. Data Prep for Playtime investment (BarChart)
  const playtimeData = games.map(g => ({
    name: g.title.length > 12 ? `${g.title.substring(0, 12)}...` : g.title,
    fullTitle: g.title,
    Playtime: g.playtimeHours
  })).sort((a, b) => b.Playtime - a.Playtime);

  // 3. Genre Share calculation (PieChart)
  const genreCount: { [key: string]: number } = {};
  games.forEach(g => {
    genreCount[g.genre] = (genreCount[g.genre] || 0) + 1;
  });
  const genreData = Object.keys(genreCount).map(key => ({
    name: key,
    value: genreCount[key]
  }));

  // 4. Status counts calculation (PieChart)
  const statusCount = { playing: 0, completed: 0, backlog: 0 };
  games.forEach(g => {
    if (g.status in statusCount) {
      statusCount[g.status as keyof typeof statusCount]++;
    }
  });
  const statusData = [
    { name: 'Playing', value: statusCount.playing, color: '#00f0ff' },
    { name: 'Completed', value: statusCount.completed, color: '#10b981' },
    { name: 'Backlog', value: statusCount.backlog, color: '#ffe600' }
  ].filter(item => item.value > 0);

  // Deriving calculations requested:
  // - Total storage usage
  const totalStorage = games.reduce((acc, game) => acc + game.storageGB, 0);

  // - Highest rated game
  const highestRatedGame = games.reduce((prev, current) => {
    return (prev.rating > current.rating) ? prev : current;
  });

  // - Completion percentage
  const completedCount = games.filter(g => g.status === 'completed').length;
  const completionPercentage = games.length > 0 
    ? Math.round((completedCount / games.length) * 100) 
    : 0;

  // Theme presets
  const VISUAL_COLORS = ['#00f0ff', '#f43f5e', '#ffe600', '#10b981', '#8b5cf6', '#3b82f6', '#f97316'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const isPlaytime = payload[0].name === 'Playtime';
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-xl font-sans text-xs">
          <p className="font-bold text-slate-200">{payload[0].payload.fullTitle || payload[0].name}</p>
          <p className="text-[#00f0ff] font-mono mt-1 font-bold">
            {isPlaytime ? `${payload[0].value} Playtime Hours` : `${payload[0].value} GB Allocated`}
          </p>
        </div>
      );
    }
    return null;
  };

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
      
      {/* Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span>Database Analytics & Statistics</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Deep telemetry records and space allocation analysis.
        </p>
      </motion.div>

      {/* Telemetry quick stats rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Genre count metadata */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            GENRE VELOCITY
          </span>
          <h3 className="text-2xl font-black text-white font-mono">
            {genreData.length} <span className="text-xs font-semibold text-slate-500 uppercase">Genres</span>
          </h3>
          <p className="text-[9px] font-mono text-cyan-400 mt-1 uppercase">Dynamic categorization</p>
        </div>

        {/* Total Storage usage */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            TOTAL STORAGE FOOTPRINT
          </span>
          <h3 className="text-2xl font-black text-white font-mono text-fuchsia-400">
            {totalStorage >= 1024 ? `${(totalStorage/1024).toFixed(1)} TB` : `${totalStorage} GB`}
          </h3>
          <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase">Sectors Allocated Space</p>
        </div>

        {/* Highest rated game */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md overflow-hidden relative">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            HIGHEST RATED TITLE
          </span>
          <h3 className="text-lg font-black text-amber-400 truncate uppercase" title={highestRatedGame.title}>
            {highestRatedGame.title}
          </h3>
          <p className="text-[9px] font-mono text-slate-450 mt-1 uppercase font-semibold">
            Score: ★ {highestRatedGame.rating.toFixed(1)}
          </p>
        </div>

        {/* Completion percentage */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            COMPLETION PROGRESSION
          </span>
          <h3 className="text-2xl font-black text-white font-mono text-emerald-400">
            {completionPercentage}%
          </h3>
          <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase">
            {completedCount} of {games.length} completed
          </p>
        </div>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: Storage Space Breakdown */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-4.5 h-4.5 text-cyan-400" />
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Disk Sector Footprint (GB)</h3>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="storageGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.3 }} />
                <Bar dataKey="Storage" fill="url(#storageGlow)" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Playtime hours invested */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4.5 h-4.5 text-fuchsia-400" />
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Aggregate Campaign Hours</h3>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={playtimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="playtimeGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.3 }} />
                <Bar dataKey="Playtime" fill="url(#playtimeGlow)" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Genre share */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Inbox className="w-4.5 h-4.5 text-amber-400" />
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Genre Share Breakdown</h3>
          </div>
          <div className="h-64 sm:h-72 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="h-56 w-56 relative border-transparent">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={VISUAL_COLORS[index % VISUAL_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Games`, 'Volume']} contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                <span className="text-3xl font-black font-mono text-slate-100">{games.length}</span>
                <span className="text-[9px] font-mono tracking-widest text-[#00f0ff] uppercase">Games Total</span>
              </div>
            </div>

            {/* Custom details list for legend */}
            <div className="space-y-1.5 self-start sm:self-center w-full sm:w-auto overflow-y-auto max-h-56">
              {genreData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: VISUAL_COLORS[index % VISUAL_COLORS.length] }} />
                  <span className="text-slate-400 font-medium capitalize">{entry.name}:</span>
                  <span className="font-mono font-bold text-slate-200 ml-auto sm:ml-0">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHART 4: Status Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4.5 h-4.5 text-emerald-400" />
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Library Telemetry Status</h3>
          </div>
          <div className="h-64 sm:h-72 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="h-56 w-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={75}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Entries`, 'Volume']} contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Status Legend table */}
            <div className="space-y-2.5 w-full sm:w-auto self-start sm:self-center">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs w-full sm:w-40">
                  <span className="w-1.5 h-4 rounded-full inline-block animate-pulse" style={{ backgroundColor: entry.color }} />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-300 leading-none capitalize">{entry.name}</h5>
                    <p className="text-[10px] font-mono font-bold mt-1" style={{ color: entry.color }}>
                      {entry.value} {entry.value === 1 ? 'Title' : 'Titles'} ({Math.round(entry.value / games.length * 100)}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
