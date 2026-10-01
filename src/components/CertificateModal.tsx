import React, { useState } from 'react';
import { Award, Printer, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { PlayerStats } from '../types';

interface CertificateProps {
  stats: PlayerStats;
  onClose: () => void;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
}

export const CertificateModal: React.FC<CertificateProps> = ({
  stats,
  onClose,
  onUpdateStats,
}) => {
  const [studentName, setStudentName] = useState(stats.playerName || 'Super Campeão(ã)');
  const [teacherName, setTeacherName] = useState('Professora Sofia');

  const handlePrint = () => {
    window.print();
  };

  const handleSaveName = (name: string) => {
    setStudentName(name);
    onUpdateStats({ playerName: name });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Control Top Bar (Hidden in print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-amber-200 shadow-xs">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Jogo</span>
        </button>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={studentName}
            onChange={(e) => handleSaveName(e.target.value)}
            placeholder="Nome do Aluno(a)"
            className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-xs"
          />

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Diploma</span>
          </button>
        </div>
      </div>

      {/* Diploma Certificate Paper */}
      <div
        id="certificate-print-area"
        className="bg-amber-50/20 border-8 border-double border-amber-600/60 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden text-center text-slate-800 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-3 left-3 text-amber-500 text-2xl font-serif">✦</div>
        <div className="absolute top-3 right-3 text-amber-500 text-2xl font-serif">✦</div>
        <div className="absolute bottom-3 left-3 text-amber-500 text-2xl font-serif">✦</div>
        <div className="absolute bottom-3 right-3 text-amber-500 text-2xl font-serif">✦</div>

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-600 shadow-sm">
              <Award className="w-9 h-9" />
            </div>
          </div>

          <span className="text-xs font-black tracking-widest text-amber-700 uppercase block">
            ENSINO FUNDAMENTAL 1 · LÍNGUA PORTUGUESA
          </span>

          <h1 className="text-3xl md:text-4xl font-black font-['Fredoka',sans-serif] text-slate-900 tracking-tight">
            CERTIFICADO DE CONQUISTA
          </h1>

          <p className="text-xs md:text-sm font-semibold text-slate-600 max-w-md mx-auto">
            Habilidade e Consciência Fonológica · Descritor 09 (D09)
          </p>
        </div>

        {/* Recipient Area */}
        <div className="my-8 py-4 border-y border-amber-200/80 max-w-2xl mx-auto space-y-2">
          <p className="text-sm font-semibold text-slate-600">
            Certificamos com muito orgulho que o(a) aluno(a):
          </p>
          <div className="text-2xl md:text-3xl font-black font-['Fredoka',sans-serif] text-amber-900 tracking-wide">
            {studentName}
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Completou os desafios da <strong>Aventura do Descritor 09</strong> do 2º ano, demonstrando excelência na <strong>identificação de sílabas canônicas e não canônicas (V, CVC, CCV, CVV)</strong> e no reconhecimento da <strong>finalidade social de diferentes gêneros textuais</strong>.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex justify-center items-center gap-6 my-6 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{stats.starsTotal} Estrelas Conquistadas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{stats.levelsCompleted.length} Fases Vencidas</span>
          </div>
        </div>

        {/* Signatures Area */}
        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mt-10 pt-4 text-xs font-bold text-slate-600">
          <div className="border-t border-slate-400 pt-2">
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="text-center w-full bg-transparent focus:outline-none text-slate-800 font-bold"
            />
            <span className="text-[10px] text-slate-400 uppercase block">Professor(a) / Orientador(a)</span>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <span className="block text-slate-800">Corujinha Sofia</span>
            <span className="text-[10px] text-slate-400 uppercase block">Mascote da Turma</span>
          </div>
        </div>
      </div>
    </div>
  );
};
