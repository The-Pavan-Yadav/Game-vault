import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Heart, 
  BarChart3, 
  Cpu, 
  Gamepad,
  Volume2,
  VolumeX,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [soundOn, setSoundOn] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Games', path: '/games', icon: Gamepad2 },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    const currentPath = location.pathname;
    if (item.path === '/') {
      return currentPath === '/';
    }
    if (item.path === '/games') {
      return currentPath.startsWith('/games') || currentPath.startsWith('/game/');
    }
    return currentPath === item.path || currentPath.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      {/* Background Cyber Glow Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Glass Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#060814]/85 border-b border-slate-800/80 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-lg blur opacity-70 animate-pulse" />
            <div className="relative bg-slate-950 p-2 rounded-lg border border-slate-700">
              <Gamepad className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 text-transparent bg-clip-text font-black tracking-wider text-xl md:text-2xl uppercase">
              GameVault
            </span>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30 w-fit mt-0.5">
              <span>System: Online</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle (immersive game flavor) */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900/40 rounded-lg hover:bg-slate-800/50 border border-slate-800/80 transition-all cursor-pointer"
            title={soundOn ? 'Mute Interface Sounds' : 'Enable Interface Sounds'}
            id="sound-toggle-btn"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Wrapper */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-800/80 backdrop-blur-md bg-[#060814]/40 p-6 z-10 sticky top-[73px] h-[calc(100vh-73px)]">
          <div className="text-slate-500 text-[10px] font-bold tracking-widest font-mono uppercase mb-4 pl-4">
            Navigation Menu
          </div>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group duration-300 cursor-pointer
                    ${isActive 
                      ? 'text-[#00f0ff] border-l-2 border-cyan-400' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/20 border-l-2 border-transparent'
                    }
                  `}
                  id={`nav-desktop-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {/* Stable sliding active background */}
                  {isActive && (
                    <motion.div 
                      layoutId="desktopActiveNav" 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-950/25 to-indigo-950/15 rounded-xl -z-10 shadow-md shadow-cyan-950/20"
                      transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                    />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-cyan-500/5 rounded-xl filter blur-sm -z-10" />
                  )}
                  
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  
                  <span>{item.name}</span>
                  
                  {/* Subtle navigation dot */}
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`} />
                </NavLink>
              );
            })}
          </nav>

        </aside>

        {/* Dynamic Visual Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 z-10 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg bg-[#060814]/95 border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-around pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all text-[10px] uppercase tracking-wider font-semibold cursor-pointer select-none
                ${isActive ? 'text-cyan-400 scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'}
              `}
              id={`nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              {/* Fluid Active highlight capsule */}
              {isActive && (
                <motion.div 
                  layoutId="mobileActiveNav" 
                  className="absolute inset-0 bg-cyan-950/40 border-t-2 border-cyan-400 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                />
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="text-[9px] mt-0.5">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
