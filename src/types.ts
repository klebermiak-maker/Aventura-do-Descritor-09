export type GameMode = 'MENU' | 'SYLLABLES' | 'TEXTS' | 'CHAMPIONSHIP' | 'CERTIFICATE';

export type SyllableSubMode = 'FILL_BLANK' | 'TRAIN_ORDER' | 'XRAY_TYPE';

export type SyllablePattern = 'V' | 'CV' | 'CVC' | 'CCV' | 'CVV';

export interface SyllableItem {
  id: string;
  word: string;
  syllables: string[];
  missingIndex: number;
  options: string[]; // Options for missing syllable
  nonCanonicalSyllable: string;
  pattern: SyllablePattern;
  patternDescription: string;
  category: string;
  emoji: string;
  hint: string;
}

export type TextGenre = 
  | 'CONVITE'
  | 'RECEITA'
  | 'BILHETE'
  | 'CARTAZ'
  | 'PIADA'
  | 'LISTA'
  | 'ANUNCIO'
  | 'TRAVA_LINGUAS'
  | 'NOTICIA';

export interface TextQuestion {
  id: string;
  genre: TextGenre;
  genreName: string;
  title: string;
  content: string[];
  senderOrAuthor?: string;
  dateOrPlace?: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  visualTheme: 'recipe' | 'invite' | 'note' | 'poster' | 'joke' | 'list' | 'ad' | 'news';
  icon: string;
}

export interface PlayerStats {
  playerName: string;
  syllableAnswers: number;
  syllableCorrect: number;
  textAnswers: number;
  textCorrect: number;
  starsTotal: number;
  streak: number;
  bestStreak: number;
  levelsCompleted: number[];
}

export interface GameSettings {
  soundEnabled: boolean;
  speechEnabled: boolean;
  uppercaseOnly: boolean; // Caixa alta para alunos em processo de alfabetização
}
