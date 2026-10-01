import React from 'react';
import { Layers, Search, Trophy, Sparkles, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { GameMode, GameSettings, PlayerStats } from '../types';
import { speak } from '../utils/audio';

interface MainMenuProps {
  onSelectMode: (mode: GameMode) => void;
  settings: GameSettings;
  stats: PlayerStats;
  onOpenReport: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode,
  settings,
  stats,
  onOpenReport,
}) => {
  const handleWelcomeSpeech = () => {
    speak(
      'Bem-vindo à Aventura do Descritor 09 de Língua Portuguesa! Escolha um jogo: Fábrica de Sílabas, Detetive de Textos ou o Grande Torneio!',
      settings.speechEnabled
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-6 md:p-10 text-white shadow-lg overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-orange-600/20 rounded-full blur-lg" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>Língua Portuguesa · 2º Ano do Ensino Fundamental</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight leading-tight">
              Aventura do Descritor 09
            </h1>

            <p className="text-amber-100 text-sm md:text-base leading-relaxed font-medium">
              Aprenda brincando a identificar <strong>sílabas não canônicas</strong> (CCV, CVC, V, CVV) e a descobrir <strong>a finalidade social dos textos</strong> com a Corujinha Sofia!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={handleWelcomeSpeech}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="Ouvir boas-vindas"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ouvir Apresentação</span>
              </button>

              <button
                onClick={onOpenReport}
                className="px-4 py-2 bg-amber-900/30 hover:bg-amber-900/40 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-amber-100"
              >
                <BookOpen className="w-4 h-4" />
                <span>Guia BNCC & Matrizes</span>
              </button>
            </div>
          </div>

          {/* Sofia Mascot Illustration in Hero */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 drop-shadow-xl animate-bounce-gentle">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <ellipse cx="60" cy="68" rx="42" ry="46" fill="#FEF3C7" />
                <ellipse cx="60" cy="68" rx="38" ry="42" fill="#F59E0B" />
                <ellipse cx="60" cy="74" rx="28" ry="32" fill="#FFFBEB" />
                {/* Ears */}
                <polygon points="28,26 44,48 24,52" fill="#D97706" />
                <polygon points="92,26 76,48 96,52" fill="#D97706" />
                {/* Wings */}
                <ellipse cx="20" cy="72" rx="10" ry="20" fill="#D97706" />
                <ellipse cx="100" cy="72" rx="10" ry="20" fill="#D97706" />
                {/* Eyes */}
                <circle cx="44" cy="54" r="17" fill="#FFFFFF" />
                <circle cx="76" cy="54" r="17" fill="#FFFFFF" />
                <circle cx="44" cy="54" r="17" fill="none" stroke="#DC2626" strokeWidth="2.5" />
                <circle cx="76" cy="54" r="17" fill="none" stroke="#DC2626" strokeWidth="2.5" />
                <line x1="60" y1="54" x2="60" y2="54" stroke="#DC2626" strokeWidth="2.5" />
                <circle cx="46" cy="54" r="8" fill="#1E293B" />
                <circle cx="74" cy="54" r="8" fill="#1E293B" />
                <circle cx="48" cy="51" r="3" fill="#FFFFFF" />
                <circle cx="76" cy="51" r="3" fill="#FFFFFF" />
                {/* Beak */}
                <polygon points="60,63 54,72 66,72" fill="#EA580C" />
                {/* Cheeks */}
                <ellipse cx="32" cy="66" rx="5" ry="3" fill="#FCA5A5" />
                <ellipse cx="88" cy="66" rx="5" ry="3" fill="#FCA5A5" />
                {/* Hat */}
                <polygon points="60,8 38,18 60,24 82,18" fill="#1E3A8A" />
                <rect x="52" y="18" width="16" height="5" fill="#2563EB" />
              </svg>
            </div>
            <span className="text-xs font-black text-amber-950 bg-amber-200/90 px-3 py-0.5 rounded-full mt-2 shadow-xs">
              Corujinha Sofia
            </span>
          </div>
        </div>
      </div>

      {/* 3 Main Game Modes Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black font-['Fredoka',sans-serif] text-slate-900">
            Escolha Sua Aventura
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            3 Modos de Aprendizagem Interativa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Fábrica de Sílabas */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider block">
                Matriz SPAECE-Alfa / CAEd
              </span>
              <h3 className="text-xl font-black font-['Fredoka',sans-serif] text-slate-900 mt-1 mb-2">
                Fábrica de Sílabas
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                Encaixe a sílaba que falta, monte o Trem das Palavras e identifique sílabas complexas (CCV como <em>PRA</em>, CVC como <em>POR</em>, CVV como <em>PEI</em>).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">
                {stats.syllableCorrect} acertos
              </span>
              <button
                onClick={() => onSelectMode('SYLLABLES')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Jogar Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Detetive de Textos */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 mb-4 group-hover:scale-105 transition-transform">
                <Search className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-black text-sky-700 uppercase tracking-wider block">
                Matriz SAEB / Prova Brasil
              </span>
              <h3 className="text-xl font-black font-['Fredoka',sans-serif] text-slate-900 mt-1 mb-2">
                Detetive de Textos
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                Leia convites, receitas, bilhetes, cartazes e piadas para descobrir o objetivo social de cada gênero textual com leitura em voz alta.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700">
                {stats.textCorrect} acertos
              </span>
              <button
                onClick={() => onSelectMode('TEXTS')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Investigar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Grande Torneio */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-105 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider block">
                Desafio Progressivo
              </span>
              <h3 className="text-xl font-black font-['Fredoka',sans-serif] text-slate-900 mt-1 mb-2">
                Grande Torneio
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                Uma trilha com 10 fases desafiadoras misturando sílabas e gêneros textuais. Ganhe medalhas e desbloqueie o Diploma Oficial do 2º Ano!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">
                {stats.levelsCompleted.length}/10 fases
              </span>
              <button
                onClick={() => onSelectMode('CHAMPIONSHIP')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Ver Trilha</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Tips Banner */}
      <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              Dica para Pais e Educadores
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Você pode alternar entre <strong>LETRAS MAIÚSCULAS (BASTÃO)</strong> e minúsculas a qualquer momento na barra superior para acompanhar a fase de alfabetização do estudante.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenReport}
          className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          Consultar Matriz D09
        </button>
      </div>
    </div>
  );
};
