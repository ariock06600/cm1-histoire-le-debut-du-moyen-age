import { useState } from 'react';
import { Shield, ShieldAlert, Lightbulb, Eye } from 'lucide-react';
import { COMMARQUE_HOTSPOTS } from '../data/courseContent';
import { COURSE_IMAGES } from '../data/courseImages';
import { DocumentImage } from './DocumentImage';

interface CastlePart {
  id: string;
  name: string;
  role: string;
  duringAttack: string;
}

const CASTLE_PARTS: CastlePart[] = [
  {
    id: 'donjon',
    name: 'Le donjon',
    role: 'La tour la plus haute et la plus solide. Le seigneur y vit et les guetteurs y surveillent tout le territoire.',
    duringAttack:
      'En cas d’attaque, les guetteurs sonnent l’alerte du haut du donjon et c’est le dernier refuge si les murs cèdent.',
  },
  {
    id: 'remparts',
    name: 'Les remparts et créneaux',
    role: 'De très épais murs de pierre entourent la cour pour former un bouclier autour du château.',
    duringAttack:
      'Les flèches ennemies ricochent sur la pierre ! Les défenseurs se cachent derrière les créneaux pour riposter.',
  },
  {
    id: 'pont-levis',
    name: 'Le pont-levis et les douves',
    role: 'Un pont en bois permet de traverser le fossé (les douves) en temps de paix pour aller au village.',
    duringAttack:
      'On relève aussitôt le pont-levis avec des chaînes ! Plus aucun cavalier ni soldat ennemi ne peut franchir l’entrée.',
  },
  {
    id: 'refuge',
    name: 'La basse-cour (refuge)',
    role: 'Une grande cour protégée à l’intérieur des murs où l’on trouve des réserves de nourriture et d’eau.',
    duringAttack:
      'Les paysans des villages voisins viennent vite s’y mettre à l’abri avec leurs animaux pendant les conflits.',
  },
];

export function Chapter2Fortifications() {
  const [stageTab, setStageTab] = useState<'document' | 'schema'>('document');
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    COMMARQUE_HOTSPOTS[0].id
  );
  const [underAttack, setUnderAttack] = useState<boolean>(false);
  const [selectedPartId, setSelectedPartId] = useState<string>('pont-levis');

  const activeHotspot =
    COMMARQUE_HOTSPOTS.find((h) => h.id === activeHotspotId) ??
    COMMARQUE_HOTSPOTS[0];
  const activePart =
    CASTLE_PARTS.find((p) => p.id === selectedPartId) ?? CASTLE_PARTS[0];

  return (
    <div className="space-y-8">
      <header className="pb-6 border-b border-slate-200">
        <p className="text-xs font-medium text-slate-500">
          Chapitre 02 · Page 1 du cahier · Archéologie & Défense
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Les vestiges et les fortifications
        </h1>
        <p className="mt-2.5 text-base text-slate-600 max-w-2xl leading-relaxed">
          Comment connaît-on la vie au Moyen Âge même sans photographies ni
          vidéos ? Grâce aux constructions anciennes qui existent encore
          aujourd&apos;hui, comme le château de Commarque en Dordogne !
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
              « Les vestiges permettent aux historiens de reconstituer les modes
              de vie de l&apos;époque. »
            </p>
            <p className="font-display text-lg font-bold text-slate-900 leading-snug">
              « Le Moyen Âge est marqué par de nombreux conflits, on construit
              donc des fortifications pour se protéger et protéger son
              territoire. »
            </p>
          </div>
        </div>
      </section>

      {/* Two-Tab Interactive Stage */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {stageTab === 'document'
                ? 'Observer le vrai document : Château de Commarque'
                : 'Schéma animé : comment un château fort protège ses habitants'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {stageTab === 'document'
                ? 'Clique sur les numéros 1 à 4 sur la photo du cahier pour mener ton enquête.'
                : 'Active la simulation d’attaque pour voir les défenses entrer en action !'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Choisir l'activité sur les fortifications"
            className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={stageTab === 'document'}
              onClick={() => setStageTab('document')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                stageTab === 'document'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Photo du cahier
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={stageTab === 'schema'}
              onClick={() => setStageTab('schema')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                stageTab === 'schema'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Schéma animé
            </button>
          </div>
        </div>

        {stageTab === 'document' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <DocumentImage
                src={COURSE_IMAGES.chateauCommarque}
                alt="Photographie du château de Commarque à Les Eyzies en Dordogne issue du cahier"
                caption="Château de Commarque, Les Eyzies, Dordogne"
                sourceLabel="Document du cahier · Page 1"
                hotspots={COMMARQUE_HOTSPOTS}
                activeHotspotId={activeHotspotId}
                onSelectHotspot={setActiveHotspotId}
                aspectClassName="aspect-[3/4]"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Eye className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>Loupe de l&apos;historien</span>
              </div>

              <div className="space-y-2">
                {COMMARQUE_HOTSPOTS.map((spot) => {
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
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Animated Educational SVG Castle Diagram */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {underAttack ? (
                    <>
                      <ShieldAlert
                        className="w-4 h-4 text-red-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-red-800">
                        État : Alerte attaque — Défenses activées
                      </span>
                    </>
                  ) : (
                    <>
                      <Shield
                        className="w-4 h-4 text-emerald-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-800">
                        État : Temps de paix — Pont-levis abaissé
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setUnderAttack((prev) => !prev)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    underAttack
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-red-700 text-white hover:bg-red-800'
                  }`}
                >
                  {underAttack ? 'Revenir au calme' : 'Simuler une attaque'}
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 bg-sky-50">
                <svg
                  viewBox="0 0 640 360"
                  role="img"
                  aria-label={
                    underAttack
                      ? 'Schéma d’un château fort en état de défense : pont-levis relevé et flèches arrêtées par les remparts'
                      : 'Schéma d’un château fort en temps de paix : donjon, remparts, basse-cour et pont-levis abaissé'
                  }
                  className="w-full h-auto block"
                >
                  {/* Sky & Hills */}
                  <rect
                    width="640"
                    height="360"
                    fill={underAttack ? '#E2E8F0' : '#E0F2FE'}
                  />
                  <path
                    d="M0 280 Q160 230 340 265 T640 250 L640 360 L0 360 Z"
                    fill="#BBF7D0"
                  />
                  <rect x="0" y="290" width="640" height="70" fill="#86EFAC" />

                  {/* Moat (Douves) */}
                  <path
                    d="M125 290 L145 335 L235 335 L250 290 Z"
                    fill="#0284C7"
                  />
                  <path
                    d="M150 315 Q175 310 200 315 T230 315"
                    stroke="#BAE6FD"
                    strokeWidth="2.5"
                    fill="none"
                  />

                  {/* Village Outside */}
                  <g opacity={underAttack ? 0.5 : 1}>
                    <rect x="34" y="258" width="44" height="32" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
                    <polygon points="28,258 56,232 84,258" fill="#B45309" />
                    <rect x="50" y="272" width="12" height="18" fill="#78350F" />
                  </g>

                  {/* Main Keep (Donjon) */}
                  <g
                    onClick={() => setSelectedPartId('donjon')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="380"
                      y="72"
                      width="115"
                      height="218"
                      fill="#CBD5E1"
                      stroke={selectedPartId === 'donjon' ? '#1D4ED8' : '#475569'}
                      strokeWidth={selectedPartId === 'donjon' ? '3.5' : '2'}
                    />
                    {/* Keep Battlements */}
                    <path
                      d="M374 72 L374 54 L394 54 L394 64 L412 64 L412 54 L432 54 L432 64 L450 64 L450 54 L470 54 L470 64 L486 64 L486 54 L501 54 L501 72 Z"
                      fill="#94A3B8"
                      stroke="#475569"
                      strokeWidth="1.5"
                    />
                    {/* Flag */}
                    <line x1="438" y1="54" x2="438" y2="20" stroke="#334155" strokeWidth="2.5" />
                    <polygon
                      points="438,20 476,29 438,38"
                      fill={underAttack ? '#DC2626' : '#1D4ED8'}
                      className="animate-flag-wave"
                    />
                    {/* Narrow Slit Windows */}
                    <rect x="408" y="108" width="8" height="24" rx="2" fill="#1E293B" />
                    <rect x="458" y="108" width="8" height="24" rx="2" fill="#1E293B" />
                    <rect x="433" y="160" width="8" height="24" rx="2" fill="#1E293B" />
                  </g>

                  {/* Courtyard / Refuge (Basse-cour) */}
                  <g
                    onClick={() => setSelectedPartId('refuge')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="305"
                      y="222"
                      width="75"
                      height="68"
                      fill="#FEF9C3"
                      stroke={selectedPartId === 'refuge' ? '#1D4ED8' : '#854D0E'}
                      strokeWidth={selectedPartId === 'refuge' ? '3' : '1.5'}
                    />
                    <polygon points="300,222 342,192 382,222" fill="#CA8A04" />
                    {underAttack && (
                      <text
                        x="342"
                        y="260"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill="#713F12"
                      >
                        À l&apos;abri !
                      </text>
                    )}
                  </g>

                  {/* Outer Ramparts & Gate Tower */}
                  <g
                    onClick={() => setSelectedPartId('remparts')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="244"
                      y="156"
                      width="66"
                      height="134"
                      fill="#94A3B8"
                      stroke={selectedPartId === 'remparts' ? '#1D4ED8' : '#334155'}
                      strokeWidth={selectedPartId === 'remparts' ? '3.5' : '2'}
                    />
                    {/* Gate Arch */}
                    <path
                      d="M258 290 L258 238 Q277 216 296 238 L296 290 Z"
                      fill="#1E293B"
                    />
                    {/* Rampart Wall to Right */}
                    <rect
                      x="495"
                      y="186"
                      width="95"
                      height="104"
                      fill="#94A3B8"
                      stroke={selectedPartId === 'remparts' ? '#1D4ED8' : '#334155'}
                      strokeWidth={selectedPartId === 'remparts' ? '3.5' : '2'}
                    />
                    {/* Battlements on Gate Tower */}
                    <path
                      d="M240 156 L240 142 L256 142 L256 150 L270 150 L270 142 L286 142 L286 150 L298 150 L298 142 L314 142 L314 156 Z"
                      fill="#64748B"
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Drawbridge (Pont-levis) */}
                  <g
                    onClick={() => setSelectedPartId('pont-levis')}
                    className="cursor-pointer"
                  >
                    <g
                      style={{
                        transformBox: 'fill-box',
                        transformOrigin: 'right bottom',
                        transform: underAttack ? 'rotate(82deg)' : 'rotate(0deg)',
                        transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <rect
                        x="136"
                        y="278"
                        width="110"
                        height="12"
                        rx="2"
                        fill="#92400E"
                        stroke={selectedPartId === 'pont-levis' ? '#1D4ED8' : '#451A03'}
                        strokeWidth={selectedPartId === 'pont-levis' ? '3' : '1.5'}
                      />
                    </g>
                    {/* Chain */}
                    {!underAttack && (
                      <line
                        x1="164"
                        y1="278"
                        x2="244"
                        y2="212"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                    )}
                  </g>

                  {/* Flying arrows blocked by walls during attack */}
                  {underAttack && (
                    <g aria-hidden="true">
                      <g className="animate-arrow-flight">
                        <line x1="90" y1="220" x2="120" y2="212" stroke="#B91C1C" strokeWidth="2.5" />
                        <polygon points="120,212 112,208 114,217" fill="#B91C1C" />
                      </g>
                      <g
                        className="animate-arrow-flight"
                        style={{ animationDelay: '0.8s' }}
                      >
                        <line x1="82" y1="186" x2="112" y2="178" stroke="#B91C1C" strokeWidth="2.5" />
                        <polygon points="112,178 104,174 106,183" fill="#B91C1C" />
                      </g>
                    </g>
                  )}

                  {/* Crisp SVG Labels with generous spacing */}
                  <text x="56" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">
                    Village
                  </text>
                  <text x="184" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369A1">
                    Douves &amp; Pont-levis
                  </text>
                  <text x="306" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E293B">
                    Remparts
                  </text>
                  <text x="438" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E293B">
                    Donjon
                  </text>
                </svg>
              </div>
            </div>

            {/* Interactive Part Inspector */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-semibold text-slate-500">
                Clique sur un élément du château pour comprendre son rôle :
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CASTLE_PARTS.map((part) => {
                  const selected = part.id === activePart.id;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => setSelectedPartId(part.id)}
                      aria-pressed={selected}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer border ${
                        selected
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {part.name}
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  {activePart.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activePart.role}
                </p>
                <div
                  className={`p-3 rounded-lg border text-sm leading-relaxed ${
                    underAttack
                      ? 'bg-red-50 border-red-200 text-red-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-semibold block text-xs mb-0.5">
                    {underAttack
                      ? 'En ce moment (pendant l’attaque) :'
                      : 'En cas de conflit :'}
                  </span>
                  {activePart.duringAttack}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CM1 Mini Dictionary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-blue-800">
            Mot de vocabulaire · 01
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">Un vestige</h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            C&apos;est une trace ancienne laissée par les humains du passé (des
            ruines de château, une pièce de monnaie, une poterie, une épée). Les
            archéologues et historiens l&apos;étudient comme un indice !
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-blue-800">
            Mot de vocabulaire · 02
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            Une fortification
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
            C&apos;est un ensemble de constructions très solides (tours, murs
            épais, fossés) bâties pour protéger les habitants et défendre un
            territoire contre les attaques.
          </p>
        </div>
      </section>
    </div>
  );
}
