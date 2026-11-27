import { useState } from 'react';
import { FileText, Lightbulb, Search } from 'lucide-react';
import { CHARTER_CLUES, CHARTE_HOTSPOTS } from '../data/courseContent';
import { COURSE_IMAGES } from '../data/courseImages';
import { DocumentImage } from './DocumentImage';

export function Chapter3Charte() {
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    CHARTE_HOTSPOTS[2].id
  );
  const [activeClueId, setActiveClueId] = useState<string>(CHARTER_CLUES[1].id);

  const activeHotspot =
    CHARTE_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? CHARTE_HOTSPOTS[0];
  const activeClue =
    CHARTER_CLUES.find((c) => c.id === activeClueId) ?? CHARTER_CLUES[0];

  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-slate-200">
        <p className="text-xs font-medium text-slate-500">
          Chapitre 03 · Page 2 du cahier · Les écrits (mars 1255)
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Des écrits rares et réservés aux personnes riches
        </h1>
        <p className="mt-2.5 text-base text-slate-600 max-w-2xl leading-relaxed">
          Aujourd&apos;hui, tout le monde apprend à lire et à écrire à
          l&apos;école. Au Moyen Âge, c&apos;était totalement différent ! Découvre
          la vraie Charte de Mahaut datée de mars 1255.
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
              « Au Moyen Âge, les écrits restent rares et réservés aux personnes
              riches. »
            </p>
            <p className="font-display text-lg font-bold text-slate-900 leading-snug">
              « Ils apportent des informations importantes aux historiens sur les
              personnes qui possédaient les territoires et les dirigeaient. »
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Stage 1: Real Parchment Photo with Wax Seals */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Observer la vraie Charte de Mahaut (mars 1255)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clique sur les numéros 1 à 4 pour examiner ce document vieux de plus
            de 770 ans !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6">
            <DocumentImage
              src={COURSE_IMAGES.charteMahaut}
              alt="Charte de Mahaut de mars 1255 sur parchemin avec trois sceaux de cire issue du cahier"
              caption="Charte de Mahaut, mars 1255 (AD Oise, G 7297 · 18 × 26,5 cm)"
              sourceLabel="Document du cahier · Page 2"
              hotspots={CHARTE_HOTSPOTS}
              activeHotspotId={activeHotspotId}
              onSelectHotspot={setActiveHotspotId}
              aspectClassName="aspect-[10/11]"
            />
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Search className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Les secrets de ce parchemin</span>
            </div>

            {CHARTE_HOTSPOTS.map((spot) => {
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

      {/* Interactive Stage 2: Plain-French Charter Decoder */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
          <FileText className="w-5 h-5 text-blue-700 shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Décodeur de texte : que raconte la Charte de Mahaut ?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clique sur les passages surlignés dans le texte du cahier pour les
              traduire en français simple.
            </p>
          </div>
        </div>

        {/* Explicit Clue Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'mahaut', label: '1. Qui est Mahaut ?' },
              { id: 'entendront', label: '2. Pourquoi « entendront » ?' },
              { id: 'dime', label: '3. Qu’est-ce que la dîme ?' },
            ] as const
          ).map((tab) => {
            const active = activeClue.id === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveClueId(tab.id)}
                aria-pressed={active}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Authentic Transcript from Page 2 */}
        <blockquote className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 font-display text-base sm:text-lg text-slate-900 leading-loose">
          <span className="block text-xs font-sans font-semibold text-amber-900 mb-2 leading-normal">
            Extrait authentique · Charte de Mahaut, mars 1255
          </span>
          «{' '}
          <button
            type="button"
            onClick={() => setActiveClueId('mahaut')}
            aria-pressed={activeClue.id === 'mahaut'}
            className={`inline text-left rounded px-1.5 py-0.5 cursor-pointer underline decoration-2 underline-offset-4 box-decoration-clone ${
              activeClue.id === 'mahaut'
                ? 'bg-blue-700 text-white decoration-blue-300'
                : 'bg-amber-200/75 text-slate-900 hover:bg-amber-300/80 decoration-amber-600'
            }`}
          >
            Moi, Mahaut, fille de feu Hugues le Sauvage, chevalier
          </button>
          , fais savoir à tous ceux, présents et à venir,{' '}
          <button
            type="button"
            onClick={() => setActiveClueId('entendront')}
            aria-pressed={activeClue.id === 'entendront'}
            className={`inline text-left rounded px-1.5 py-0.5 cursor-pointer underline decoration-2 underline-offset-4 box-decoration-clone ${
              activeClue.id === 'entendront'
                ? 'bg-blue-700 text-white decoration-blue-300'
                : 'bg-amber-200/75 text-slate-900 hover:bg-amber-300/80 decoration-amber-600'
            }`}
          >
            qui verront et entendront [la lecture de] ces présentes lettres
          </button>
          , que{' '}
          <button
            type="button"
            onClick={() => setActiveClueId('dime')}
            aria-pressed={activeClue.id === 'dime'}
            className={`inline text-left rounded px-1.5 py-0.5 cursor-pointer underline decoration-2 underline-offset-4 box-decoration-clone ${
              activeClue.id === 'dime'
                ? 'bg-blue-700 text-white decoration-blue-300'
                : 'bg-amber-200/75 text-slate-900 hover:bg-amber-300/80 decoration-amber-600'
            }`}
          >
            j&apos;ai vendu au doyen et au chapitre de l&apos;église
            Saint-Thomas de Crépy le quart de la dîme d&apos;Orrouy dont
            j&apos;avais hérité
          </button>{' '}
          […] »
        </blockquote>

        {/* Decoder Explanation Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-800">
              En français simple (CM1)
            </p>
            <p className="mt-1.5 text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
              {activeClue.plainMeaning}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-800">
              Ce que l&apos;historien apprend grâce à cet indice
            </p>
            <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
              {activeClue.historianNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
