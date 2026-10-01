import React from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from '../utils/audio';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'hint';
  message: string;
  speechEnabled: boolean;
  onMascotClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const MascotSofia: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  speechEnabled,
  onMascotClick,
  size = 'md'
}) => {
  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(message, speechEnabled);
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 md:w-28 md:h-28',
    lg: 'w-32 h-32 md:w-36 md:h-36'
  };

  return (
    <div className="flex items-end gap-3 max-w-2xl mx-auto my-2 select-none">
      {/* Interactive Mascot SVG */}
      <button
        type="button"
        onClick={onMascotClick || (() => speak(message, speechEnabled))}
        title="Clique na Corujinha Sofia para ouvir!"
        className={`relative ${sizeClasses[size]} shrink-0 transition-transform active:scale-95 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Owl Body */}
          <ellipse cx="60" cy="68" rx="42" ry="46" fill="#F59E0B" />
          <ellipse cx="60" cy="72" rx="32" ry="36" fill="#FEF3C7" />

          {/* Ears / Tufts */}
          <polygon points="28,26 44,48 24,52" fill="#D97706" />
          <polygon points="92,26 76,48 96,52" fill="#D97706" />

          {/* Wings */}
          {mood === 'celebrating' ? (
            <>
              {/* Wings raised in victory */}
              <ellipse cx="20" cy="50" rx="14" ry="24" fill="#D97706" transform="rotate(-30 20 50)" />
              <ellipse cx="100" cy="50" rx="14" ry="24" fill="#D97706" transform="rotate(30 100 50)" />
            </>
          ) : (
            <>
              {/* Rested Wings */}
              <ellipse cx="22" cy="72" rx="12" ry="22" fill="#D97706" />
              <ellipse cx="98" cy="72" rx="12" ry="22" fill="#D97706" />
            </>
          )}

          {/* Feet */}
          <ellipse cx="46" cy="112" rx="10" ry="5" fill="#EA580C" />
          <ellipse cx="74" cy="112" rx="10" ry="5" fill="#EA580C" />

          {/* Big Owl Eyes Background */}
          <circle cx="44" cy="54" r="19" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="76" cy="54" r="19" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />

          {/* Cute Round Glasses */}
          <circle cx="44" cy="54" r="19" fill="none" stroke="#DC2626" strokeWidth="3" />
          <circle cx="76" cy="54" r="19" fill="none" stroke="#DC2626" strokeWidth="3" />
          <line x1="60" y1="54" x2="60" y2="54" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <path d="M 25 52 Q 20 50 16 52" stroke="#DC2626" strokeWidth="2.5" fill="none" />
          <path d="M 95 52 Q 100 50 104 52" stroke="#DC2626" strokeWidth="2.5" fill="none" />

          {/* Pupils & Highlights */}
          {mood === 'thinking' ? (
            <>
              <circle cx="48" cy="48" r="9" fill="#1E293B" />
              <circle cx="80" cy="48" r="9" fill="#1E293B" />
              <circle cx="51" cy="46" r="3" fill="#FFFFFF" />
              <circle cx="83" cy="46" r="3" fill="#FFFFFF" />
            </>
          ) : mood === 'celebrating' ? (
            <>
              {/* Happy squint eyes */}
              <path d="M 35 55 Q 44 46 53 55" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 67 55 Q 76 46 85 55" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="46" cy="54" r="9" fill="#1E293B" />
              <circle cx="74" cy="54" r="9" fill="#1E293B" />
              <circle cx="49" cy="51" r="3.5" fill="#FFFFFF" />
              <circle cx="77" cy="51" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Orange Beak */}
          <polygon points="60,63 52,73 68,73" fill="#EA580C" />

          {/* Little Blush Cheeks */}
          <ellipse cx="32" cy="68" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.8" />
          <ellipse cx="88" cy="68" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.8" />

          {/* Academic Graduation / Book Badge */}
          <rect x="48" y="12" width="24" height="6" rx="2" fill="#2563EB" />
          <polygon points="60,6 40,14 60,20 80,14" fill="#1D4ED8" />
          <circle cx="60" cy="13" r="2.5" fill="#FBBF24" />
          <line x1="60" y1="13" x2="68" y2="24" stroke="#FBBF24" strokeWidth="1.5" />
        </svg>

        {/* Floating speech indicator hint */}
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-sm">
          <Volume2 className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Comic Speech Bubble */}
      <div className="relative flex-1 bg-white border-2 border-amber-300 rounded-2xl rounded-bl-none p-3 md:p-4 shadow-sm text-slate-800">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-0.5">
              Corujinha Sofia diz:
            </div>
            <p className="text-sm md:text-base font-semibold leading-relaxed text-slate-700">
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={handleListen}
            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shrink-0"
            title="Ouvir a Corujinha Sofia falar"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
