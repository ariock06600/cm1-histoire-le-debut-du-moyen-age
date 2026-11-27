import { Check } from 'lucide-react';
import { CHAPTERS, type ChapterId } from '../data/courseContent';
import { computeProgressPercent } from '../utils/courseLogic';

interface ChapterSidebarProps {
  activeChapter: ChapterId;
  visitedChapters: ReadonlySet<ChapterId>;
  onSelectChapter: (id: ChapterId) => void;
}

export function ChapterSidebar({
  activeChapter,
  visitedChapters,
  onSelectChapter,
}: ChapterSidebarProps) {
  const progress = computeProgressPercent(visitedChapters);

  return (
    <aside
      aria-label="Sommaire du cours"
      className="w-full lg:w-72 shrink-0"
    >
      {/* Mobile / tablet compact horizontal chapter switcher */}
      <nav
        aria-label="Choisir un chapitre"
        className="lg:hidden mb-6 bg-white border border-slate-200 rounded-xl p-2"
      >
        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Plan du cours</span>
          <span className="tabular-nums">
            {visitedChapters.size}/{CHAPTERS.length} chapitres vus
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            const isVisited = visitedChapters.has(chapter.id);
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onSelectChapter(chapter.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[44px] px-2.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="tabular-nums">{chapter.number}.</span>
                <span>{chapter.shortTitle}</span>
                {isVisited && !isActive && (
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-label="Vu" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop sticky vertical menu */}
      <div className="hidden lg:block sticky top-24 bg-white border border-slate-200 rounded-2xl p-5">
        <div className="pb-4 mb-4 border-b border-slate-100">
          <p className="text-xs font-medium text-slate-500">
            Histoire · Cycle 3 · CM1
          </p>
          <h2 className="mt-1 text-base font-bold text-slate-900">
            Qu&apos;est-ce que le Moyen Âge ?
          </h2>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
              <span>Ta progression</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {progress} %
              </span>
            </div>
            <div
              className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression dans le cours"
            >
              <div
                className="h-full bg-blue-700 rounded-full transition-transform duration-300 origin-left"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>
        </div>

        <nav aria-label="Chapitres du cours" className="space-y-1.5">
          {CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            const isVisited = visitedChapters.has(chapter.id);

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onSelectChapter(chapter.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors cursor-pointer flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  isActive
                    ? 'bg-blue-50 text-blue-950 ring-1 ring-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`mt-0.5 w-6 h-6 rounded-md text-xs font-bold tabular-nums flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : isVisited
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isVisited && !isActive ? (
                    <Check className="w-3.5 h-3.5" aria-label="Chapitre vu" />
                  ) : (
                    chapter.number
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug">
                    {chapter.title}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {chapter.duration}
                    {isVisited ? ' · Consulté' : ''}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
