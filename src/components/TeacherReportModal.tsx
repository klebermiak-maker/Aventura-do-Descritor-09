import React from 'react';
import { BookOpen, CheckCircle, BarChart3, GraduationCap, X, Award, PieChart as PieChartIcon } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PlayerStats } from '../types';

interface TeacherReportProps {
  stats: PlayerStats;
  onClose: () => void;
  onOpenCertificate: () => void;
}

export const TeacherReportModal: React.FC<TeacherReportProps> = ({
  stats,
  onClose,
  onOpenCertificate,
}) => {
  const syllableAccuracy =
    stats.syllableAnswers > 0
      ? Math.round((stats.syllableCorrect / stats.syllableAnswers) * 100)
      : 0;

  const textAccuracy =
    stats.textAnswers > 0
      ? Math.round((stats.textCorrect / stats.textAnswers) * 100)
      : 0;

  const totalExercises = stats.syllableAnswers + stats.textAnswers;

  // Chart data based on accuracy percentage
  const chartData = [
    {
      name: 'Identificação de Sílabas',
      value: syllableAccuracy,
      correct: stats.syllableCorrect,
      total: stats.syllableAnswers,
      descriptor: 'D09 SPAECE-Alfa / CAEd',
      fill: '#F59E0B',
    },
    {
      name: 'Finalidade dos Textos',
      value: textAccuracy,
      correct: stats.textCorrect,
      total: stats.textAnswers,
      descriptor: 'D09 SAEB / Prova Brasil',
      fill: '#0284C7',
    },
  ];

  // Pedagogical diagnosis based on comparison
  const getPedagogicalFeedback = () => {
    if (totalExercises === 0) {
      return 'O estudante ainda não iniciou os exercícios. Inicie pelos desafios da Fábrica de Sílabas ou pelo Detetive de Textos para gerar o diagnóstico!';
    }
    if (syllableAccuracy >= 75 && textAccuracy >= 75) {
      return 'Excelente domínio! O estudante demonstra sólida consciência fonológica nas sílabas complexas (CCV, CVC, CVV) e plena compreensão da função social dos diferentes gêneros textuais.';
    }
    if (syllableAccuracy > textAccuracy + 15) {
      return 'Forte consciência fonológica e silábica! Recomendação pedagógica: intensificar a leitura compartilhada de textos da vida cotidiana (bilhetes, convites, receitas) para fortalecer o reconhecimento da finalidade comunicativa.';
    }
    if (textAccuracy > syllableAccuracy + 15) {
      return 'Ótima interpretação e competência leitora! Recomendação pedagógica: reforçar a segmentação e montagem de palavras com encontros consonantais (como PR, TR, FL) e sílabas com consoante travada (CVC).';
    }
    return 'Desempenho equilibrado entre a consciência silábica e a identificação de gêneros textuais. Continue incentivando a prática diária de leitura!';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                Área Pedagógica · Ensino Fundamental 1 (2º Ano)
              </span>
              <h2 className="text-xl md:text-2xl font-black font-['Fredoka',sans-serif] text-slate-900">
                Painel do Professor & Guia do Descritor 09
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Student Stats Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <span className="text-[11px] font-bold text-amber-800 uppercase block">
              Sílabas Treinadas
            </span>
            <span className="text-xl md:text-2xl font-black text-amber-950 tabular-nums">
              {stats.syllableCorrect} / {stats.syllableAnswers}
            </span>
            <span className="text-[10px] font-semibold text-amber-700 block mt-0.5">
              {syllableAccuracy}% de Acerto
            </span>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-center">
            <span className="text-[11px] font-bold text-sky-800 uppercase block">
              Gêneros Textuais
            </span>
            <span className="text-xl md:text-2xl font-black text-sky-950 tabular-nums">
              {stats.textCorrect} / {stats.textAnswers}
            </span>
            <span className="text-[10px] font-semibold text-sky-700 block mt-0.5">
              {textAccuracy}% de Acerto
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase block">
              Estrelas & Conquistas
            </span>
            <span className="text-xl md:text-2xl font-black text-emerald-950 tabular-nums">
              {stats.starsTotal} ★
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
              Recorde: {stats.bestStreak} seguidos
            </span>
          </div>

          <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
            <span className="text-[11px] font-bold text-indigo-800 uppercase block">
              Trilha de Fases
            </span>
            <span className="text-xl md:text-2xl font-black text-indigo-950 tabular-nums">
              {stats.levelsCompleted.length} / 10
            </span>
            <span className="text-[10px] font-semibold text-indigo-700 block mt-0.5">
              Fases Concluídas
            </span>
          </div>
        </div>

        {/* Recharts Pie Chart Section */}
        <div className="p-5 bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Desempenho Comparativo · Descritor 09 (Porcentagem de Acertos)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Sílabas vs. Textos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Pie Chart Canvas (7 cols) */}
            <div className="md:col-span-7 h-64 w-full flex items-center justify-center">
              {totalExercises === 0 ? (
                <div className="text-center p-6 bg-white/80 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-xs font-bold text-slate-600">
                    Ainda não há dados suficientes para exibir o gráfico.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Complete exercícios na Fábrica de Sílabas e no Detetive de Textos!
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      label={({ name, value }) => `${value}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: unknown, name: unknown) => {
                        const item = chartData.find((d) => d.name === name);
                        const numVal = typeof val === 'number' ? val : 0;
                        return [
                          `${numVal}% de acerto (${item ? `${item.correct}/${item.total} questões` : ''})`,
                          String(name),
                        ];
                      }}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        borderRadius: '1rem',
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs font-bold text-slate-700">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Diagnostic Box Beside Chart (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-800">Identificação de Sílabas</span>
                  <span className="font-black text-amber-900 tabular-nums">
                    {syllableAccuracy}%
                  </span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${syllableAccuracy}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Matriz SPAECE/CAEd · {stats.syllableCorrect} de {stats.syllableAnswers} respondidas
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-800">Finalidade dos Textos</span>
                  <span className="font-black text-sky-900 tabular-nums">
                    {textAccuracy}%
                  </span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${textAccuracy}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Matriz SAEB · {stats.textCorrect} de {stats.textAnswers} respondidas
                </span>
              </div>

              {/* Automatic Diagnostic Statement */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-[11px] text-indigo-950 leading-relaxed font-medium">
                <strong>Diagnóstico Pedagógico:</strong> {getPedagogicalFeedback()}
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Descriptors In-depth Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Fundamentação do Descritor 09 (D09) no 2º Ano</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SPAECE-Alfa / CAEd Box */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[10px] font-black uppercase">
                  Matriz SPAECE-Alfa / CAEd
                </span>
                <span className="text-xs font-bold text-amber-900">D09</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Identificar sílabas não canônicas em uma palavra
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avalia a consciência fonológica e ortográfica da criança ao identificar e manipular sílabas que fogem do padrão simples consoante-vogal (CV), tais como:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>• <strong>CCV</strong>: Encontros consonantais (ex: <em>PRA-to, FLO-res, LI-vro</em>).</li>
                <li>• <strong>CVC</strong>: Consoante final travada (ex: <em>POR-ta, CAS-te-lo, SOR-ve-te</em>).</li>
                <li>• <strong>CVV</strong>: Ditongos orais (ex: <em>PEI-xe, LEI-te, CAI-xa</em>).</li>
                <li>• <strong>V</strong>: Vogal isolada inicial (ex: <em>E-sco-la, A-be-lha, I-gre-ja</em>).</li>
              </ul>
            </div>

            {/* SAEB / Prova Brasil Box */}
            <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-sky-200 text-sky-900 rounded-md text-[10px] font-black uppercase">
                  Matriz SAEB / Prova Brasil
                </span>
                <span className="text-xs font-bold text-sky-900">D09 / D9</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Identificar a finalidade de textos de diferentes gêneros
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desenvolve a competência leitora e a compreensão do uso social da língua escrita através do reconhecimento da função comunicativa:
              </p>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>• <strong>Convite:</strong> Convidar para comemorações.</li>
                <li>• <strong>Receita:</strong> Instruir no preparo de alimentos.</li>
                <li>• <strong>Bilhete:</strong> Transmitir um recado breve e afetuoso.</li>
                <li>• <strong>Cartaz / Anúncio:</strong> Conscientizar e divulgar.</li>
                <li>• <strong>Piada:</strong> Entreter e provocar risos.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BNCC Code Mapping */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Habilidades da Base Nacional Comum Curricular (BNCC 2º Ano)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>EF02LP01:</strong> Utilizar grafema-fonema na escrita e leitura de palavras.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>EF02LP02:</strong> Segmentar palavras em sílabas e identificar sílabas complexas.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>EF02LP04:</strong> Ler e escrever palavras com sílabas CV, V, CVC, CCV.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>EF02LP16:</strong> Identificar e produzir bilhetes, convites, receitas e avisos.</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Tips for the Teacher */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1.5">
          <h4 className="font-bold flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-amber-700" />
            <span>Dica Prática para a Sala de Aula</span>
          </h4>
          <p className="leading-relaxed">
            Se o estudante apresentar dúvidas nas sílabas com encontros consonantais (como <em>PR, TR, FL</em>), utilize o recurso de áudio para que ele perceba a vibração do som das duas consoantes juntas antes da vogal. Para a identificação da finalidade do texto, pergunte: <em>"Se você recebesse esse papel na sua casa, o que você faria com ele?"</em>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Fechar Painel
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCertificate();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Gerar Certificado para o Aluno</span>
          </button>
        </div>
      </div>
    </div>
  );
};
