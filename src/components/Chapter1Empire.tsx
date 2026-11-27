import { useState } from 'react';
import { ArrowRight, Compass, Lightbulb } from 'lucide-react';
import {
  MAP_COMPARISON_POINTS,
  TIMELINE_EVENTS,
} from '../data/courseContent';
import { COURSE_IMAGES } from '../data/courseImages';
import { DocumentImage } from './DocumentImage';

type MapViewMode = 'side-by-side' | '450' | '500';

export function Chapter1Empire() {
  const [mapMode, setMapMode] = useState<MapViewMode>('side-by-side');
  const [selectedTimelineYear, setSelectedTimelineYear] = useState<string>('476');
  const [selectedComparisonId, setSelectedComparisonId] = useState<string>(
    MAP_COMPARISON_POINTS[0].id
  );

  const activeTimeline =
    TIMELINE_EVENTS.find((e) => e.year === selectedTimelineYear) ??
    TIMELINE_EVENTS[1];
  const activeComparison =
    MAP_COMPARISON_POINTS.find((p) => p.id === selectedComparisonId) ??
    MAP_COMPARISON_POINTS[0];

  return (
    <div className="space-y-8">
      {/* Chapter Header */}
      <header className="pb-6 border-b border-slate-200">
        <p className="text-xs font-medium text-slate-500">
          Chapitre 01 · Page 1 du cahier · Date clé : 476
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Qu&apos;est-ce que le Moyen Âge ? La fin de l&apos;Empire romain
        </h1>
        <p className="mt-2.5 text-base text-slate-600 max-w-2xl leading-relaxed">
          Pour comprendre comment commence le Moyen Âge, observe attentivement les
          deux cartes de ton cahier. Entre l&apos;an 450 et l&apos;an 500, un
          immense changement s&apos;est produit en Europe.
        </p>
      </header>

      {/* Crucial Point Banner (Hairline, subtle tint, no border-l-4) */}
      <section
        aria-label="Point crucial à retenir"
        className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 sm:p-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-blue-800">
              À retenir par cœur · Phrase du cahier
            </p>
            <p className="font-display text-lg sm:text-xl font-bold text-slate-900">
              « En 476, l&apos;Empire romain disparaît. »
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Exemple concret : imagine un immense puzzle en un seul morceau qui
              se brise en plusieurs pièces. Avant 476 (pendant l&apos;Antiquité),
              l&apos;Empire romain est presque uni. Après 476, plusieurs peuples
              créent chacun leur propre royaume à l&apos;ouest (comme les Francs,
              qui donneront leur nom à la France, les Wisigoths ou les
              Burgondes), tandis que l&apos;Empire romain d&apos;Orient (en rouge
              sur la carte de 500) continue d&apos;exister à l&apos;est.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Stage 1: Real Maps Avant / Après 476 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Comparer les deux cartes du cahier : 450 et 500
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Choisis ta façon d&apos;observer le changement avant et après 476.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Mode d'affichage des cartes"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
          >
            {(
              [
                { id: 'side-by-side', label: 'Côte à côte' },
                { id: '450', label: 'En 450' },
                { id: '500', label: 'En 500' },
              ] as const
            ).map((tab) => {
              const active = mapMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMapMode(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Display Area */}
        {mapMode === 'side-by-side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-blue-800">
                Étape 1 · Avant 476 (Antiquité)
              </p>
              <DocumentImage
                src={COURSE_IMAGES.carteEmpire450}
                alt="Carte de l'Empire romain en 450 issue du cahier"
                caption="Carte de l'Empire romain en 450"
                sourceLabel="Document du cahier · Page 1"
                aspectClassName="aspect-[4/3]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-amber-800">
                Étape 2 · Après 476 (Début du Moyen Âge)
              </p>
              <DocumentImage
                src={COURSE_IMAGES.carteEmpire500}
                alt="Carte de l'Empire romain en 500 issue du cahier montrant les nouveaux royaumes"
                caption="Carte de l'Empire romain en 500"
                sourceLabel="Document du cahier · Page 1"
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        )}

        {mapMode === '450' && (
          <div className="max-w-2xl mx-auto">
            <DocumentImage
              src={COURSE_IMAGES.carteEmpire450}
              alt="Carte de l'Empire romain en 450 issue du cahier"
              caption="En 450 : l'Empire romain (en bleu) est encore presque entier autour de la Méditerranée."
              sourceLabel="Document du cahier · Page 1"
              aspectClassName="aspect-[4/3]"
            />
          </div>
        )}

        {mapMode === '500' && (
          <div className="max-w-2xl mx-auto">
            <DocumentImage
              src={COURSE_IMAGES.carteEmpire500}
              alt="Carte de l'Empire romain en 500 issue du cahier"
              caption="En 500 : à l'ouest, plusieurs royaumes remplacent l'Empire romain. À l'est (en rouge), l'Empire romain d'Orient subsiste."
              sourceLabel="Document du cahier · Page 1"
              aspectClassName="aspect-[4/3]"
            />
          </div>
        )}

        {/* Guided Observation Switcher */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Compass className="w-4 h-4 text-blue-700" aria-hidden="true" />
            <span>3 observations guidées pour bien comprendre les cartes</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {MAP_COMPARISON_POINTS.map((point) => {
              const active = point.id === activeComparison.id;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setSelectedComparisonId(point.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {point.title}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div>
              <p className="text-xs font-semibold text-blue-800 tabular-nums">
                En 450 (avant 476)
              </p>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                {activeComparison.before450}
              </p>
            </div>
            <div className="md:border-l md:border-slate-200 md:pl-4">
              <p className="text-xs font-semibold text-amber-800 tabular-nums">
                En 500 (après 476)
              </p>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                {activeComparison.after500}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stage 2: Animated Chronological Timeline */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Schéma interactif : où se situe le Moyen Âge sur la frise ?
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clique sur chaque date pour découvrir combien de temps dure le Moyen
            Âge (environ 1 000 ans !).
          </p>
        </div>

        {/* Visual Timeline Track */}
        <div className="relative pt-2 pb-1">
          <div
            className="hidden sm:block absolute top-7 left-6 right-6 h-1 bg-slate-200 rounded-full"
            aria-hidden="true"
          />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
            {TIMELINE_EVENTS.map((ev) => {
              const isSelected = ev.year === activeTimeline.year;
              return (
                <button
                  key={ev.year}
                  type="button"
                  onClick={() => setSelectedTimelineYear(ev.year)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm -translate-y-0.5'
                      : ev.isPivot
                        ? 'bg-amber-50 text-slate-900 border-amber-300 hover:bg-amber-100'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base font-bold tabular-nums">
                    {ev.year}
                  </span>
                  <span
                    className={`mt-1 text-xs leading-snug font-medium ${
                      isSelected ? 'text-blue-100' : 'text-slate-600'
                    }`}
                  >
                    {ev.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Event Detail */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="shrink-0">
            <p className="text-xs font-medium text-slate-500">
              {activeTimeline.period}
            </p>
            <p className="font-display text-2xl font-bold text-blue-800 tabular-nums">
              An {activeTimeline.year}
            </p>
          </div>
          <div className="hidden sm:flex text-slate-300" aria-hidden="true">
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {activeTimeline.description}
          </p>
        </div>
      </section>
    </div>
  );
}
