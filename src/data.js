export const FREE_SHIPPING_AT = 300
export const SHIPPING_FLAT = 19

const money = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 })
export const fmt = (n) => `${money.format(n)} lei`

export const HERO_PHOTO = '1613375772563-af532af5cef9'
export const photoUrl = (id, w = 800, ratio = 1) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w / ratio)}&q=75`

export const SIZES = [
  { id: 's', label: 'Mică', detail: 'ghiveci de 10 cm' },
  { id: 'm', label: 'Medie', detail: 'ghiveci de 15 cm' },
  { id: 'l', label: 'Mare', detail: 'ghiveci de 25 cm' },
]

export const LIGHT = {
  low: {
    label: 'Lumină slabă',
    short: 'Slabă',
    where: 'Ferestre spre nord, holuri, băi și locuri aflate la câțiva metri de fereastră.',
    note: 'Aceste plante tolerează colțurile întunecate și cresc lent, dar constant.',
  },
  medium: {
    label: 'Lumină medie',
    short: 'Medie',
    where: 'Ferestre spre est sau o cameră luminoasă în care soarele nu atinge direct frunzele.',
    note: 'Locul ideal pentru majoritatea plantelor de apartament: lumină blândă și constantă toată ziua.',
  },
  bright: {
    label: 'Lumină intensă',
    short: 'Intensă',
    where: 'Ferestre spre sud sau vest, cu câteva ore de soare direct.',
    note: 'Plante iubitoare de soare. Cresc mai repede, au culori mai vii și rădăcini mai însetate.',
  },
}

export const PRODUCTS = [
  {
    id: 'monstera',
    name: 'Monstera',
    latin: 'Monstera deliciosa',
    photo: '1653404809389-f370ea4310dd',
    alt: 'Monstera cu frunze mari într-un ghiveci de teracotă',
    blurb: 'Vedeta plantelor de interior. Frunze mari și lucioase care se despică și devin tot mai spectaculoase pe măsură ce cresc.',
    prices: [89, 149, 279],
    light: 'medium', water: 2, care: 1, petSafe: false,
    hue: '#2e9d62', badge: 'Bestseller',
  },
  {
    id: 'snake',
    name: 'Limba soacrei',
    latin: 'Dracaena trifasciata',
    photo: '1687552212914-03a30c82053c',
    alt: 'Limba soacrei într-un ghiveci de teracotă',
    blurb: 'Dreaptă, sculpturală și aproape imposibil de omorât. Se descurcă bine chiar dacă o uiți săptămâni întregi.',
    prices: [79, 129, 239],
    light: 'low', water: 1, care: 1, petSafe: false,
    hue: '#8fb347', badge: 'Ușor de îngrijit',
  },
  {
    id: 'fiddle',
    name: 'Ficus lyrata',
    latin: 'Ficus lyrata',
    photo: '1545239705-1564e58b9e4a',
    alt: 'Ficus lyrata într-un ghiveci alb',
    blurb: 'Un copăcel spectaculos, cu frunze mari în formă de vioară. Iubește lumina intensă și un program constant.',
    prices: [119, 209, 389],
    light: 'bright', water: 2, care: 3, petSafe: false,
    hue: '#6aa84f',
  },
  {
    id: 'pothos',
    name: 'Potos auriu',
    latin: 'Epipremnum aureum',
    photo: '1596724878582-76f1a8fdc24f',
    alt: 'Potos auriu cu frunze variegate într-un ghiveci verde',
    blurb: 'Curgător, cu frunze în formă de inimă și foarte îngăduitor. Agață-l, pune-l pe raft sau lasă-l să se cațere.',
    prices: [59, 99, 189],
    light: 'low', water: 2, care: 1, petSafe: false,
    hue: '#b5cf3c', badge: 'Ușor de îngrijit',
  },
  {
    id: 'echeveria',
    name: 'Echeveria',
    latin: 'Echeveria elegans',
    photo: '1724148893915-c3e5370067d5',
    alt: 'Rozetă de echeveria în nuanțe de albastru-verzui',
    blurb: 'O rozetă îngrijită, în verde-albăstrui prăfuit, cu margini roz. Sigură pentru pisici și câini.',
    prices: [49, 79, 149],
    light: 'bright', water: 1, care: 2, petSafe: true,
    hue: '#58a79c', badge: 'Nou',
  },
  {
    id: 'zz',
    name: 'Planta ZZ',
    latin: 'Zamioculcas zamiifolia',
    photo: '1632207691143-643e2a9a9361',
    alt: 'Planta ZZ într-un ghiveci alb',
    blurb: 'Frunze cerate, verde închis, care arată lustruit tot anul. Prosperă chiar și când e neglijată.',
    prices: [85, 145, 265],
    light: 'low', water: 1, care: 1, petSafe: false,
    hue: '#3a9a5b',
  },
  {
    id: 'peace',
    name: 'Crinul păcii',
    latin: 'Spathiphyllum',
    photo: '1620311497344-bce841c9c060',
    alt: 'Crinul păcii într-un ghiveci alb',
    blurb: 'Flori albe elegante deasupra unor frunze închise și lucioase. Se lasă când îi e sete, apoi se îndreaptă imediat.',
    prices: [79, 139, 249],
    light: 'low', water: 3, care: 2, petSafe: false,
    hue: '#76a8c7',
  },
  {
    id: 'rubber',
    name: 'Planta de cauciuc',
    latin: 'Ficus elastica',
    photo: '1669392597221-bbfd4b6e13ff',
    alt: 'Planta de cauciuc înaltă într-un ghiveci alb',
    blurb: 'Frunze groase, cu o nuanță vișinie, pe o tulpină dreaptă. Rezistentă, înaltă și discret elegantă.',
    prices: [99, 169, 319],
    light: 'medium', water: 2, care: 1, petSafe: false,
    hue: '#a05a6c', badge: 'Alegerea noastră',
  },
  {
    id: 'fern',
    name: 'Ferigă Boston',
    latin: 'Nephrolepis exaltata',
    photo: '1610491536492-cee9f12c860f',
    alt: 'Frunze de ferigă Boston, verde aprins',
    blurb: 'Un nor de frunze moi, arcuite. Iubește umiditatea și este sigură pentru animale.',
    prices: [69, 125, 225],
    light: 'medium', water: 3, care: 2, petSafe: true,
    hue: '#5cb85c',
  },
  {
    id: 'aloe',
    name: 'Aloe vera',
    latin: 'Aloe barbadensis',
    photo: '1669655547035-753fe19deaac',
    alt: 'Aloe vera într-un ghiveci negru',
    blurb: 'Frunze cărnoase și țepoase, care păstrează apă săptămâni la rând. Un clasic pentru fereastra însorită.',
    prices: [55, 95, 175],
    light: 'bright', water: 1, care: 1, petSafe: false,
    hue: '#7fb98c',
  },
  {
    id: 'palm',
    name: 'Palmier de salon',
    latin: 'Chamaedorea elegans',
    photo: '1687269111857-3b398711c2f4',
    alt: 'Palmier de salon într-un ghiveci alb',
    blurb: 'Frunze ca niște pene și o atmosferă tropicală relaxată. Compact, cu creștere lentă și sigur pentru animale.',
    prices: [79, 139, 259],
    light: 'low', water: 2, care: 1, petSafe: true,
    hue: '#4fae7c', badge: 'Nou',
  },
  {
    id: 'spider',
    name: 'Planta păianjen',
    latin: 'Chlorophytum comosum',
    photo: '1642764264024-c57055fb0bb3',
    alt: 'Planta păianjen cu frunze vărgate într-un ghiveci gri',
    blurb: 'Fântâni de frunze vărgate, din care apar plantițe mici. Veselă, rapidă și sigură pentru animale.',
    prices: [55, 95, 179],
    light: 'medium', water: 2, care: 1, petSafe: true,
    hue: '#9ccc5a',
  },
]

export const REVIEWS = [
  { name: 'Maia R.', plant: 'Monstera', text: 'A ajuns și mai frumoasă decât în poze, fără nicio frunză îndoită. Are deja două frunze noi.' },
  { name: 'Ionuț K.', plant: 'Limba soacrei', text: 'Apartamentul meu primește aproape deloc lumină, iar planta asta înflorește. Și ambalajul a fost impresionant.' },
  { name: 'Priya S.', plant: 'Ferigă Boston', text: 'Filtrul pentru animale mi-a salvat viața. Pisica a mestecat-o de două ori și suntem bine amândouă.' },
  { name: 'Teo M.', plant: 'Planta de cauciuc', text: 'Fișa de îngrijire mi-a spus exact când să o ud. Prima plantă pe care o țin în viață mai mult de o lună.' },
  { name: 'Ana L.', plant: 'Echeveria', text: 'Mică, perfectă și foarte drăguță pe birou. Am ales ghiveciul crem și se potrivește cu totul.' },
  { name: 'Sami D.', plant: 'Potos auriu', text: 'Livrare rapidă, iar planta și-a revenit într-o zi. Deja planific următoarea comandă.' },
]

export const FAQS = [
  {
    q: 'Cum sunt ambalate plantele pentru livrare?',
    a: 'Fiecare plantă este înfășurată în hârtie reciclată și așezată într-o cutie din carton reciclat, cu ghiveciul fixat astfel încât pământul să rămână pe loc. Nimic din cutie nu este de unică folosință din plastic.',
  },
  {
    q: 'Ce fac dacă planta ajunge deteriorată sau suferindă?',
    a: 'Spune-ne în 30 de zile și îți trimitem o plantă nouă sau îți returnăm banii. Nu trebuie să ne trimiți planta înapoi.',
  },
  {
    q: 'Cât costă livrarea?',
    a: 'Livrarea este gratuită la comenzile de peste 300 lei. Sub această sumă costă 19 lei per comandă, indiferent câte plante cumperi.',
  },
  {
    q: 'Care plante sunt sigure pentru pisici și câini?',
    a: 'Activează filtrul „Doar pentru animale” în magazin ca să vezi doar plantele netoxice. Multe plante de apartament sunt toxice dacă sunt mestecate, așa că merită mereu verificate.',
  },
]
