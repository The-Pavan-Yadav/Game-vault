import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface GameCoverProps {
  title: string;
  coverUrl: string;
  className?: string;
  alt?: string;
  showHoverEffect?: boolean;
}

// Map real titles to actual official Steam capsule details for flawless fallback delivery
const getSteamCoverUrl = (title: string): string => {
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanTitle.includes('cyberpunk')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1091500/library_600x900_2x.jpg';
  if (cleanTitle.includes('forza') || cleanTitle.includes('horizon')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1551360/library_600x900_2x.jpg';
  if (cleanTitle.includes('daysgone')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1030840/library_600x900_2x.jpg';
  if (cleanTitle.includes('eldenring')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1245620/library_600x900_2x.jpg';
  if (cleanTitle.includes('reddead') || cleanTitle.includes('rdr2') || cleanTitle.includes('redemption')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1174180/library_600x900_2x.jpg';
  if (cleanTitle.includes('doometernal') || cleanTitle.includes('doom')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/782330/library_600x900_2x.jpg';
  if (cleanTitle.includes('hades')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1145360/library_600x900_2x.jpg';
  if (cleanTitle.includes('flight') || cleanTitle.includes('mfs') || cleanTitle.includes('microsoftflight')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1250410/library_600x900_2x.jpg';
  if (cleanTitle.includes('godofwar') || cleanTitle.includes('kratos')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1593500/library_600x900_2x.jpg';
  if (cleanTitle.includes('hitman')) return 'https://cdn.cloudflaresteamstatic.com/steam/apps/1659040/library_600x900_2x.jpg';
  
  // High quality Unsplash gaming fallback
  return '';
};

export const GameCover: React.FC<GameCoverProps> = ({
  title,
  coverUrl,
  className = '',
  alt = '',
  showHoverEffect = true
}) => {
  // States of loading tries
  const [imgSrc, setImgSrc] = useState<string>(coverUrl);
  const [retryCount, setRetryCount] = useState<number>(0); // 0 = local, 1 = Steam capsule, 2 = failed
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (retryCount === 0) {
      // Step 1 fail: Local file in /covers/ is missing. Try Steam CDN vertical cover.
      const steamUrl = getSteamCoverUrl(title);
      if (steamUrl) {
        setImgSrc(steamUrl);
        setRetryCount(1);
      } else {
        setHasError(true);
        setRetryCount(2);
      }
    } else {
      // Step 2 fail: Both failed, trigger tech fallback block
      setHasError(true);
      setRetryCount(2);
    }
  };

  // If both loads fail, render a gorgeously styled custom fallback card
  if (hasError || !imgSrc) {
    return (
      <div 
        className={`relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 flex flex-col items-center justify-center p-4 text-center select-none shadow-md ${className}`}
        id={`cover-id-fallback-${title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500" />
        
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl mb-3 group-hover:border-cyan-500/35 transition-all duration-300">
          <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        
        <h4 className="text-xs font-black uppercase text-slate-100 tracking-wider font-sans line-clamp-2 px-1">
          {title}
        </h4>
        <div className="text-[8px] font-mono text-slate-500 mt-2 uppercase tracking-widest bg-slate-950/60 border border-slate-850 px-2 py-0.5 rounded">
          SPEC_ERROR_602
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800/80 transition-all duration-500 shadow-md ${className}`}
      id={`cover-id-${title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
    >
      <img
        src={imgSrc}
        alt={alt || title}
        onError={handleError}
        className={`w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out ${
          showHoverEffect ? 'group-hover:scale-108' : ''
        }`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-10 group-hover:opacity-40 transition-opacity duration-500" />
    </div>
  );
};
