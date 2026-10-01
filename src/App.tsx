/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameMode, GameSettings, PlayerStats } from './types';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { SyllableGame } from './components/SyllableGame';
import { TextDetectiveGame } from './components/TextDetectiveGame';
import { ChampionshipMode } from './components/ChampionshipMode';
import { TeacherReportModal } from './components/TeacherReportModal';
import { CertificateModal } from './components/CertificateModal';

const STATS_STORAGE_KEY = 'd09_game_stats_v1';
const SETTINGS_STORAGE_KEY = 'd09_game_settings_v1';

const defaultStats: PlayerStats = {
  playerName: '',
  syllableAnswers: 0,
  syllableCorrect: 0,
  textAnswers: 0,
  textCorrect: 0,
  starsTotal: 0,
  streak: 0,
  bestStreak: 0,
  levelsCompleted: [],
};

const defaultSettings: GameSettings = {
  soundEnabled: true,
  speechEnabled: true,
  uppercaseOnly: false,
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('MENU');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Load stats from localStorage
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultStats;
  });

  // Load settings from localStorage
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultSettings;
  });

  // Save stats changes
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Save settings changes
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const updateStats = (newStats: Partial<PlayerStats>) => {
    setStats((prev) => ({ ...prev, ...newStats }));
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Navigation Bar */}
      <Header
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        settings={settings}
        onUpdateSettings={updateSettings}
        stats={stats}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 md:py-6">
        {currentMode === 'MENU' && (
          <MainMenu
            onSelectMode={(mode) => setCurrentMode(mode)}
            settings={settings}
            stats={stats}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {currentMode === 'SYLLABLES' && (
          <SyllableGame
            settings={settings}
            stats={stats}
            onUpdateStats={updateStats}
            onBackToMenu={() => setCurrentMode('MENU')}
          />
        )}

        {currentMode === 'TEXTS' && (
          <TextDetectiveGame
            settings={settings}
            stats={stats}
            onUpdateStats={updateStats}
            onBackToMenu={() => setCurrentMode('MENU')}
          />
        )}

        {currentMode === 'CHAMPIONSHIP' && (
          <ChampionshipMode
            settings={settings}
            stats={stats}
            onUpdateStats={updateStats}
            onBackToMenu={() => setCurrentMode('MENU')}
            onOpenCertificate={() => setCurrentMode('CERTIFICATE')}
          />
        )}

        {currentMode === 'CERTIFICATE' && (
          <CertificateModal
            stats={stats}
            onClose={() => setCurrentMode('MENU')}
            onUpdateStats={updateStats}
          />
        )}
      </main>

      {/* Pedagogical Report Modal */}
      {isReportOpen && (
        <TeacherReportModal
          stats={stats}
          onClose={() => setIsReportOpen(false)}
          onOpenCertificate={() => {
            setIsReportOpen(false);
            setCurrentMode('CERTIFICATE');
          }}
        />
      )}

      {/* Minimal Anti-slop Footer */}
      <footer className="no-print mt-auto py-6 border-t border-amber-200/60 bg-white/60 text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-slate-700">Aventura do Descritor 09</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>Língua Portuguesa 2º Ano (EF1)</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>Matrizes SPAECE-Alfa, CAEd e SAEB</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <button
              onClick={() => setIsReportOpen(true)}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Matriz & BNCC
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setCurrentMode('CERTIFICATE')}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Imprimir Certificado
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
