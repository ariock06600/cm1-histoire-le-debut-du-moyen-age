import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CHAPTERS, type ChapterId } from './data/courseContent';
import { getNextChapterId, getPrevChapterId } from './utils/courseLogic';
import { TopBar } from './components/TopBar';
import { ChapterSidebar } from './components/ChapterSidebar';
import { Chapter1Empire } from './components/Chapter1Empire';
import { Chapter2Fortifications } from './components/Chapter2Fortifications';
import { Chapter3Charte } from './components/Chapter3Charte';
import { Chapter4Moines } from './components/Chapter4Moines';
import { Chapter5Quiz } from './components/Chapter5Quiz';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('empire');
  const [visitedChapters, setVisitedChapters] = useState<Set<ChapterId>>(
    () => new Set<ChapterId>(['empire'])
  );

  const handleSelectChapter = (id: ChapterId) => {
    setActiveChapter(id);
    setVisitedChapters((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const prevId = getPrevChapterId(activeChapter);
  const nextId = getNextChapterId(activeChapter);
  const prevChapter = prevId ? CHAPTERS.find((c) => c.id === prevId) : null;
  const nextChapter = nextId ? CHAPTERS.find((c) => c.id === nextId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopBar
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <ChapterSidebar
            activeChapter={activeChapter}
            visitedChapters={visitedChapters}
            onSelectChapter={handleSelectChapter}
          />

          <main id="contenu-cours" className="flex-1 min-w-0 w-full">
            {activeChapter === 'empire' && <Chapter1Empire />}
            {activeChapter === 'fortifications' && <Chapter2Fortifications />}
            {activeChapter === 'charte' && <Chapter3Charte />}
            {activeChapter === 'moines' && <Chapter4Moines />}
            {activeChapter === 'quiz' && (
              <Chapter5Quiz onSelectChapter={handleSelectChapter} />
            )}

            {/* Chapter Stepper Footer */}
            <nav
              aria-label="Navigation entre chapitres"
              className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
            >
              {prevChapter ? (
                <button
                  type="button"
                  onClick={() => handleSelectChapter(prevChapter.id)}
                  className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    Précédent : {prevChapter.number}. {prevChapter.shortTitle}
                  </span>
                </button>
              ) : (
                <div aria-hidden="true" />
              )}

              {nextChapter && (
                <button
                  type="button"
                  onClick={() => handleSelectChapter(nextChapter.id)}
                  className="inline-flex items-center justify-center sm:justify-end gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>
                    Chapitre suivant : {nextChapter.number}.{' '}
                    {nextChapter.shortTitle}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              )}
            </nav>
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3 text-xs text-slate-500">
          <span>Cours d&apos;Histoire CM1 · Le Moyen Âge</span>
          <span>Cycle 3 · Programme d&apos;Histoire</span>
        </div>
      </footer>
    </div>
  );
}
