import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Lock, CheckCircle2, Play, Award, RotateCcw, Flame } from 'lucide-react';
import { GameSettings, PlayerStats } from '../types';
import { SYLLABLES_DATA } from '../data/syllablesData';
import { TEXTS_DATA } from '../data/textsData';
import { sounds, speak } from '../utils/audio';
import { PositiveStreakToast } from './PositiveStreakToast';

interface ChampionshipProps {
  settings: GameSettings;
  stats: PlayerStats;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
  onBackToMenu: () => void;
  onOpenCertificate: () => void;
}

interface LevelDef {
  level: number;
  title: string;
  type: 'syllable' | 'text';
  descriptor: string;
  targetId: string;
  starsRequired: number;
}

const LEVELS: LevelDef[] = [
  { level: 1, title: 'O Prato Mágico', type: 'syllable', descriptor: 'D09 SPAECE (CCV)', targetId: 'syl-1', starsRequired: 0 },
  { level: 2, title: 'Festa de Aniversário', type: 'text', descriptor: 'D09 SAEB (Convite)', targetId: 'txt-1', starsRequired: 2 },
  { level: 3, title: 'O Castelo Encantado', type: 'syllable', descriptor: 'D09 SPAECE (CVC)', targetId: 'syl-5', starsRequired: 4 },
  { level: 4, title: 'Receita da Vovó', type: 'text', descriptor: 'D09 SAEB (Receita)', targetId: 'txt-2', starsRequired: 7 },
  { level: 5, title: 'A Escola dos Sonhos', type: 'syllable', descriptor: 'D09 SPAECE (V)', targetId: 'syl-4', starsRequired: 10 },
  { level: 6, title: 'O Recado na Geladeira', type: 'text', descriptor: 'D09 SAEB (Bilhete)', targetId: 'txt-3', starsRequired: 13 },
  { level: 7, title: 'O Peixe Dourado', type: 'syllable', descriptor: 'D09 SPAECE (CVV)', targetId: 'syl-6', starsRequired: 16 },
  { level: 8, title: 'Vacina da Saúde', type: 'text', descriptor: 'D09 SAEB (Cartaz)', targetId: 'txt-4', starsRequired: 19 },
  { level: 9, title: 'A Risada dos Peixinhos', type: 'text', descriptor: 'D09 SAEB (Piada)', targetId: 'txt-5', starsRequired: 22 },
  { level: 10, title: 'O Grande Trator', type: 'syllable', descriptor: 'D09 SPAECE (CCV)', targetId: 'syl-14', starsRequired: 25 },
];

export const ChampionshipMode: React.FC<ChampionshipProps> = ({
  settings,
  stats,
  onUpdateStats,
  onBackToMenu,
  onOpenCertificate,
}) => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [levelAnswered, setLevelAnswered] = useState(false);
  const [isLevelCorrect, setIsLevelCorrect] = useState(false);
  const [streakReward, setStreakReward] = useState<number | null>(null);

  const completedSet = new Set(stats.levelsCompleted);

  const handleStartLevel = (lvl: LevelDef) => {
    if (stats.starsTotal < lvl.starsRequired && !completedSet.has(lvl.level)) {
      if (settings.soundEnabled) sounds.playError();
      speak(`Você precisa de ${lvl.starsRequired} estrelas para desbloquear esta fase!`, settings.speechEnabled);
      return;
    }
    if (settings.soundEnabled) sounds.playPop();
    setActiveLevel(lvl.level);
    setUserAnswer(null);
    setLevelAnswered(false);
    setIsLevelCorrect(false);
  };

  const currentLevelDef = LEVELS.find((l) => l.level === activeLevel);
  const currentSyllableItem = currentLevelDef?.type === 'syllable'
    ? SYLLABLES_DATA.find((s) => s.id === currentLevelDef.targetId) || SYLLABLES_DATA[0]
    : null;
  const currentTextItem = currentLevelDef?.type === 'text'
    ? TEXTS_DATA.find((t) => t.id === currentLevelDef.targetId) || TEXTS_DATA[0]
    : null;

  const handleAnswerLevel = (answer: string, isCorrect: boolean) => {
    if (levelAnswered || !activeLevel) return;
    setUserAnswer(answer);
    setLevelAnswered(true);
    setIsLevelCorrect(isCorrect);

    if (isCorrect) {
      const newStreak = stats.streak + 1;
      const isStreakBonus = newStreak >= 3;

      if (isStreakBonus) {
        if (settings.soundEnabled) sounds.playStreakReward(newStreak);
        setStreakReward(newStreak);
        confetti({ particleCount: 85, spread: 90, origin: { y: 0.55 }, colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8'] });
      } else {
        if (settings.soundEnabled) sounds.playFanfare();
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }

      const newLevels = Array.from(new Set([...stats.levelsCompleted, activeLevel]));
      const earnedStars = completedSet.has(activeLevel) ? 0 : isStreakBonus ? 5 : 3;

      onUpdateStats({
        levelsCompleted: newLevels,
        starsTotal: stats.starsTotal + earnedStars,
        streak: newStreak,
        bestStreak: Math.max(stats.bestStreak, newStreak),
      });

      if (!isStreakBonus) {
        speak(`Parabéns! Fase ${activeLevel} concluída com sucesso!`, settings.speechEnabled);
      }
    } else {
      if (settings.soundEnabled) sounds.playError();
      setStreakReward(null);
      onUpdateStats({ streak: 0 });
      speak('Não foi dessa vez. Tente novamente!', settings.speechEnabled);
    }
  };

  const handleCloseLevelModal = () => {
    setActiveLevel(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      {/* Positive Reinforcement Toast Popup */}
      {streakReward !== null && (
        <PositiveStreakToast
          streak={streakReward}
          speechEnabled={settings.speechEnabled}
          onClose={() => setStreakReward(null)}
        />
      )}

      {/* Championship Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Trilha de Conquistas do 2º Ano</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-['Fredoka',sans-serif] tracking-tight">
              Grande Torneio do Descritor 09
            </h1>
            <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-xl">
              Vença as 10 fases da trilha combinando sílabas não canônicas e finalidades de textos para conquistar o Diploma de Super Campeão!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {stats.streak >= 3 && (
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2 rounded-2xl text-white font-black text-xs flex items-center gap-1.5 shadow-md animate-bounce-gentle">
                <Flame className="w-4 h-4 fill-amber-200" />
                <span>{stats.streak} Acertos Seguidos!</span>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[11px] uppercase tracking-wider text-emerald-200 block font-bold">
                Fases Concluídas
              </span>
              <span className="text-2xl font-black tabular-nums">
                {stats.levelsCompleted.length} / 10
              </span>
            </div>
            {stats.levelsCompleted.length >= 10 && (
              <button
                onClick={onOpenCertificate}
                className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs md:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span>Ver Diploma!</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Level Path Grid */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>Mapa das Fases</span>
          <span>{stats.starsTotal} Estrelas Disponíveis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEVELS.map((lvl) => {
            const isCompleted = completedSet.has(lvl.level);
            const isUnlocked = stats.starsTotal >= lvl.starsRequired || isCompleted;

            return (
              <div
                key={lvl.level}
                onClick={() => isUnlocked && handleStartLevel(lvl)}
                className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between transition-all select-none ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-400 cursor-pointer hover:shadow-md'
                    : isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 cursor-pointer hover:shadow-md hover:-translate-y-1'
                    : 'bg-slate-100/60 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isUnlocked
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {lvl.level}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isUnlocked ? (
                      <Play className="w-4 h-4 text-amber-600 fill-amber-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {lvl.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-500 block mt-1">
                    {lvl.descriptor}
                  </span>
                </div>

                <div className="mt-4 pt-2 border-t border-black/5 flex items-center justify-between text-xs">
                  {isCompleted ? (
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                  ) : isUnlocked ? (
                    <span className="font-bold text-amber-700">Jogar!</span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-300" />
                      {lvl.starsRequired} necessárias
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onBackToMenu}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            ← Voltar ao Menu
          </button>
        </div>
      </div>

      {/* Active Level Popup Challenge Modal */}
      {activeLevel !== null && currentLevelDef && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Fase {activeLevel} de 10 · {currentLevelDef.descriptor}
                </span>
                <h3 className="text-xl font-black font-['Fredoka',sans-serif] text-slate-900">
                  {currentLevelDef.title}
                </h3>
              </div>
              <button
                onClick={handleCloseLevelModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Level Question Body */}
            {currentLevelDef.type === 'syllable' && currentSyllableItem && (
              <div className="space-y-6 py-2">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-amber-100 rounded-2xl mx-auto flex items-center justify-center text-5xl shadow-inner">
                    {currentSyllableItem.emoji}
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Qual sílaba completa corretamente a palavra?
                  </p>
                  <div className="text-2xl font-black font-['Fredoka',sans-serif] text-slate-900 tracking-wider">
                    {currentSyllableItem.syllables.map((s, idx) =>
                      idx === currentSyllableItem.missingIndex ? ' [ ? ] ' : ` ${s} `
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {currentSyllableItem.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        handleAnswerLevel(
                          opt,
                          opt.toUpperCase() ===
                            currentSyllableItem.syllables[currentSyllableItem.missingIndex].toUpperCase()
                        )
                      }
                      disabled={levelAnswered}
                      className={`h-16 rounded-xl text-xl font-black font-['Fredoka',sans-serif] border-2 cursor-pointer transition-all ${
                        levelAnswered
                          ? opt.toUpperCase() ===
                            currentSyllableItem.syllables[currentSyllableItem.missingIndex].toUpperCase()
                            ? 'bg-emerald-500 border-emerald-600 text-white'
                            : userAnswer === opt
                            ? 'bg-rose-500 border-rose-600 text-white'
                            : 'bg-slate-100 text-slate-400'
                          : 'bg-amber-50 hover:bg-amber-400 hover:text-amber-950 border-amber-300 text-amber-900'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentLevelDef.type === 'text' && currentTextItem && (
              <div className="space-y-4 py-2">
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl text-xs md:text-sm text-slate-800 space-y-1">
                  <div className="font-bold text-sky-900 text-sm mb-1">
                    {currentTextItem.title}
                  </div>
                  {currentTextItem.content.slice(0, 4).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <p className="text-xs md:text-sm font-bold text-slate-800">
                  {currentTextItem.question}
                </p>

                <div className="space-y-2">
                  {currentTextItem.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerLevel(opt.id, opt.isCorrect)}
                      disabled={levelAnswered}
                      className={`w-full text-left p-3 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
                        levelAnswered
                          ? opt.isCorrect
                            ? 'bg-emerald-500 border-emerald-600 text-white'
                            : userAnswer === opt.id
                            ? 'bg-rose-500 border-rose-600 text-white'
                            : 'bg-slate-100 text-slate-400'
                          : 'bg-white hover:bg-sky-50 hover:border-sky-300 border-slate-200 text-slate-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            {levelAnswered && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isLevelCorrect ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {isLevelCorrect ? '✨ Fase Conquistada!' : '⚠️ Tente novamente!'}
                </span>

                <div className="flex items-center gap-2">
                  {!isLevelCorrect && (
                    <button
                      onClick={() => {
                        setLevelAnswered(false);
                        setUserAnswer(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Tentar de Novo
                    </button>
                  )}
                  <button
                    onClick={handleCloseLevelModal}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Voltar ao Mapa
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
