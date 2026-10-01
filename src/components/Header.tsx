import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Trophy, Award, CaseUpper, CaseLower } from 'lucide-react';
import { GameMode, GameSettings, PlayerStats } from '../types';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  stats: PlayerStats;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  settings,
  onUpdateSettings,
  stats,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => onSelectMode('MENU')}
          className="text-lg md:text-xl font-bold font-['Fredoka',sans-serif] tracking-tight text-amber-900 hover:text-amber-700 transition-colors cursor-pointer text-left shrink-0"
        >
          Aventura D09 · 2º Ano
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => onSelectMode('SYLLABLES')}
            className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
              currentMode === 'SYLLABLES'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100 hover:text-amber-900'
            }`}
          >
            Fábrica de Sílabas
          </button>
          <button
            onClick={() => onSelectMode('TEXTS')}
            className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
              currentMode === 'TEXTS'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-sky-100 hover:text-sky-900'
            }`}
          >
            Detetive de Textos
          </button>
          <button
            onClick={() => onSelectMode('CHAMPIONSHIP')}
            className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'CHAMPIONSHIP'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-emerald-100 hover:text-emerald-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            Grande Torneio
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Stars Score Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg border border-amber-300 font-bold text-amber-900 text-xs md:text-sm tabular-nums">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-400" />
            <span>{stats.starsTotal}</span>
          </div>

          {/* Upper/Lower Case Switch (Pedagogical Essential for 2nd grade) */}
          <button
            onClick={() => onUpdateSettings({ uppercaseOnly: !settings.uppercaseOnly })}
            title={settings.uppercaseOnly ? 'Mudar para letra minúscula' : 'Mudar para LETRAS MAIÚSCULAS'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer text-xs font-bold flex items-center justify-center ${
              settings.uppercaseOnly
                ? 'bg-amber-500 border-amber-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {settings.uppercaseOnly ? (
              <span className="flex items-center gap-1">
                <CaseUpper className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">ABC</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <CaseLower className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">abc</span>
              </span>
            )}
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            title={settings.soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              settings.soundEnabled
                ? 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200'
                : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pedagogical Report Button */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            title="Abrir Painel Pedagógico do Professor e BNCC"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Painel Pedagógico</span>
          </button>

          {/* Certificate Generator */}
          <button
            onClick={() => onSelectMode('CERTIFICATE')}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            title="Gerar Diploma do 2º Ano"
          >
            <Award className="w-4 h-4 text-amber-900" />
            <span className="hidden sm:inline">Diploma</span>
          </button>
        </div>
      </div>
    </header>
  );
};
