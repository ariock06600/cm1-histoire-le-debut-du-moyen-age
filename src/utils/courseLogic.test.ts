import test from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ_QUESTIONS, type ChapterId } from '../data/courseContent';
import {
  clampComparePercent,
  computeChapterBreakdown,
  computeProgressPercent,
  computeQuizSummary,
  evaluateHistorianCheck,
  evaluateQuizAnswer,
  getNextChapterId,
  getPrevChapterId,
} from './courseLogic';

test('chapter navigation returns adjacent chapter IDs and handles boundaries', () => {
  assert.equal(getPrevChapterId('empire'), null);
  assert.equal(getNextChapterId('empire'), 'fortifications');
  assert.equal(getPrevChapterId('charte'), 'fortifications');
  assert.equal(getNextChapterId('charte'), 'moines');
  assert.equal(getNextChapterId('quiz'), null);
});

test('computeProgressPercent accurately tracks visited chapters', () => {
  assert.equal(computeProgressPercent(new Set<ChapterId>(['empire'])), 20);
  assert.equal(
    computeProgressPercent(new Set<ChapterId>(['empire', 'fortifications', 'charte'])),
    60
  );
  assert.equal(
    computeProgressPercent(
      new Set<ChapterId>(['empire', 'fortifications', 'charte', 'moines', 'quiz'])
    ),
    100
  );
});

test('clampComparePercent clamps out-of-range values and handles NaN', () => {
  assert.equal(clampComparePercent(-15), 0);
  assert.equal(clampComparePercent(140), 100);
  assert.equal(clampComparePercent(42.6), 43);
  assert.equal(clampComparePercent(Number.NaN), 50);
});

test('quiz bank has 15 valid questions covering all four lesson chapters', () => {
  assert.equal(QUIZ_QUESTIONS.length, 15);
  for (const q of QUIZ_QUESTIONS) {
    assert.ok(q.options.length >= 2);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length);
  }
});

test('evaluateQuizAnswer checks selected index against correctIndex', () => {
  const firstQuestion = QUIZ_QUESTIONS[0];
  assert.equal(evaluateQuizAnswer(firstQuestion, firstQuestion.correctIndex), true);
  assert.equal(evaluateQuizAnswer(firstQuestion, 0), false);
});

test('computeQuizSummary computes score, percentage, and rank tiers', () => {
  const allCorrect: Record<string, number> = {};
  for (const q of QUIZ_QUESTIONS) {
    allCorrect[q.id] = q.correctIndex;
  }
  const perfect = computeQuizSummary(QUIZ_QUESTIONS, allCorrect);
  assert.equal(perfect.answeredCount, 15);
  assert.equal(perfect.correctCount, 15);
  assert.equal(perfect.percentage, 100);
  assert.equal(perfect.rankLabel, 'Grand Maître Historien CM1');

  const partial = computeQuizSummary(QUIZ_QUESTIONS, {
    q1: QUIZ_QUESTIONS[0].correctIndex,
    q2: 0,
    q3: QUIZ_QUESTIONS[2].correctIndex,
  });
  assert.equal(partial.answeredCount, 3);
  assert.equal(partial.correctCount, 2);
  assert.equal(partial.percentage, 13);
  assert.equal(partial.rankLabel, 'Explorateur curieux');
});

test('computeChapterBreakdown aggregates scores accurately per lesson chapter', () => {
  const answers: Record<string, number> = {
    q1: QUIZ_QUESTIONS[0].correctIndex,
    q6: QUIZ_QUESTIONS[5].correctIndex,
    q14: QUIZ_QUESTIONS[13].correctIndex,
    q15: QUIZ_QUESTIONS[14].correctIndex,
  };
  const breakdown = computeChapterBreakdown(QUIZ_QUESTIONS, answers);
  assert.equal(breakdown.length, 4);
  assert.equal(breakdown[0].totalCount, 5);
  assert.equal(breakdown[0].correctCount, 1);
  assert.equal(breakdown[1].totalCount, 4);
  assert.equal(breakdown[1].correctCount, 1);
  assert.equal(breakdown[2].totalCount, 4);
  assert.equal(breakdown[2].correctCount, 0);
  assert.equal(breakdown[3].totalCount, 2);
  assert.equal(breakdown[3].correctCount, 2);
});

test('evaluateHistorianCheck validates critical thinking verdicts', () => {
  assert.equal(evaluateHistorianCheck('prudence', 'prudence'), true);
  assert.equal(evaluateHistorianCheck('fiable', 'prudence'), false);
});
