import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Eye,
  Lightbulb,
  Scale,
} from 'lucide-react';
import {
  ABBEY_STEPS,
  HISTORIAN_STATEMENTS,
  PHILIPPE_HOTSPOTS,
} from '../data/courseContent';
import { evaluateHistorianCheck } from '../utils/courseLogic';
import { COURSE_IMAGES } from '../data/courseImages';
import { DocumentImage } from './DocumentImage';

export function Chapter4Moines() {
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    PHILIPPE_HOTSPOTS[0].id
  );
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checks, setChecks] = useState<Record<string, 'fiable' | 'prudence'>>(
    {}
  );

  const activeHotspot =
    PHILIPPE_HOTSPOTS.find((h) => h.id === activeHotspotId) ??
    PHILIPPE_HOTSPOTS[0];
  const currentAbbeyStep =
    ABBEY_STEPS.find((s) => s.step === activeStep) ?? ABBEY_STEPS[0];

  const handleChooseVerdict = (
    statementId: string,
    verdict: 'fiable' | 'prudence'
  ) => {
    setChecks((prev) => ({ ...prev, [statementId]: verdict }));
  };

  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-slate-200">
        <p className="text-xs font-medium text-slate-500">
          Chapitre 04 · Page 2 du cahier · Esprit critique de l&apos;historien
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Qui écrivait au Moyen Âge ? Pourquoi ne pas tout croire ?
        </h1>
        <p className="mt-2.5 text-base text-slate-600 max-w-2xl leading-relaxed">
          Un texte ancien est un trésor pour les historiens, mais il faut le
          lire comme un vrai détective ! Observe cette enluminure de ton cahier
          pour comprendre qui écrivait les livres et pour qui.
        </p>
      </header>

      {/* Crucial Points from Notebook */}
      <section
        aria-label="Points cruciaux à retenir"
        className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 sm:p-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-blue-800">
              À retenir par cœur · Phrases du cahier
            </p>
            <p className="font-display text-lg font-bold text-slate-900 leading-snug">
              « Les écrits du Moyen Âge sont souvent écrits par des moines dans
              les abbayes. »
            </p>
            <p className="font-display text-lg font-bold text-slate-900 leading-snug">
              « Les textes étaient souvent commandés par des personnes très
              riches qu&apos;il ne fallait pas décevoir. C&apos;est pourquoi les
              historiens doivent veiller à ne pas tout croire. »
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Stage 1: Philippe le Bon Illumination */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Observer l&apos;enluminure : Philippe le Bon à sa cour
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clique sur les repères 1 à 4 pour découvrir tous les détails cachés
            dans cette peinture médiévale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6">
            <DocumentImage
              src={COURSE_IMAGES.philippeLeBon}
              alt="Enluminure montrant Philippe le Bon écoutant la lecture des Chroniques de Hainaut issue du cahier"
              caption="Philippe le Bon écoutant la lecture des Chroniques de Hainaut"
              sourceLabel="Document du cahier · Page 2"
              hotspots={PHILIPPE_HOTSPOTS}
              activeHotspotId={activeHotspotId}
              onSelectHotspot={setActiveHotspotId}
              aspectClassName="aspect-square"
            />
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Eye className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Ce que montre l&apos;image</span>
            </div>

            {PHILIPPE_HOTSPOTS.map((spot) => {
              const selected = spot.id === activeHotspot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspotId(spot.id)}
                  aria-pressed={selected}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
                    selected
                      ? 'bg-blue-50 border-blue-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold tabular-nums flex items-center justify-center shrink-0 mt-0.5 ${
                      selected
                        ? 'bg-blue-700 text-white'
                        : 'bg-white border border-slate-300 text-slate-700'
                    }`}
                  >
                    {spot.number}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {spot.label}
                    </p>
                    {selected && (
                      <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                        {spot.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Stage 2: 3-Step Diagram — The Path of a Medieval Book */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Schéma : le parcours d&apos;un écrit médiéval en 3 étapes
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clique sur chaque étape pour suivre la fabrication et l&apos;étude
            d&apos;un manuscrit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ABBEY_STEPS.map((item) => {
            const selected = item.step === currentAbbeyStep.step;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(item.step)}
                aria-pressed={selected}
                className={`text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                  selected
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p
                  className={`text-xs font-semibold tabular-nums ${
                    selected ? 'text-blue-200' : 'text-blue-800'
                  }`}
                >
                  Étape 0{item.step}
                </p>
                <p className="mt-1 text-sm font-bold leading-snug">
                  {item.title}
                </p>
                <p
                  className={`mt-1.5 text-xs leading-relaxed ${
                    selected ? 'text-blue-100' : 'text-slate-600'
                  }`}
                >
                  {item.summary}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="shrink-0 flex items-center gap-2 text-blue-800 font-semibold text-sm">
            <span>Explication</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {currentAbbeyStep.detail}
          </p>
        </div>
      </section>

      {/* Interactive Stage 3: Historian Critical Thinking Mini-Lab */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
          <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Atelier : mets-toi dans la peau d&apos;un historien !
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Lis chaque extrait et décide si l&apos;information est plutôt{' '}
              <strong>fiable</strong> ou s&apos;il faut{' '}
              <strong>se méfier (prudence)</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {HISTORIAN_STATEMENTS.map((stmt, idx) => {
            const chosen = checks[stmt.id];
            const isCorrect =
              chosen !== undefined &&
              evaluateHistorianCheck(stmt.verdict, chosen);

            return (
              <div
                key={stmt.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 tabular-nums">
                    Indice 0{idx + 1}
                  </span>
                  <span>Source : {stmt.source}</span>
                </div>

                <p className="font-display text-base sm:text-lg text-slate-900 leading-snug">
                  {stmt.quote}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleChooseVerdict(stmt.id, 'fiable')}
                    aria-pressed={chosen === 'fiable'}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                      chosen === 'fiable'
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Fait fiable
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChooseVerdict(stmt.id, 'prudence')}
                    aria-pressed={chosen === 'prudence'}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                      chosen === 'prudence'
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Prudence, ne pas tout croire
                  </button>
                </div>

                {chosen && (
                  <div
                    className={`p-3.5 rounded-lg border text-sm flex items-start gap-2.5 ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <AlertTriangle
                        className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <p className="font-semibold">
                        {isCorrect
                          ? 'Bien vu, détective !'
                          : 'Regarde bien qui a commandé ce texte :'}
                      </p>
                      <p className="mt-0.5 text-slate-800 leading-relaxed">
                        {stmt.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
