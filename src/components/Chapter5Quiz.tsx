import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import {
  CHAPTERS,
  QUIZ_QUESTIONS,
  type ChapterId,
} from '../data/courseContent';
import {
  computeChapterBreakdown,
  computeQuizSummary,
  evaluateQuizAnswer,
} from '../utils/courseLogic';

interface Chapter5QuizProps {
  onSelectChapter: (id: ChapterId) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function Chapter5Quiz({ onSelectChapter }: Chapter5QuizProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedIndex = answers[currentQuestion.id];
  const isCurrentAnswered = typeof selectedIndex === 'number';
  const isCurrentCorrect =
    isCurrentAnswered && evaluateQuizAnswer(currentQuestion, selectedIndex);

  const summary = computeQuizSummary(QUIZ_QUESTIONS, answers);
  const breakdown = computeChapterBreakdown(QUIZ_QUESTIONS, answers);
  const currentChapterMeta = CHAPTERS.find(
    (c) => c.id === currentQuestion.chapterId
  );

  const missedQuestions = QUIZ_QUESTIONS.filter((q) => {
    const chosen = answers[q.id];
    return typeof chosen === 'number' && !evaluateQuizAnswer(q, chosen);
  });

  const handleSelectOption = (optionIndex: number) => {
    if (isCurrentAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const progressRatio = isFinished
    ? 1
    : (currentIndex + (isCurrentAnswered ? 1 : 0)) / totalQuestions;

  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-slate-200">
        <p className="text-xs font-medium text-slate-500">
          Chapitre 05 · Révision CM1 · {totalQuestions} questions une par une +
          Bilan final
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Mission d&apos;historien : le grand quiz du Moyen Âge
        </h1>
        <p className="mt-2.5 text-base text-slate-600 max-w-2xl leading-relaxed">
          Réponds aux {totalQuestions} questions les unes après les autres. À
          chaque étape, tu découvriras tout de suite l&apos;explication, puis un
          bilan complet à la fin !
        </p>
      </header>

      {/* Step-by-Step Quiz Card OR Final Feedback Screen */}
      {!isFinished ? (
        <section
          aria-label="Question en cours du quiz"
          className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-6"
        >
          {/* Progress Top Row */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 text-slate-600">
                <span className="font-bold text-blue-800 tabular-nums">
                  Question {currentIndex + 1} sur {totalQuestions}
                </span>
                {currentChapterMeta && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      {currentChapterMeta.number}. {currentChapterMeta.title}
                    </span>
                  </>
                )}
              </div>

              <span className="font-semibold text-slate-800 tabular-nums">
                Bonnes réponses : {summary.correctCount} /{' '}
                {summary.answeredCount}
              </span>
            </div>

            <div
              className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progressRatio * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression du quiz"
            >
              <div
                className="h-full bg-blue-700 rounded-full transition-transform duration-300 origin-left"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, optIdx) => {
              const chosenThis = selectedIndex === optIdx;
              const isRightOption = optIdx === currentQuestion.correctIndex;

              let buttonStyle =
                'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
              let letterStyle = 'bg-white border-slate-300 text-slate-700';

              if (isCurrentAnswered) {
                if (isRightOption) {
                  buttonStyle =
                    'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                  letterStyle =
                    'bg-emerald-700 border-emerald-700 text-white';
                } else if (chosenThis) {
                  buttonStyle = 'bg-red-50 border-red-300 text-red-950';
                  letterStyle = 'bg-red-700 border-red-700 text-white';
                } else {
                  buttonStyle =
                    'bg-slate-50 border-slate-200 text-slate-400 opacity-80';
                  letterStyle = 'bg-slate-100 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isCurrentAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  aria-pressed={chosenThis}
                  className={`text-left px-4 py-3.5 rounded-xl border text-sm transition-colors flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isCurrentAnswered ? 'cursor-default' : 'cursor-pointer'
                  } ${buttonStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-md border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${letterStyle}`}
                  >
                    {OPTION_LETTERS[optIdx] ?? optIdx + 1}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback & Next Button */}
          {isCurrentAnswered && (
            <div className="space-y-4 pt-1">
              <div
                className={`p-4 rounded-xl border text-sm flex items-start gap-3 ${
                  isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {isCurrentCorrect ? (
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p className="font-bold">
                    {isCurrentCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
                  </p>
                  <p className="mt-1 text-slate-800 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Recommencer depuis le début</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <span>
                    {currentIndex < totalQuestions - 1
                      ? `Question suivante (${currentIndex + 2}/${totalQuestions})`
                      : 'Voir mon bilan final'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* Final Comprehensive Feedback Screen */
        <section
          aria-label="Bilan final du quiz"
          className="space-y-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-800">
                    Bilan final · Quiz terminé ({totalQuestions} questions)
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    {summary.rankLabel}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 mt-1.5 leading-relaxed max-w-xl">
                    {summary.encouragement}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-blue-200 rounded-xl px-5 py-3.5 text-left sm:text-right shrink-0">
                <p className="font-display text-3xl font-bold text-blue-800 tabular-nums">
                  {summary.correctCount} / {summary.totalCount}
                </p>
                <p className="text-xs font-semibold text-slate-600 tabular-nums mt-0.5">
                  {summary.percentage} % de réussite
                </p>
              </div>
            </div>

            {/* Thematic Breakdown by Chapter */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Tes résultats chapitre par chapitre
              </h3>
              <div className="divide-y divide-slate-100">
                {breakdown.map((item) => {
                  const perfectChapter =
                    item.correctCount === item.totalCount &&
                    item.totalCount > 0;
                  return (
                    <div
                      key={item.chapterId}
                      className="py-3 first:pt-1 last:pb-0 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        {perfectChapter ? (
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-700 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <AlertCircle
                            className="w-4 h-4 text-amber-700 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-sm font-medium text-slate-800">
                          {item.chapterTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            perfectChapter
                              ? 'text-emerald-800'
                              : 'text-amber-800'
                          }`}
                        >
                          {item.correctCount} / {item.totalCount}
                          {perfectChapter ? ' · Maîtrisé' : ' · À renforcer'}
                        </span>
                        {!perfectChapter && (
                          <button
                            type="button"
                            onClick={() => onSelectChapter(item.chapterId)}
                            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer whitespace-nowrap"
                          >
                            Revoir
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Missed Questions Correction Review */}
            {missedQuestions.length > 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Points à revoir ({missedQuestions.length}{' '}
                  {missedQuestions.length > 1 ? 'questions' : 'question'})
                </h3>
                <div className="space-y-3">
                  {missedQuestions.map((q) => {
                    const chosenIdx = answers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm space-y-1.5"
                      >
                        <p className="font-semibold text-slate-900">
                          {q.question}
                        </p>
                        <p className="text-xs text-red-800">
                          Ta réponse : {q.options[chosenIdx]}
                        </p>
                        <p className="text-xs font-semibold text-emerald-800">
                          Bonne réponse : {q.options[q.correctIndex]}
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-950 font-medium">
                <CheckCircle2
                  className="w-5 h-5 text-emerald-700 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Sans-faute absolu ! Tu as trouvé la bonne réponse aux{' '}
                  {totalQuestions} questions du quiz.
                </span>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Recommencer le quiz</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
