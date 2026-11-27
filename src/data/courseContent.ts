export type ChapterId = 'empire' | 'fortifications' | 'charte' | 'moines' | 'quiz';

export interface ChapterMeta {
  id: ChapterId;
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  duration: string;
  keyTakeaway: string;
}

export interface TimelineEvent {
  year: string;
  label: string;
  period: string;
  description: string;
  isPivot?: boolean;
}

export interface ImageHotspot {
  id: string;
  number: number;
  xPercent: number;
  yPercent: number;
  label: string;
  explanation: string;
}

export interface CharterClue {
  id: string;
  excerpt: string;
  plainMeaning: string;
  historianNote: string;
}

export interface HistorianStatement {
  id: string;
  quote: string;
  source: string;
  verdict: 'fiable' | 'prudence';
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: ChapterId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'empire',
    number: '01',
    shortTitle: '476',
    title: "La fin de l'Empire romain",
    subtitle: 'Pourquoi le Moyen Âge commence en 476',
    duration: '4 min',
    keyTakeaway: "En 476, l'Empire romain disparaît. C'est le début du Moyen Âge.",
  },
  {
    id: 'fortifications',
    number: '02',
    shortTitle: 'Vestiges',
    title: 'Vestiges et fortifications',
    subtitle: 'Se protéger pendant une époque marquée par les conflits',
    duration: '5 min',
    keyTakeaway:
      "Les vestiges aident les historiens à comprendre la vie d'autrefois. On construit des fortifications pour se protéger.",
  },
  {
    id: 'charte',
    number: '03',
    shortTitle: 'Charte',
    title: 'Des écrits rares et précieux',
    subtitle: 'Découvrir la Charte de Mahaut (mars 1255)',
    duration: '5 min',
    keyTakeaway:
      'Les écrits restent rares et réservés aux riches, mais ils renseignent les historiens sur ceux qui dirigent les territoires.',
  },
  {
    id: 'moines',
    number: '04',
    shortTitle: 'Moines',
    title: "Qui écrivait ? L'œil de l'historien",
    subtitle: 'Moines copistes, riches seigneurs et esprit critique',
    duration: '5 min',
    keyTakeaway:
      'Les textes étaient écrits par des moines pour des personnes très riches : les historiens doivent veiller à ne pas tout croire.',
  },
  {
    id: 'quiz',
    number: '05',
    shortTitle: 'Quiz',
    title: "Mission d'historien : le quiz",
    subtitle: '15 questions une par une et bilan final',
    duration: '6 min',
    keyTakeaway: 'Tu connais maintenant les secrets des historiens pour étudier le Moyen Âge !',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '450',
    label: "Un grand Empire romain",
    period: 'Fin de l’Antiquité',
    description:
      "En 450, presque tout le tour de la mer Méditerranée appartient encore à l'Empire romain. Seuls quelques peuples (Suèves, Wisigoths, Vandales) commencent à installer de petits royaumes.",
  },
  {
    year: '476',
    label: "Chute de l'Empire romain",
    period: 'Début du Moyen Âge',
    description:
      "En 476, le dernier empereur romain d'Occident perd son trône. L'Empire romain disparaît à l'ouest : pour les historiens, c'est la date qui marque le début du Moyen Âge !",
    isPivot: true,
  },
  {
    year: '500',
    label: 'De nombreux royaumes',
    period: 'Début du Moyen Âge',
    description:
      "En 500, la carte a totalement changé ! À la place d'un seul grand empire, on trouve plusieurs royaumes : Royaume des Francs, des Wisigoths, des Burgondes, des Ostrogoths, des Vandales… Seul l'Empire romain d'Orient reste debout (en rouge).",
  },
  {
    year: '1255',
    label: 'La Charte de Mahaut',
    period: 'Moyen Âge',
    description:
      "Près de 800 ans après 476, Mahaut fait écrire un document officiel sur parchemin avec des sceaux de cire pour vendre une part de son héritage.",
  },
  {
    year: '1492',
    label: 'Fin du Moyen Âge',
    period: 'Début des Temps modernes',
    description:
      'Le Moyen Âge dure environ 1 000 ans ! Il se termine en 1492 (arrivée de Christophe Colomb en Amérique), laissant place aux Temps modernes.',
  },
];

export const MAP_COMPARISON_POINTS = [
  {
    id: 'territoire',
    title: 'Un seul territoire ou plusieurs ?',
    before450:
      "En 450, l'Empire romain (en bleu) contrôle presque tout l'ouest de l'Europe et le contour de la Méditerranée.",
    after500:
      "En 500, le territoire s'est divisé comme un puzzle en de nombreux royaumes différents (Francs, Wisigoths, Burgondes, Ostrogoths…).",
  },
  {
    id: 'francs',
    title: 'La naissance du Royaume des Francs',
    before450:
      "En 450, la Gaule (notre future France) fait encore partie de l'Empire romain.",
    after500:
      'En 500, on voit apparaître au nord le Royaume des Francs : ce sont eux qui donneront plus tard le nom « France » !',
  },
  {
    id: 'orient',
    title: "Ce qui survit à l'est",
    before450:
      "L'Empire romain s'étend aussi loin vers l'est, autour de la Grèce et de l'Égypte.",
    after500:
      "L'Empire romain d'Orient (en rouge sur la carte de 500) continue d'exister encore longtemps, avec sa capitale Constantinople.",
  },
];

export const COMMARQUE_HOTSPOTS: ImageHotspot[] = [
  {
    id: 'donjon',
    number: 1,
    xPercent: 61,
    yPercent: 22,
    label: 'Le grand donjon',
    explanation:
      "C'est la plus haute tour du château. Depuis le sommet, les guetteurs surveillent toute la vallée pour repérer les ennemis de très loin.",
  },
  {
    id: 'murs',
    number: 2,
    xPercent: 45,
    yPercent: 60,
    label: 'Les murs épais en pierre',
    explanation:
      'Construits avec de gros blocs de pierre locale, ces murs solides empêchent les attaquants de détruire le château ou de le brûler.',
  },
  {
    id: 'ouvertures',
    number: 3,
    xPercent: 64,
    yPercent: 56,
    label: 'Des ouvertures hautes et étroites',
    explanation:
      "Les fenêtres sont placées en hauteur et restent petites pour que les ennemis ne puissent pas entrer facilement ni viser les habitants.",
  },
  {
    id: 'vestiges',
    number: 4,
    xPercent: 24,
    yPercent: 78,
    label: 'Des vestiges précieux',
    explanation:
      "Même sans toit, ces ruines (appelées « vestiges ») permettent aux historiens et archéologues de reconstituer la vie quotidienne des seigneurs et des habitants.",
  },
];

export const CHARTE_HOTSPOTS: ImageHotspot[] = [
  {
    id: 'parchemin',
    number: 1,
    xPercent: 52,
    yPercent: 32,
    label: 'Un parchemin très cher',
    explanation:
      "Au Moyen Âge, le papier est très rare en Europe. On écrit sur du parchemin, fabriqué avec de la peau d'animal (mouton ou veau) nettoyée et tendue. Cela coûte très cher !",
  },
  {
    id: 'ecriture',
    number: 2,
    xPercent: 26,
    yPercent: 52,
    label: 'Écrit à la main en latin ou français ancien',
    explanation:
      "Un scribe écrit soigneusement chaque ligne à la plume d'oie avec de l'encre noire. Il n'y a ni imprimante ni ordinateur !",
  },
  {
    id: 'sceaux',
    number: 3,
    xPercent: 39,
    yPercent: 86,
    label: 'Les trois sceaux de cire',
    explanation:
      "Regarde en bas : ces trois disques en cire attachés par des rubans servaient de « signature officielle ». Ils prouvent que l'accord est authentique.",
  },
  {
    id: 'archives',
    number: 4,
    xPercent: 61,
    yPercent: 18,
    label: "Conservé 770 ans aux archives !",
    explanation:
      "Ce vrai document date de mars 1255. Il est aujourd'hui conservé précieusement aux Archives départementales de l'Oise (référence G 7297).",
  },
];

export const CHARTER_CLUES: CharterClue[] = [
  {
    id: 'mahaut',
    excerpt: 'Moi, Mahaut, fille de feu Hugues le Sauvage, chevalier',
    plainMeaning:
      '« Je m’appelle Mahaut. Mon père, qui est décédé (« feu »), était un chevalier nommé Hugues le Sauvage. »',
    historianNote:
      'Cela montre aux historiens que Mahaut appartient à une famille riche et noble : seuls les riches pouvaient faire rédiger ce type de charte.',
  },
  {
    id: 'entendront',
    excerpt: 'qui verront et entendront [la lecture de] ces présentes lettres',
    plainMeaning:
      '« Pour toutes les personnes qui verront ce document ou qui écouteront quelqu’un le lire à voix haute. »',
    historianNote:
      "Pourquoi précise-t-on « entendront » ? Parce qu'au Moyen Âge, la majorité des gens ne savaient pas lire ! On lisait donc les actes importants à voix haute.",
  },
  {
    id: 'dime',
    excerpt:
      "j'ai vendu au doyen et au chapitre de l'église Saint-Thomas de Crépy le quart de la dîme d'Orrouy dont j'avais hérité",
    plainMeaning:
      "« J'ai vendu à l'église de Crépy ma part (un quart) d'un impôt appelé la dîme, collecté dans le village d'Orrouy, que j'avais reçu en héritage. »",
    historianNote:
      "Ce document révèle qui possédait les richesses et les droits sur les territoires, et montre l'importance de l'Église au Moyen Âge.",
  },
];

export const PHILIPPE_HOTSPOTS: ImageHotspot[] = [
  {
    id: 'duc',
    number: 1,
    xPercent: 68,
    yPercent: 45,
    label: 'Philippe le Bon sur son trône',
    explanation:
      'Vêtu de noir (une couleur de grand luxe à l’époque !), le duc de Bourgogne est un seigneur très riche et puissant. C’est lui qui a commandé et payé ce livre.',
  },
  {
    id: 'lecteur',
    number: 2,
    xPercent: 41,
    yPercent: 69,
    label: 'La lecture à voix haute',
    explanation:
      'Un lettré lit les « Chroniques de Hainaut » devant le duc et sa cour. Les livres étaient rares : une seule personne lisait pour tout le groupe.',
  },
  {
    id: 'livre',
    number: 3,
    xPercent: 47,
    yPercent: 64,
    label: 'Un manuscrit précieux et illustré',
    explanation:
      'Le gros livre posé sur le pupitre a été copié à la main et décoré de peintures dorées appelées enluminures.',
  },
  {
    id: 'cour',
    number: 4,
    xPercent: 85,
    yPercent: 56,
    label: 'Les nobles de la cour',
    explanation:
      'Autour du duc, les conseillers et seigneurs écoutent attentivement. Le livre raconte une histoire glorieuse pour flatter leur chef !',
  },
];

export const ABBEY_STEPS = [
  {
    step: 1,
    title: '1. La commande d’un riche seigneur',
    summary: 'Un roi, un duc ou un seigneur très riche paie pour faire écrire un livre ou une chronique.',
    detail:
      'Comme il finance le travail, il veut que le texte raconte ses victoires et le présente sous un beau jour. Il ne faut surtout pas le décevoir !',
  },
  {
    step: 2,
    title: '2. L’écriture par les moines à l’abbaye',
    summary: 'Dans les abbayes, les moines copistes savent lire et écrire.',
    detail:
      'Installés dans une salle calme (le scriptorium), ils recopient et décorent patiemment les textes à la main sur du parchemin.',
  },
  {
    step: 3,
    title: '3. La vérification par l’historien',
    summary: 'Aujourd’hui, l’historien lit le texte avec prudence, comme un détective.',
    detail:
      'Il se demande toujours : « Qui a écrit ce texte ? Qui a payé ? » Il compare les écrits avec d’autres textes et avec les vestiges archéologiques avant de conclure.',
  },
];

export const HISTORIAN_STATEMENTS: HistorianStatement[] = [
  {
    id: 'stmt-1',
    quote:
      '« Notre grand duc est le plus courageux du monde : à lui seul, il a fait fuir mille ennemis sans jamais avoir peur ! »',
    source: 'Chronique payée par le duc lui-même',
    verdict: 'prudence',
    explanation:
      'À prendre avec prudence ! L’auteur veut plaire au duc très riche qui l’a payé. Il exagère sûrement son courage pour ne pas le décevoir.',
  },
  {
    id: 'stmt-2',
    quote:
      '« En mars 1255, Mahaut a vendu sa part de la dîme d’Orrouy à l’église Saint-Thomas de Crépy. »',
    source: 'Acte officiel scellé (Charte de Mahaut)',
    verdict: 'fiable',
    explanation:
      'Information fiable ! C’est un contrat juridique daté, signé avec trois sceaux de cire, qui nous donne un fait précis sur qui possédait les terres.',
  },
  {
    id: 'stmt-3',
    quote:
      '« Tous les habitants du royaume étaient toujours heureux et n’ont jamais connu la moindre guerre sous ce roi. »',
    source: 'Livre offert au roi par son conseiller',
    verdict: 'prudence',
    explanation:
      'À vérifier ! On sait grâce aux vestiges de fortifications que le Moyen Âge connaissait de nombreux conflits. L’auteur cherche ici à flatter le roi.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    chapterId: 'empire',
    question:
      "Quelle date marque la disparition de l'Empire romain et le début du Moyen Âge ?",
    options: ['En 450', 'En 476', 'En 1255', 'En 1789'],
    correctIndex: 1,
    explanation:
      "C'est en 476 que l'Empire romain d'Occident disparaît. Pour les historiens, cette date marque le début du Moyen Âge.",
  },
  {
    id: 'q2',
    chapterId: 'empire',
    question:
      "Que remarque-t-on en comparant la carte de l'an 450 et celle de l'an 500 ?",
    options: [
      "L'Empire romain s'est agrandi partout en Europe",
      "L'Empire romain s'est divisé en plusieurs royaumes (Francs, Wisigoths, Burgondes…)",
      'La mer Méditerranée a disparu',
      'Il n’y avait plus aucun peuple en Europe',
    ],
    correctIndex: 1,
    explanation:
      "Entre 450 et 500, le grand Empire romain à l'ouest éclate comme un puzzle en plusieurs royaumes différents.",
  },
  {
    id: 'q3',
    chapterId: 'empire',
    question:
      'Sur la carte de l’an 500, quel royaume apparaît au nord de notre territoire et donnera plus tard son nom à la France ?',
    options: [
      'Le Royaume des Vandales',
      'Le Royaume des Suèves',
      'Le Royaume des Francs',
      'Le Royaume des Ostrogoths',
    ],
    correctIndex: 2,
    explanation:
      'Les Francs s’installent au nord de l’ancienne Gaule romaine : c’est leur nom qui donnera plus tard celui de la France !',
  },
  {
    id: 'q4',
    chapterId: 'empire',
    question:
      "Sur la carte de l'an 500, quelle partie de l'Empire romain existe toujours (colorée en rouge à l'est) ?",
    options: [
      "L'Empire romain d'Orient",
      "L'Empire des Vikings",
      "L'Empire romain du Nord",
      'Aucune partie ne survit',
    ],
    correctIndex: 0,
    explanation:
      "Seul l'Empire romain d'Occident disparaît en 476. À l'est, l'Empire romain d'Orient (en rouge sur la carte) continue d'exister autour de Constantinople.",
  },
  {
    id: 'q5',
    chapterId: 'empire',
    question:
      "À quelle grande période historique appartenait l'Empire romain juste avant 476 ?",
    options: [
      'La Préhistoire',
      'Les Temps modernes',
      "L'Antiquité",
      "L'époque contemporaine",
    ],
    correctIndex: 2,
    explanation:
      "En 450, juste avant la disparition de l'Empire romain en 476, on est encore dans l'Antiquité. Le Moyen Âge commence en 476 !",
  },
  {
    id: 'q6',
    chapterId: 'fortifications',
    question:
      'À quoi servent les vestiges (ruines, murs anciens, objets) pour les historiens ?',
    options: [
      'À reconstituer les modes de vie de l’époque',
      'À inventer des histoires imaginaires',
      'Ils ne servent à rien sans texte',
      'À prévoir la météo de demain',
    ],
    correctIndex: 0,
    explanation:
      "Comme l'indique ton cahier : « Les vestiges permettent aux historiens de reconstituer les modes de vie de l'époque. »",
  },
  {
    id: 'q7',
    chapterId: 'fortifications',
    question:
      'Pourquoi construisait-on des fortifications comme le château de Commarque au Moyen Âge ?',
    options: [
      'Pour accueillir uniquement des voyageurs',
      'Pour se protéger et protéger son territoire lors des nombreux conflits',
      'Pour cultiver des légumes sur le toit',
      'Pour ranger les livres des moines',
    ],
    correctIndex: 1,
    explanation:
      'Le Moyen Âge étant marqué par de nombreux conflits, on construit des fortifications solides pour se protéger et protéger son territoire.',
  },
  {
    id: 'q8',
    chapterId: 'fortifications',
    question:
      'Où se situe le château de Commarque photographié dans ton cahier ?',
    options: [
      'À Paris, en Île-de-France',
      'Aux Eyzies, en Dordogne',
      'À Marseille, au bord de la mer',
      'À Lille, dans le Nord',
    ],
    correctIndex: 1,
    explanation:
      'La légende de la photo du cahier précise bien : « Château de Commarque, Les Eyzies, Dordogne ».',
  },
  {
    id: 'q9',
    chapterId: 'fortifications',
    question:
      'Sur la photo du château de Commarque, à quoi sert le grand donjon (la plus haute tour) ?',
    options: [
      'À garer les charrettes des paysans',
      'À surveiller toute la vallée pour repérer les ennemis de très loin',
      'À traverser les douves remplies d’eau',
      'À faire sonner la récréation',
    ],
    correctIndex: 1,
    explanation:
      'Comme indiqué dans le chapitre 02, depuis le sommet du grand donjon, les guetteurs surveillent toute la vallée pour repérer les ennemis de très loin.',
  },
  {
    id: 'q10',
    chapterId: 'charte',
    question:
      'Au Moyen Âge, qui avait accès aux écrits selon la leçon de ton cahier ?',
    options: [
      'Tous les enfants dès l’âge de 6 ans',
      'Les écrits restent rares et réservés aux personnes riches',
      'Uniquement les voyageurs venus par bateau',
      'Personne ne savait écrire une seule lettre',
    ],
    correctIndex: 1,
    explanation:
      'Ton cahier explique : « Au Moyen Âge, les écrits restent rares et réservés aux personnes riches. »',
  },
  {
    id: 'q11',
    chapterId: 'charte',
    question:
      'Quelles informations importantes les écrits médiévaux apportent-ils aux historiens ?',
    options: [
      'Des informations sur les personnes qui possédaient les territoires et les dirigeaient',
      'Les résultats des tournois sportifs de tous les villages',
      'La liste de tous les animaux de la forêt',
      'Les recettes de cuisine de chaque paysan',
    ],
    correctIndex: 0,
    explanation:
      'Les écrits renseignent surtout sur les seigneurs, les nobles et l’Église : ceux qui possédaient les territoires et les dirigeaient.',
  },
  {
    id: 'q12',
    chapterId: 'charte',
    question:
      'Dans la Charte de Mahaut (mars 1255), pourquoi dit-on « qui verront et entendront ces présentes lettres » ?',
    options: [
      'Parce que le parchemin jouait de la musique',
      'Parce que la plupart des gens ne savaient pas lire et écoutaient la lecture à voix haute',
      'Parce que Mahaut parlait très fort',
      'Parce que le texte était écrit uniquement en chiffres',
    ],
    correctIndex: 1,
    explanation:
      'Comme très peu de personnes savaient lire au Moyen Âge, on lisait les documents officiels à voix haute pour que tout le monde puisse les entendre.',
  },
  {
    id: 'q13',
    chapterId: 'charte',
    question:
      'À quoi servaient les trois disques de cire accrochés en bas de la Charte de Mahaut ?',
    options: [
      'De simples décorations de Noël',
      'De pièces de monnaie collées sur la feuille',
      'De sceaux officiels servant de signature pour prouver que la vente est vraie',
      'De poids pour empêcher le vent de soulever le cahier',
    ],
    correctIndex: 2,
    explanation:
      'Les sceaux de cire attachés par des rubans servaient de signature officielle afin de garantir que la charte était authentique.',
  },
  {
    id: 'q14',
    chapterId: 'moines',
    question:
      'Qui écrivait et recopiait le plus souvent les textes au Moyen Âge ?',
    options: [
      'Les paysans après la récolte',
      'Les moines dans les abbayes',
      'Les soldats sur les remparts',
      'Les marchands sur les marchés',
    ],
    correctIndex: 1,
    explanation:
      'Ton cahier rappelle : « Les écrits du Moyen Âge sont souvent écrits par des moines dans les abbayes. »',
  },
  {
    id: 'q15',
    chapterId: 'moines',
    question:
      "Pourquoi les historiens doivent-ils veiller à ne pas tout croire dans les écrits du Moyen Âge ?",
    options: [
      'Parce que les textes étaient souvent commandés par des personnes très riches qu’il ne fallait pas décevoir',
      'Parce que les moines écrivaient exprès à l’envers',
      'Parce que l’encre s’effaçait au bout de deux jours',
      'Parce que les livres n’avaient jamais de titre',
    ],
    correctIndex: 0,
    explanation:
      'Exact ! Comme les riches seigneurs (comme le duc Philippe le Bon) payaient ces livres, les auteurs cherchaient à les flatter. L’historien garde toujours un esprit critique !',
  },
];
