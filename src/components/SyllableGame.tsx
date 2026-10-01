import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, RefreshCw, HelpCircle, Layers, Train, Search } from 'lucide-react';
import { SyllableItem, SyllableSubMode, GameSettings, PlayerStats } from '../types';
import { SYLLABLES_DATA } from '../data/syllablesData';
import { sounds, speak } from '../utils/audio';
import { MascotSofia } from './MascotSofia';

interface SyllableGameProps {
  settings: GameSettings;
  stats: PlayerStats;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
  onBackToMenu: () => void;
}

export const SyllableGame: React.FC<SyllableGameProps> = ({
  settings,
  stats,
  onUpdateStats,
  onBackToMenu,
}) => {
  const [subMode, setSubMode] = useState<SyllableSubMode>('FILL_BLANK');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [trainSyllables, setTrainSyllables] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [mascotMessage, setMascotMessage] = useState<string>(
    'Olá, amiguinho! Vamos descobrir quais sílabas formam esta palavra especial?'
  );

  const currentItem: SyllableItem = SYLLABLES_DATA[currentIndex % SYLLABLES_DATA.length];

  // Helper for case conversion
  const formatText = (text: string) => {
    return settings.uppercaseOnly ? text.toUpperCase() : text;
  };

  // Initialize or reset question
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);

    if (subMode === 'TRAIN_ORDER') {
      // Shuffle syllables for train ordering
      const shuffled = [...currentItem.syllables].sort(() => Math.random() - 0.5);
      setTrainSyllables(shuffled);
    }

    const messages = [
      `Veja a figura: ${currentItem.category}! Qual sílaba completa o nome?`,
      `Ouça com atenção o som da palavra: ${currentItem.word}!`,
      `Esta palavra tem uma sílaba especial: ${currentItem.patternDescription}.`,
    ];
    setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);

    // Pronounce the word initially if sound enabled
    if (settings.speechEnabled) {
      speak(`Palavra: ${currentItem.word}`, true);
    }
  }, [currentIndex, subMode, settings.speechEnabled]);

  // Handle Fill-the-blank choice
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    if (settings.soundEnabled) {
      sounds.playPop();
    }

    setSelectedOption(option);
    setIsAnswered(true);

    const correctSyllable = currentItem.syllables[currentItem.missingIndex];
    const correct = option.toUpperCase() === correctSyllable.toUpperCase();
    setIsCorrect(correct);

    if (correct) {
      if (settings.soundEnabled) sounds.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });

      const newStreak = stats.streak + 1;
      const earnedStars = newStreak % 3 === 0 ? 3 : 2;

      onUpdateStats({
        syllableAnswers: stats.syllableAnswers + 1,
        syllableCorrect: stats.syllableCorrect + 1,
        starsTotal: stats.starsTotal + earnedStars,
        streak: newStreak,
        bestStreak: Math.max(stats.bestStreak, newStreak),
      });

      setMascotMessage(`Sensacional! Você acertou! A sílaba é ${option}. A palavra completa é ${currentItem.word}!`);
      if (settings.speechEnabled) {
        speak(`Muito bem! A sílaba correta é ${option}. ${currentItem.word}!`, true);
      }
    } else {
      if (settings.soundEnabled) sounds.playError();
      onUpdateStats({
        syllableAnswers: stats.syllableAnswers + 1,
        streak: 0,
      });

      setMascotMessage(`Quase lá! Ouça o som: precisamos de ${correctSyllable} para formar ${currentItem.word}. Tente de novo!`);
      if (settings.speechEnabled) {
        speak(`Vamos tentar de novo! A sílaba certa é ${correctSyllable}.`, true);
      }
    }
  };

  // Train ordering mechanics
  const [assembledTrain, setAssembledTrain] = useState<string[]>([]);
  useEffect(() => {
    setAssembledTrain([]);
  }, [currentIndex, subMode]);

  const handleTrainClick = (syl: string, idx: number) => {
    if (isAnswered) return;
    if (settings.soundEnabled) sounds.playPop();
    speak(syl, settings.speechEnabled);

    const nextTrain = [...assembledTrain, syl];
    setAssembledTrain(nextTrain);

    // Remove from choices
    const remaining = [...trainSyllables];
    remaining.splice(idx, 1);
    setTrainSyllables(remaining);

    // Check if finished
    if (nextTrain.length === currentItem.syllables.length) {
      const assembledWord = nextTrain.join('');
      const isWordCorrect = assembledWord === currentItem.syllables.join('');
      setIsAnswered(true);
      setIsCorrect(isWordCorrect);

      if (isWordCorrect) {
        if (settings.soundEnabled) sounds.playCorrect();
        confetti({ particleCount: 50, spread: 70 });
        onUpdateStats({
          syllableAnswers: stats.syllableAnswers + 1,
          syllableCorrect: stats.syllableCorrect + 1,
          starsTotal: stats.starsTotal + 3,
          streak: stats.streak + 1,
        });
        setMascotMessage(`Incrível! O trem formou a palavra correta: ${currentItem.word}!`);
        speak(`Parabéns! Você montou a palavra ${currentItem.word}!`, settings.speechEnabled);
      } else {
        if (settings.soundEnabled) sounds.playError();
        setMascotMessage(`Ops! O trenzinho ficou com as sílabas trocadas. Clique em recomeçar para tentar de novo!`);
      }
    }
  };

  const handleResetTrain = () => {
    setAssembledTrain([]);
    const shuffled = [...currentItem.syllables].sort(() => Math.random() - 0.5);
    setTrainSyllables(shuffled);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    if (settings.soundEnabled) sounds.playPop();
    setCurrentIndex((prev) => (prev + 1) % SYLLABLES_DATA.length);
  };

  const speakCurrentWord = () => {
    speak(`${currentItem.word}. Sílabas: ${currentItem.syllables.join(', ')}`, settings.speechEnabled);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* Sub-mode Segmented Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-lg">
          <button
            onClick={() => setSubMode('FILL_BLANK')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subMode === 'FILL_BLANK'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Encaixe a Sílaba
          </button>
          <button
            onClick={() => setSubMode('TRAIN_ORDER')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subMode === 'TRAIN_ORDER'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            Trem das Sílabas
          </button>
          <button
            onClick={() => setSubMode('XRAY_TYPE')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subMode === 'XRAY_TYPE'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Raio-X da Sílaba
          </button>
        </div>

        {/* Descriptor Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
          <span className="hidden sm:inline text-amber-800">Descritor D09 (SPAECE/CAEd):</span>
          <span className="px-2 py-0.5 bg-amber-200/80 rounded-md font-bold text-amber-900">
            Sílabas Não Canônicas ({currentItem.pattern})
          </span>
        </div>
      </div>

      {/* Sofia Mascot Feedback */}
      <MascotSofia
        mood={isCorrect ? 'celebrating' : isAnswered ? 'thinking' : showHint ? 'hint' : 'happy'}
        message={mascotMessage}
        speechEnabled={settings.speechEnabled}
      />

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-amber-200/90 relative overflow-hidden">
        {/* Stage Header Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              Desafio {currentIndex + 1} de {SYLLABLES_DATA.length}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Categoria: {currentItem.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              {showHint ? 'Ocultar Dica' : 'Pedir Dica'}
            </button>
            <button
              onClick={speakCurrentWord}
              className="p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
              title="Ouvir a palavra falada"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs md:text-sm font-semibold text-amber-900 flex items-center gap-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Dica da Sofia: {currentItem.hint}</span>
          </div>
        )}

        {/* Word Display Area */}
        <div className="flex flex-col items-center justify-center py-4 space-y-6">
          {/* Big Illustration / Emoji Frame */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-100/60 rounded-3xl flex items-center justify-center text-5xl md:text-6xl shadow-inner border border-amber-200/80 transition-transform hover:scale-105">
            {currentItem.emoji}
          </div>

          {/* Submode 1: Fill the Blank */}
          {subMode === 'FILL_BLANK' && (
            <div className="w-full space-y-6">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Qual é a sílaba que completa a palavra?
                </p>
                {/* Syllable Blocks Display */}
                <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                  {currentItem.syllables.map((syl, i) => {
                    const isMissing = i === currentItem.missingIndex;
                    return (
                      <div
                        key={i}
                        className={`min-w-20 md:min-w-24 h-20 md:h-24 rounded-2xl flex flex-col items-center justify-center text-2xl md:text-3xl font-extrabold font-['Fredoka',sans-serif] tracking-wider transition-all ${
                          isMissing
                            ? isAnswered
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md scale-105'
                                : 'bg-rose-500 text-white border-2 border-rose-600 shadow-md animate-shake'
                              : 'bg-amber-100/80 border-2 border-dashed border-amber-400 text-amber-800'
                            : 'bg-slate-100 border border-slate-300 text-slate-800 shadow-xs'
                        }`}
                      >
                        {isMissing ? (
                          isAnswered ? (
                            formatText(selectedOption || '?')
                          ) : (
                            <span className="text-amber-500 text-xl font-bold">?</span>
                          )
                        ) : (
                          formatText(syl)
                        )}
                        <span className="text-[10px] font-semibold text-slate-400 mt-1">
                          Sílaba {i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Options to click */}
              <div className="pt-4">
                <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto">
                  {currentItem.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isThisCorrect = opt.toUpperCase() === currentItem.syllables[currentItem.missingIndex].toUpperCase();

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswered}
                        className={`h-16 md:h-20 rounded-2xl text-xl md:text-2xl font-black font-['Fredoka',sans-serif] tracking-wider transition-all transform active:scale-95 cursor-pointer flex flex-col items-center justify-center border-2 ${
                          isAnswered
                            ? isThisCorrect
                              ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg'
                              : isSelected
                              ? 'bg-rose-500 border-rose-600 text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                            : 'bg-amber-50 hover:bg-amber-400 hover:text-amber-950 border-amber-300 text-amber-900 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        <span>{formatText(opt)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Submode 2: Train Order */}
          {subMode === 'TRAIN_ORDER' && (
            <div className="w-full space-y-6">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Clique nos vagões na ordem certa para formar o nome:
                </p>

                {/* Train Track Assembled Zone */}
                <div className="min-h-24 p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 flex-wrap">
                  {assembledTrain.length === 0 ? (
                    <span className="text-sm text-slate-400 font-medium">
                      O trem está esperando os vagões...
                    </span>
                  ) : (
                    assembledTrain.map((syl, i) => (
                      <div
                        key={i}
                        className="px-5 py-3 bg-amber-500 text-white rounded-xl font-black font-['Fredoka',sans-serif] text-xl shadow-sm border border-amber-600 animate-scale-in"
                      >
                        {formatText(syl)}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Syllable choices available */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {trainSyllables.map((syl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTrainClick(syl, idx)}
                    disabled={isAnswered}
                    className="h-16 px-6 rounded-2xl bg-amber-100 hover:bg-amber-300 text-amber-950 border-2 border-amber-400 text-xl font-black font-['Fredoka',sans-serif] transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    {formatText(syl)}
                  </button>
                ))}
              </div>

              {assembledTrain.length > 0 && !isAnswered && (
                <div className="text-center">
                  <button
                    onClick={handleResetTrain}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 mx-auto px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Recomeçar Trem
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Submode 3: Syllable X-Ray / Classification */}
          {subMode === 'XRAY_TYPE' && (
            <div className="w-full space-y-4 max-w-xl mx-auto">
              <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Estudo de Sílaba (Descritor D09)
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Palavra: {currentItem.word}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  {currentItem.syllables.map((s, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-lg font-black text-lg ${
                        s === currentItem.nonCanonicalSyllable
                          ? 'bg-amber-500 text-white ring-2 ring-amber-600'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {formatText(s)}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sílaba Não Canônica:</strong>{' '}
                      <span className="font-bold text-amber-700">
                        {currentItem.nonCanonicalSyllable}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Estrutura:</strong> {currentItem.patternDescription}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tipo Silábico:</strong> Padrão{' '}
                      <span className="font-mono font-bold bg-amber-200 px-1 rounded">
                        {currentItem.pattern}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => speak(`A sílaba não canônica em ${currentItem.word} é ${currentItem.nonCanonicalSyllable}. Ela tem o padrão ${currentItem.pattern}`, settings.speechEnabled)}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  Ouvir Explicação da Professora Corujinha
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onBackToMenu}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            ← Voltar ao Menu
          </button>

          {(isAnswered || subMode === 'XRAY_TYPE') && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 text-sm"
            >
              <span>Próxima Palavra</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
