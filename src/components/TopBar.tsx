import { Award } from 'lucide-react';
import { CHAPTERS, type ChapterId } from '../data/courseContent';

interface TopBarProps {
  activeChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
}

export function TopBar({ activeChapter, onSelectChapter }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        <a
          href="#contenu-cours"
          onClick={(e) => {
            e.preventDefault();
            onSelectChapter('empire');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 rounded"
        >
          Le Moyen Âge · CM1
        </a>

        <nav
          aria-label="Navigation rapide des chapitres"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onSelectChapter(chapter.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                  isActive
                    ? 'border-blue-700 text-blue-800 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {chapter.number}. {chapter.shortTitle}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onSelectChapter('quiz')}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Faire le quiz</span>
          </button>
        </div>
      </div>
    </header>
  );
}
