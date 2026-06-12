import React, { useState } from 'react';
import { useGameVault } from '../context/GameVaultContext';
import { Cpu, HardDrive, Monitor, Save, ToggleLeft, Activity, Volume2, Sparkles, Check } from 'lucide-react';

const RGB_PALETTE = [
  { name: 'Neon Cyber', color: '#00f0ff', desc: 'Futuristic blue laser glow' },
  { name: 'Toxic Chemical', color: '#39ff14', desc: 'Radioactive toxic green energy' },
  { name: 'Cosmic Magenta', color: '#ff007f', desc: 'Stellar magenta supernova beam' },
  { name: 'Bloodline Crimson', color: '#ff073a', desc: 'Rage crimson weapon heat' },
  { name: 'Quantum Purple', color: '#9d4edd', desc: 'Deep spacetime lavender wormhole' },
  { name: 'Solar Flare', color: '#ff9f1c', desc: 'Blazing nuclear solar wind' }
];

export const PCSetup: React.FC = () => {
  const { setup, updateSetup } = useGameVault();

  // Form states initialized with context
  const [cpu, setCpu] = useState(setup.cpu);
  const [gpu, setGpu] = useState(setup.gpu);
  const [ram, setRam] = useState(setup.ram);
  const [storage, setStorage] = useState(setup.storage);
  const [monitor, setMonitor] = useState(setup.monitor);
  const [caseName, setCaseName] = useState(setup.caseName);
  const [rgbColor, setRgbColor] = useState(setup.rgbColor);

  const [saving, setSaving] = useState(false);
  const [showStatusGlow, setShowStatusGlow] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate telemetry flashing write
    setTimeout(() => {
      updateSetup({
        cpu,
        gpu,
        ram,
        storage,
        monitor,
        caseName,
        rgbColor
      });
      setSaving(false);
    }, 600);
  };

  const selectColorPreset = (color: string) => {
    setRgbColor(color);
    updateSetup({ rgbColor: color });
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Visual Workspace grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: RGB Case Simulation tower */}
        <div className="lg:col-span-5 flex flex-col items-center p-6 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-md relative overflow-hidden">
          
          {/* Neon dust details */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full filter blur-[100px] opacity-40 transition-all duration-500 pointer-events-none"
            style={{ backgroundColor: rgbColor }}
          />

          <div className="w-full text-center space-y-1 z-10">
            <h3 className="text-xs font-black uppercase text-slate-350 tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: rgbColor }} />
              <span>Engine Core Thermals</span>
            </h3>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Interactive RGB case visualizer</p>
          </div>

          {/* CUSTOM SVG RIG CASE CHASSIS RENDERER */}
          <div className="relative w-full max-w-[260px] h-[340px] my-6 flex items-center justify-center filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-10 select-none">
            <svg 
              viewBox="0 0 200 260" 
              className="w-full h-full"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer chassis shell steel container */}
              <rect x="15" y="10" width="170" height="235" rx="12" fill="#04060e" stroke="#1e293b" strokeWidth="4" />
              
              {/* Tempered Glass boundary display */}
              <rect x="25" y="20" width="150" height="205" rx="8" fill="#080c18" stroke="#334155" strokeWidth="1.5" />
              
              {/* Motherboard circuit background template */}
              <rect x="50" y="32" width="120" height="150" rx="4" fill="#05070a" />
              <path d="M60 40H110V55H60V40Z" fill="#1e293b" />
              <path d="M125 40H160V140H125V40Z" fill="#0c101b" />
              {/* Memory Sticks lines */}
              <line x1="135" y1="50" x2="135" y2="85" stroke="#1e293b" strokeWidth="2" />
              <line x1="141" y1="50" x2="141" y2="85" stroke="#1e293b" strokeWidth="2" />
              <line x1="147" y1="50" x2="147" y2="85" stroke="#1e293b" strokeWidth="2" />

              {/* Glowing RAM RGB Strip */}
              <line 
                x1="135" y1="48" x2="147" y2="48" 
                stroke={rgbColor} 
                strokeWidth="3.5" 
                strokeLinecap="round"
                className="transition-all duration-300 filter drop-shadow-[0_0_5px_currentColor]"
                style={{ color: rgbColor }}
              />

              {/* CPU cooler fan circle block */}
              <circle cx="95" cy="85" r="30" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
              {/* Water Cooling Block ring glow */}
              <circle 
                cx="95" cy="85" r="23" 
                stroke={rgbColor} 
                strokeWidth="4" 
                fill="none"
                className="transition-all duration-300 filter drop-shadow-[0_0_8px_currentColor]"
                style={{ color: rgbColor }}
              />
              <circle cx="95" cy="85" r="14" fill="#0d1424" />
              
              {/* Graphics Card horizontally set block */}
              <rect x="40" y="125" width="125" height="30" rx="4" fill="#04060d" stroke="#1e293b" strokeWidth="2" />
              
              {/* GPU Branding glow strip */}
              <line 
                x1="45" y1="130" x2="105" y2="130" 
                stroke={rgbColor} 
                strokeWidth="3" 
                strokeLinecap="round"
                className="transition-all duration-300 filter drop-shadow-[0_0_6px_currentColor]"
                style={{ color: rgbColor }}
              />
              <circle cx="120" cy="140" r="8" fill="#1e293b" />
              <circle cx="142" cy="140" r="8" fill="#1e293b" />

              {/* Front intake cooling fan - Fan 1 (Top Front) */}
              <circle cx="187" cy="65" r="18" fill="none" />
              <path 
                d="M185 45V85" 
                stroke={rgbColor} 
                strokeWidth="4" 
                strokeLinecap="round"
                className="transition-all duration-300 filter drop-shadow-[0_0_8px_currentColor]"
                style={{ color: rgbColor }}
              />

              {/* Front intake cooling fan - Fan 2 (Bottom Front) */}
              <path 
                d="M185 110V150" 
                stroke={rgbColor} 
                strokeWidth="4" 
                strokeLinecap="round"
                className="transition-all duration-300 filter drop-shadow-[0_0_8px_currentColor]"
                style={{ color: rgbColor }}
              />

              {/* Rear exhaust fan */}
              <circle 
                cx="22" cy="85" r="14" 
                stroke={rgbColor} 
                strokeWidth="2.5" 
                fill="none"
                className="transition-all duration-300 filter drop-shadow-[0_0_6px_currentColor]"
                style={{ color: rgbColor }}
              />
              <circle cx="22" cy="85" r="6" fill="#111827" />

              {/* Top exhaust ventilation glow path */}
              <line 
                x1="65" y1="12" x2="135" y2="12" 
                stroke={rgbColor} 
                strokeWidth="2" 
                className="transition-all duration-300 filter drop-shadow-[0_0_5px_currentColor]"
                style={{ color: rgbColor }}
              />

              {/* Bottom Power Supply / Storage PSU Shroud panel */}
              <rect x="25" y="185" width="150" height="40" rx="2" fill="#04050a" stroke="#1e293b" strokeWidth="2" />
              <rect x="35" y="195" width="60" height="20" rx="2" fill="#0f172a" />
              <line x1="42" y1="205" x2="88" y2="205" stroke="#334155" strokeWidth="2" />
              
              {/* Shroud glowing base indicator */}
              <line 
                x1="30" y1="188" x2="170" y2="188" 
                stroke={rgbColor} 
                strokeWidth="2.5" 
                className="transition-all duration-300 filter drop-shadow-[0_0_6px_currentColor]"
                style={{ color: rgbColor }}
              />

              {/* Feet of Case */}
              <rect x="35" y="245" width="20" height="8" rx="2" fill="#1e293b" />
              <rect x="145" y="245" width="20" height="8" rx="2" fill="#1e293b" />
            </svg>
          </div>

          {/* Color Presets Picker grid list */}
          <div className="w-full bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 z-10">
            <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest leading-none">Choose Core Aura Preset</span>
            
            <div className="grid grid-cols-6 gap-2">
              {RGB_PALETTE.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => selectColorPreset(preset.color)}
                  className={`relative aspect-square rounded-lg border-2 cursor-pointer outline-none transition-all hover:scale-105 ${
                    rgbColor.toLowerCase() === preset.color.toLowerCase() 
                      ? 'border-white scale-105' 
                      : 'border-transparent hover:border-slate-700'
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={`${preset.name}: ${preset.desc}`}
                >
                  {rgbColor.toLowerCase() === preset.color.toLowerCase() && (
                    <div className="absolute inset-x-0 inset-y-0 m-auto w-3.5 h-3.5 flex items-center justify-center text-slate-950 bg-white rounded-full">
                      <Check className="w-2.5 h-2.5 stroke-[4.5]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
              <span className="uppercase">HEX Code Telemetry:</span>
              <span className="font-bold tracking-widest text-slate-100">{rgbColor.toUpperCase()}</span>
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Telemetry Form specifications */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
          
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest font-sans">Hardware Cache Core Config</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">Specify active specs of your gaming build</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#00f0ff] mb-1.5">Processing CPU Unit</label>
              <input
                type="text"
                required
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="e.g. Intel Core i7-14700K or AMD Ryzen 7"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#00f0ff] mb-1.5">Graphics GPU Engine</label>
              <input
                type="text"
                required
                value={gpu}
                onChange={(e) => setGpu(e.target.value)}
                placeholder="e.g. NVIDIA RTX 4070 Ti Super or AMD Radeon RX 7900"
                className="w-full bg-slate-950 border border-slate-800 focus:border-fuchsia-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">Memory Module (RAM)</label>
                <input
                  type="text"
                  required
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  placeholder="e.g. 32GB DDR5 Dual Channel @ 6000MHz"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">Storage Drives Layout</label>
                <input
                  type="text"
                  required
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  placeholder="e.g. 2TB NVMe M.2 SSD PCIe Gen 4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">Display Monitors Matrix</label>
                <input
                  type="text"
                  required
                  value={monitor}
                  onChange={(e) => setMonitor(e.target.value)}
                  placeholder="e.g. LG UltraGear 27'' IPS 1440p 165Hz"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">Chassis / Case Build</label>
                <input
                  type="text"
                  required
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  placeholder="e.g. Fractal Design North Walnut Wood"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650 transition-all font-medium"
                />
              </div>
            </div>

            {/* Simulated Thermals Indicators switches */}
            <div className="flex flex-col sm:flex-row p-3 rounded-xl bg-slate-950 border border-slate-850 justify-between sm:items-center gap-2">
              <span className="text-[10px] font-mono font-black text-slate-450 uppercase tracking-wider">Simulate Thermals Overclock</span>
              <button
                type="button"
                onClick={() => setShowStatusGlow(!showStatusGlow)}
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                  showStatusGlow ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div 
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    showStatusGlow ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 text-xs font-mono font-bold uppercase transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Writing Telemetry...' : 'Commit Hardware Spec'}</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
