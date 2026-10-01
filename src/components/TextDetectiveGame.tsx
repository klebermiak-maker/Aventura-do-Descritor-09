import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, XCircle, HelpCircle, ArrowRight, Flame } from 'lucide-react';
import { TextQuestion, GameSettings, PlayerStats } from '../types';
import { TEXTS_DATA } from '../data/textsData';
import { sounds, speak, stopSpeech } from '../utils/audio';
import { MascotSofia } from './MascotSofia';
import { PositiveStreakToast, getStreakData } from './PositiveStreakToast';

interface TextDetectiveGameProps {
  settings: GameSettings;
  stats: PlayerStats;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
  onBackToMenu: () => void;
}

export const TextDetectiveGame: React.FC<TextDetectiveGameProps> = ({
  settings,
  stats,
  onUpdateStats,
  onBackToMenu,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streakReward, setStreakReward] = useState<number | null>(null);
  const [mascotMessage, setMascotMessage] = useState<string>(
    'Olá, Detetive das Palavras! Leia o texto com calma e descubra para que ele serve!'
  );

  const currentText: TextQuestion = TEXTS_DATA[currentIndex % TEXTS_DATA.length];

  const formatCase = (txt: string) => {
    return settings.uppercaseOnly ? txt.toUpperCase() : txt;
  };

  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
    stopSpeech();

    setMascotMessage(`Texto ${currentIndex + 1}: ${currentText.genreName}. Observe as pistas no texto!`);

    if (settings.speechEnabled) {
      speak(`Atenção, detetive! Vamos ler o texto: ${currentText.title}. ${currentText.question}`, true);
    }
  }, [currentIndex, settings.speechEnabled]);

  const handleReadFullText = () => {
    const fullTextToRead = [
      currentText.title,
      ...currentText.content,
      currentText.senderOrAuthor ? `Assinado por: ${currentText.senderOrAuthor}` : '',
      currentText.dateOrPlace || '',
    ].join('. ');

    speak(fullTextToRead, settings.speechEnabled);
  };

  const handleSelectOption = (optionId: string, correct: boolean) => {
    if (isAnswered) return;

    if (settings.soundEnabled) sounds.playPop();
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const newStreak = stats.streak + 1;
      const isStreakBonus = newStreak >= 3;
      const earnedStars = isStreakBonus ? 5 : 3;

      if (isStreakBonus) {
        if (settings.soundEnabled) sounds.playStreakReward(newStreak);
        setStreakReward(newStreak);
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#0284c7', '#38bdf8', '#f59e0b', '#10b981'],
        });
        const streakData = getStreakData(newStreak);
        setMascotMessage(`🔥 ${newStreak} ACERTOS SEGUIDOS! ${streakData.tip}`);
      } else {
        if (settings.soundEnabled) sounds.playCorrect();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
        setMascotMessage(`Brilhante dedução, Detetive! Você acertou a finalidade do ${currentText.genreName}!`);
        if (settings.speechEnabled) {
          speak(`Excelente! Você descobriu a finalidade deste texto! Parabéns!`, true);
        }
      }

      onUpdateStats({
        textAnswers: stats.textAnswers + 1,
        textCorrect: stats.textCorrect + 1,
        starsTotal: stats.starsTotal + earnedStars,
        streak: newStreak,
        bestStreak: Math.max(stats.bestStreak, newStreak),
      });
    } else {
      if (settings.soundEnabled) sounds.playError();
      setStreakReward(null);
      onUpdateStats({
        textAnswers: stats.textAnswers + 1,
        streak: 0,
      });

      setMascotMessage(`Não foi dessa vez, mas todo detetive aprende com pistas! Veja a explicação abaixo.`);
      if (settings.speechEnabled) {
        speak(`Não foi dessa vez. Mas veja: a finalidade correta era outra. Vamos ler a explicação!`, true);
      }
    }
  };

  const handleNext = () => {
    stopSpeech();
    if (settings.soundEnabled) sounds.playPop();
    setCurrentIndex((prev) => (prev + 1) % TEXTS_DATA.length);
  };

  // Background style helper based on genre theme
  const getThemeStyle = () => {
    switch (currentText.visualTheme) {
      case 'invite':
        return 'bg-gradient-to-br from-pink-50 to-amber-50 border-pink-200';
      case 'recipe':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200';
      case 'note':
        return 'bg-amber-50/90 border-amber-300 shadow-sm rotate-0.5';
      case 'poster':
        return 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-300';
      case 'joke':
        return 'bg-gradient-to-br from-yellow-50 to-emerald-50 border-yellow-300';
      case 'list':
        return 'bg-slate-50 border-slate-300';
      case 'ad':
        return 'bg-amber-100/50 border-amber-400';
      case 'news':
        return 'bg-stone-50 border-stone-300';
      default:
        return 'bg-white border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Positive Reinforcement Toast Popup */}
      {streakReward !== null && (
        <PositiveStreakToast
          streak={streakReward}
          speechEnabled={settings.speechEnabled}
          onClose={() => setStreakReward(null)}
        />
      )}

      {/* Top Header Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 rounded-2xl border border-sky-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentText.icon}</span>
          <div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
              Descritor D09 (SAEB / Prova Brasil)
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Gênero: {currentText.genreName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          {stats.streak >= 3 && (
            <span className="inline-flex items-center gap-1 text-xs font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 rounded-md shadow-xs animate-bounce-gentle">
              <Flame className="w-3.5 h-3.5 fill-amber-200" />
              <span>{stats.streak} Seguidos!</span>
            </span>
          )}
          <span>Caso #{currentIndex + 1} de {TEXTS_DATA.length}</span>
        </div>
      </div>

      {/* Sofia Mascot Feedback */}
      <MascotSofia
        mood={isCorrect ? 'celebrating' : isAnswered ? 'thinking' : 'happy'}
        message={mascotMessage}
        speechEnabled={settings.speechEnabled}
      />

      {/* Main Investigation Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: The Authentic Text Document (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className={`p-6 rounded-3xl border-2 flex-1 flex flex-col justify-between transition-all ${getThemeStyle()}`}>
            <div>
              {/* Document Header */}
              <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
                <span className="text-xs font-black tracking-widest text-slate-500 uppercase">
                  DOCUMENTO DO CASO
                </span>
                <button
                  onClick={handleReadFullText}
                  className="px-3 py-1 rounded-xl bg-white hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  title="Ouvir a leitura deste texto em voz alta"
                >
                  <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Ler Texto em Voz Alta</span>
                </button>
              </div>

              {/* Title of Text */}
              <h2 className="text-xl md:text-2xl font-black font-['Fredoka',sans-serif] text-slate-900 mb-4 tracking-tight">
                {formatCase(currentText.title)}
              </h2>

              {/* Body Content */}
              <div className="space-y-2 text-slate-800 text-sm md:text-base leading-relaxed font-medium">
                {currentText.content.map((paragraph, idx) => (
                  <p key={idx} className={paragraph === '' ? 'h-2' : ''}>
                    {formatCase(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            {/* Document Footer (Author / Date) */}
            <div className="mt-6 pt-3 border-t border-black/10 text-xs font-semibold text-slate-600 flex flex-wrap justify-between gap-2">
              {currentText.senderOrAuthor && (
                <span>✍️ {formatCase(currentText.senderOrAuthor)}</span>
              )}
              {currentText.dateOrPlace && (
                <span>📍 {formatCase(currentText.dateOrPlace)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detective Question & Multiple Choice (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-sky-200 shadow-sm space-y-4">
            {/* Question Title */}
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-800">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Pergunta do Detetive
                </span>
                <h4 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                  {formatCase(currentText.question)}
                </h4>
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentText.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-slate-50 hover:bg-sky-50 hover:border-sky-300 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-500 border-rose-600 text-white';
                  } else {
                    btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 font-semibold text-xs md:text-sm leading-snug transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 uppercase ${
                        isAnswered && opt.isCorrect
                          ? 'bg-white text-emerald-700'
                          : isAnswered && isSelected && !opt.isCorrect
                          ? 'bg-white text-rose-700'
                          : 'bg-white/80 text-slate-600 border border-slate-300'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="flex-1 mt-0.5">{formatCase(opt.text)}</span>

                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pedagogical Explanation Box */}
            {showExplanation && (
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs md:text-sm text-slate-700 space-y-1.5 animate-fade-in">
                <div className="font-bold text-sky-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Por que esta é a resposta correta?</span>
                </div>
                <p className="leading-relaxed">
                  {currentText.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBackToMenu}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              ← Voltar ao Menu
            </button>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                <span>Próximo Texto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
