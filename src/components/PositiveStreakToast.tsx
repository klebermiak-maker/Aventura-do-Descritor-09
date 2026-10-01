import React, { useEffect } from 'react';
import { Sparkles, Flame, Volume2, X, Award, CheckCircle } from 'lucide-react';
import { speak } from '../utils/audio';

interface PositiveStreakToastProps {
  streak: number;
  speechEnabled: boolean;
  onClose: () => void;
}

export const STREAK_TIPS: Record<number, { title: string; tip: string; speech: string }> = {
  3: {
    title: 'Super Foco e Atenção!',
    tip: 'Dica da Sofia: você está ouvindo com atenção cada sonzinho e sílaba das palavras!',
    speech: 'Uau! Três acertos seguidos! Você tem um super poder de atenção! Continue assim!',
  },
  4: {
    title: 'Leitor(a) Estrela!',
    tip: 'Dica da Sofia: seu cérebro está conectando as letras rapidamente para entender a mensagem do texto!',
    speech: 'Sensacional! Quatro acertos seguidos! Seu cérebro de leitor está afiadíssimo!',
  },
  5: {
    title: 'Mestre do Descritor 09!',
    tip: 'Dica da Sofia: você já domina sílabas complexas e a finalidade de convites, receitas e bilhetes!',
    speech: 'Incrível! Cinco acertos em sequência! Você é um verdadeiro mestre do Descritor 09!',
  },
};

export const getStreakData = (streak: number) => {
  if (streak in STREAK_TIPS) {
    return STREAK_TIPS[streak];
  }
  return {
    title: `Insuperável! ${streak} Acertos!`,
    tip: `Dica de Ouro: Você mantém um ritmo espetacular! Sua dedicação é inspiradora para toda a turma!`,
    speech: `Fantástico! ${streak} acertos consecutivos! Nada pode parar o seu aprendizado!`,
  };
};

export const PositiveStreakToast: React.FC<PositiveStreakToastProps> = ({
  streak,
  speechEnabled,
  onClose,
}) => {
  const data = getStreakData(streak);

  // Auto-read positive cheer once on mount
  useEffect(() => {
    if (speechEnabled) {
      speak(data.speech, true);
    }

    // Auto-dismiss after 7 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [streak, speechEnabled, data.speech, onClose]);

  const handleSpeakCheer = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(data.speech, true);
  };

  return (
    <div className="fixed top-16 right-4 md:right-8 z-50 max-w-sm w-full animate-fade-in pointer-events-auto">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4 shadow-xl text-white border-2 border-amber-300 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-700/30 rounded-full blur-md pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 space-y-2">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/25 rounded-full text-xs font-black uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-200 fill-amber-300 animate-bounce" />
              <span>{streak} Acertos Seguidos!</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleSpeakCheer}
                title="Ouvir incentivo da Sofia"
                className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Motivational Title & Tip */}
          <div>
            <h4 className="text-base font-black font-['Fredoka',sans-serif] tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span>{data.title}</span>
            </h4>
            <p className="text-xs text-amber-100 font-medium leading-relaxed mt-0.5">
              {data.tip}
            </p>
          </div>

          {/* Bonus Award Pill */}
          <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-amber-950 bg-amber-100/90 px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Reforço Positivo Ativado!</span>
            </div>
            <span className="text-amber-800 font-black">+2 ★ Bônus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
