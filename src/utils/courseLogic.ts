import { CHAPTERS, type ChapterId, type QuizQuestion } from '../data/courseContent';

export interface QuizSummary {
  answeredCount: number;
  correctCount: number;
  totalCount: number;
  percentage: number;
  rankLabel: string;
  encouragement: string;
}

export function getChapterIndex(chapterId: ChapterId): number {
  return CHAPTERS.findIndex((c) => c.id === chapterId);
}

export function getNextChapterId(currentId: ChapterId): ChapterId | null {
  const index = getChapterIndex(currentId);
  if (index === -1 || index >= CHAPTERS.length - 1) return null;
  return CHAPTERS[index + 1].id;
}

export function getPrevChapterId(currentId: ChapterId): ChapterId | null {
  const index = getChapterIndex(currentId);
  if (index <= 0) return null;
  return CHAPTERS[index - 1].id;
}

export function computeProgressPercent(visitedIds: ReadonlySet<ChapterId>): number {
  if (CHAPTERS.length === 0) return 0;
  let validCount = 0;
  for (const ch of CHAPTERS) {
    if (visitedIds.has(ch.id)) {
      validCount += 1;
    }
  }
  return Math.round((validCount / CHAPTERS.length) * 100);
}

export function clampComparePercent(value: number): number {
  if (Number.isNaN(value)) return 50;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function evaluateQuizAnswer(
  question: QuizQuestion,
  selectedIndex: number
): boolean {
  return selectedIndex === question.correctIndex;
}

export function computeQuizSummary(
  questions: readonly QuizQuestion[],
  answers: Readonly<Record<string, number>>
): QuizSummary {
  const totalCount = questions.length;
  let answeredCount = 0;
  let correctCount = 0;

  for (const q of questions) {
    const chosen = answers[q.id];
    if (typeof chosen === 'number') {
      answeredCount += 1;
      if (evaluateQuizAnswer(q, chosen)) {
        correctCount += 1;
      }
    }
  }

  const percentage =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  let rankLabel = 'Explorateur curieux';
  let encouragement =
    'Tu as bien commencé ! Relis les encadrés « À retenir » et retente le quiz pour battre ton record.';

  if (percentage === 100) {
    rankLabel = 'Grand Maître Historien CM1';
    encouragement =
      'Bravo ! Tu maîtrises parfaitement toutes les dates, les documents et les méthodes des historiens !';
  } else if (percentage >= 75) {
    rankLabel = 'Historien Confirmé CM1';
    encouragement =
      'Très beau travail ! Tu as compris presque tous les points essentiels de la leçon.';
  } else if (percentage >= 50) {
    rankLabel = 'Apprenti Historien CM1';
    encouragement =
      'C’est bien parti ! Jette un œil aux explications des questions manquées pour tout retenir.';
  }

  return {
    answeredCount,
    correctCount,
    totalCount,
    percentage,
    rankLabel,
    encouragement,
  };
}

export function evaluateHistorianCheck(
  expected: 'fiable' | 'prudence',
  chosen: 'fiable' | 'prudence'
): boolean {
  return expected === chosen;
}

export interface QuizChapterBreakdown {
  chapterId: ChapterId;
  chapterTitle: string;
  correctCount: number;
  totalCount: number;
}

export function computeChapterBreakdown(
  questions: readonly QuizQuestion[],
  answers: Readonly<Record<string, number>>
): QuizChapterBreakdown[] {
  const lessonChapters = CHAPTERS.filter((c) => c.id !== 'quiz');
  return lessonChapters.map((chapter) => {
    const chapterQuestions = questions.filter((q) => q.chapterId === chapter.id);
    let correctCount = 0;
    for (const q of chapterQuestions) {
      const chosen = answers[q.id];
      if (typeof chosen === 'number' && evaluateQuizAnswer(q, chosen)) {
        correctCount += 1;
      }
    }
    return {
      chapterId: chapter.id,
      chapterTitle: `${chapter.number}. ${chapter.title}`,
      correctCount,
      totalCount: chapterQuestions.length,
    };
  });
}
