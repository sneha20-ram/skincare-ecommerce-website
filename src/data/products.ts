export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  skinType?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Cleansers' | 'Essences & Serums' | 'Moisturizers' | 'Treatments & Oils' | 'Sun Protection';
  price: number;
  volume: string;
  rating: number;
  reviewCount: number;
  image: string;
  concerns: string[];
  skinTypes: string[];
  keyActives: string[];
  tag?: string;
  description: string;
  ritual: {
    step: string;
    am: boolean;
    pm: boolean;
    instructions: string;
  };
  clinicalProof: string;
  fullIngredients: string[];
  reviews: Review[];
}

export interface Ingredient {
  id: string;
  name: string;
  botanicalName: string;
  origin: string;
  category: 'Lipid & Barrier' | 'Antioxidant & Brightening' | 'Hydrator & Humectant' | 'Soothing & Adaptogen' | 'Gentle Exfoliant';
  description: string;
  benefits: string[];
  clinicalHighlight: string;
  usedInProductIds: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'barrier-restore-serum',
    name: 'Barrier Restore Squalane & Ceramide Serum',
    subtitle: 'Cellular Lipid Replenishment & Deep Moisture Fortification',
    category: 'Essences & Serums',
    price: 68,
    volume: '30 ml / 1.0 fl oz',
    rating: 4.9,
    reviewCount: 128,
    image: '/src/assets/images/product_barrier_serum_1791181758066.jpg',
    concerns: ['Barrier Repair', 'Dehydration', 'Redness', 'Fine Lines'],
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Compromised'],
    keyActives: ['3% Bio-Identical Ceramide Complex', '100% Olive Squalane', 'Tremella Fuciformis'],
    tag: 'Best Seller',
    description: 'A concentrated milky serum engineered to rebuild the skin’s lipid bilayer. Formulated with five bio-identical ceramides, biomimetic cholesterol, and ultra-hydrating snow mushroom extract to seal micro-tears and cushion stressed skin.',
    ritual: {
      step: 'Step 2 · Treat',
      am: true,
      pm: true,
      instructions: 'Dispense 3–4 drops onto freshly cleansed, slightly damp skin. Press gently into the face, neck, and décolletage using upward motions before your moisturizer.',
    },
    clinicalProof: '94% of participants demonstrated measured barrier lipid replenishment within 14 days of twice-daily use (in a 4-week clinical study of 34 subjects).',
    fullIngredients: [
      'Camellia Sinensis Leaf Water',
      'Squalane (Plant-Derived)',
      'Ceramide NP',
      'Ceramide AP',
      'Ceramide EOP',
      'Phytosphingosine',
      'Cholesterol',
      'Tremella Fuciformis (Mushroom) Extract',
      'Glycerin',
      'Sodium Hyaluronate',
      'Panthenol (Pro-Vitamin B5)',
      'Tocopherol (Vitamin E)',
      'Xanthan Gum',
      'Ethylhexylglycerin'
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena R.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Healed my damaged skin barrier in days',
        comment: 'After overusing harsh chemical peels my face was stinging from plain water. This serum calmed the heat and tightness in 48 hours. The texture is lightweight yet deeply nourishing.',
        verified: true,
        skinType: 'Sensitive & Dehydrated'
      },
      {
        id: 'rev-2',
        author: 'Marcus K.',
        rating: 5,
        date: '1 month ago',
        title: 'Unmatched luxury texture',
        comment: 'Absorbs completely with zero sticky residue. Makeup applies flawlessly over it. Truly an essential formulation in dry mountain climates.',
        verified: true,
        skinType: 'Dry & Reactive'
      },
      {
        id: 'rev-3',
        author: 'Claire V.',
        rating: 5,
        date: '1 month ago',
        title: 'My dermatologist approved it',
        comment: 'Clean INCI list with no fragrance or essential oils. Has kept my eczema flare-ups at zero all through winter.',
        verified: true,
        skinType: 'Eczema-Prone'
      }
    ]
  },
  {
    id: 'bio-cellular-moisture-cream',
    name: 'Bio-Cellular Velvet Moisture Barrier Cream',
    subtitle: 'Lipid-Cushioning Emulsion with Fermented Centella & Ectoin',
    category: 'Moisturizers',
    price: 76,
    volume: '50 ml / 1.7 oz',
    rating: 4.9,
    reviewCount: 215,
    image: '/src/assets/images/product_hydrating_cream_1791181770126.jpg',
    concerns: ['Dryness', 'Barrier Recovery', 'Environmental Stress', 'Loss of Elasticity'],
    skinTypes: ['All Skin Types', 'Dry', 'Sensitive', 'Mature'],
    keyActives: ['Fermented Centella Asiatica', 'Wild Murumuru Butter', 'Ectoin 2%'],
    tag: 'Award Winner',
    description: 'A whipped, cashmere-textured barrier cream combining extremolyte Ectoin with wild Amazonian murumuru butter. Creates an imperceptible breathable shield against transepidermal water loss and pollution particles.',
    ritual: {
      step: 'Step 3 · Nourish & Seal',
      am: true,
      pm: true,
      instructions: 'Warm a pearl-sized amount between fingertips to activate the botanical lipids. Smooth across face and neck in sweeping outward motions.',
    },
    clinicalProof: '+86% immediate epidermal moisture boost, with 48-hour continuous hydration measured via corneal conductance test.',
    fullIngredients: [
      'Aqua (Purified Glacial Spring)',
      'Astrocaryum Murumuru Seed Butter',
      'Caprylic/Capric Triglyceride',
      'Centella Asiatica Leaf Extract',
      'Ectoin',
      'Cetearyl Olivate',
      'Sorbitan Olivate',
      'Limnanthes Alba (Meadowfoam) Seed Oil',
      'Niacinamide (Vitamin B3)',
      'Beta-Glucan',
      'Allantoin',
      'Bisabolol',
      'Rosmarinus Officinalis Leaf Extract'
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Sophia L.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Skin feels like silk',
        comment: 'This is the Holy Grail moisturizer. Rich enough for winter nights yet absorbs cleanly enough for morning under SPF. Love the sustainable glass jar.',
        verified: true,
        skinType: 'Combination / Normal'
      },
      {
        id: 'rev-5',
        author: 'Julian D.',
        rating: 5,
        date: '2 months ago',
        title: 'Worth every single penny',
        comment: 'Calmed redness along my cheekbones in two applications. The texture is sublime.',
        verified: true,
        skinType: 'Sensitive'
      }
    ]
  },
  {
    id: 'phyto-purifying-cleanser',
    name: 'Gentle Phyto-Purifying Clarifying Cleanser',
    subtitle: 'Saponin-Rich Botanical Milk with Camellia Seed & Bisabolol',
    category: 'Cleansers',
    price: 44,
    volume: '150 ml / 5.1 fl oz',
    rating: 4.8,
    reviewCount: 94,
    image: '/src/assets/images/product_botanical_cleanser_1791181781434.jpg',
    concerns: ['Congestion', 'Excess Sebum', 'Sensitivity', 'Dullness'],
    skinTypes: ['All Skin Types', 'Sensitive', 'Combination', 'Oily'],
    keyActives: ['Cold-Pressed Camellia Seed', 'Yucca Root Saponins', 'German Chamomile Bisabolol'],
    tag: 'Daily Ritual',
    description: 'A sulfate-free conditioning gel-to-milk cleanser that lifts sunscreen, airborne particulates, and sebum while preserving the acid mantle. Rinses pristine without tautness or residue.',
    ritual: {
      step: 'Step 1 · Cleanse',
      am: true,
      pm: true,
      instructions: 'Massage 1–2 pumps onto dry or damp skin for 60 seconds, allowing botanical oils to melt impurities. Emulsify with warm water and rinse thoroughly.',
    },
    clinicalProof: '98% of subjects reported clean, supple skin with zero stripping or post-wash tightness.',
    fullIngredients: [
      'Camellia Oleifera Seed Oil',
      'Glycerin',
      'Yucca Glauca Root Extract',
      'Decyl Glucoside',
      'Polyglyceryl-10 Laurate',
      'Bisabolol',
      'Calendula Officinalis Flower Extract',
      'Avena Sativa (Oat) Kernel Oil',
      'Citric Acid',
      'Leuconostoc/Radish Root Ferment Filtrate'
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Ananya S.',
        rating: 5,
        date: '3 weeks ago',
        title: 'No more tight squeaky feeling',
        comment: 'Finally a cleanser that removes waterproof sunscreen without stripping my skin raw. Smells softly of fresh botanicals without any synthetic perfume.',
        verified: true,
        skinType: 'Dry / Sensitive'
      }
    ]
  },
  {
    id: 'phyto-glow-treatment-oil',
    name: 'Kakadu Plum & Astaxanthin Phyto-Glow Treatment Oil',
    subtitle: 'Supercritical Botanical Lipid Infusion for Cellular Radiance',
    category: 'Treatments & Oils',
    price: 72,
    volume: '30 ml / 1.0 fl oz',
    rating: 4.8,
    reviewCount: 86,
    image: '/src/assets/images/product_barrier_serum_1791181758066.jpg',
    concerns: ['Hyperpigmentation', 'Uneven Tone', 'Dullness', 'Loss of Firmness'],
    skinTypes: ['Normal', 'Dry', 'Mature', 'Combination'],
    keyActives: ['Supercritical Kakadu Plum (Active Vitamin C)', 'Microalgae Astaxanthin', 'Organic Rosehip Fruit Oil'],
    tag: 'Glow Catalyst',
    description: 'A vibrant ruby-gold face oil packed with wild-harvested Australian Kakadu Plum (nature’s highest known Vitamin C source) and marine astaxanthin. Neutralizes free radicals and restores radiant clarity.',
    ritual: {
      step: 'Step 4 · Botanical Glow',
      am: true,
      pm: true,
      instructions: 'Press 2–3 drops into face as the final step of your nighttime routine, or mix one drop into your moisturizer for a dewy daytime glow.',
    },
    clinicalProof: '+38% improvement in perceived skin luminosity and tone evenness within 21 days.',
    fullIngredients: [
      'Rosa Canina (Rosehip) Seed Oil',
      'Terminalia Ferdinandiana (Kakadu Plum) Seed Extract',
      'Haematococcus Pluvialis (Astaxanthin) Extract',
      'Simmondsia Chinensis (Jojoba) Seed Oil',
      'Bakuchiol',
      'Helianthus Annuus Seed Oil',
      'Tetrahexyldecyl Ascorbate',
      'Rosmarinus Officinalis Extract'
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Hannah M.',
        rating: 5,
        date: '1 month ago',
        title: 'Golden hour in a bottle',
        comment: 'Gives the most natural, healthy sheen without looking greasy. My dark spots from old blemishes have faded noticeably.',
        verified: true,
        skinType: 'Normal / Hyperpigmentation'
      }
    ]
  },
  {
    id: 'calming-hydrating-essence',
    name: 'Tremella & Centella Calming Hydrating Essence',
    subtitle: 'Fermented Micro-Water for Cellular Quenching & Redness Relief',
    category: 'Essences & Serums',
    price: 52,
    volume: '120 ml / 4.0 fl oz',
    rating: 4.9,
    reviewCount: 110,
    image: '/src/assets/images/botanical_ingredients_still_1791181791874.jpg',
    concerns: ['Redness', 'Dehydration', 'Sensitized Skin', 'Irritation'],
    skinTypes: ['Sensitive', 'Reactive', 'Dehydrated', 'All'],
    keyActives: ['90% Fermented Centella Water', 'Dual-Weight Snow Mushroom', 'Panthenol B5 5%'],
    tag: 'Skin Quencher',
    description: 'A splash of bio-fermented calming water that floods micro-capillaries with hydration. Cools on contact, diminishes flushing, and preps the stratum corneum for deeper serum absorption.',
    ritual: {
      step: 'Step 1.5 · Hydrate & Balance',
      am: true,
      pm: true,
      instructions: 'Pour a nickel-sized amount into palms and gently pat into skin until absorbed. Layer 2–3 times during dry or winter conditions.',
    },
    clinicalProof: 'Measured 42% reduction in visible skin redness (erythema) within 30 minutes of application.',
    fullIngredients: [
      'Centella Asiatica Leaf Water (Bio-Fermented)',
      'Tremella Fuciformis Sporocarp Extract',
      'Panthenol',
      'Glycerin',
      'Betaine',
      'Madecassoside',
      'Asiaticoside',
      'Sodium Hyaluronate',
      '1,2-Hexanediol',
      'Allantoin'
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'David P.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Total game changer for post-shave irritation',
        comment: 'Zero sting, instantaneous soothing. Skin feels plump and calm immediately.',
        verified: true,
        skinType: 'Sensitive'
      }
    ]
  },
  {
    id: 'mineral-shield-spf50',
    name: 'Mineral Shield Physical Fluid SPF 50+ PA++++',
    subtitle: 'Weightless Non-Nano Zinc Oxide with Ectoin & Butterfly Bush',
    category: 'Sun Protection',
    price: 48,
    volume: '50 ml / 1.7 fl oz',
    rating: 4.9,
    reviewCount: 167,
    image: '/src/assets/images/product_botanical_cleanser_1791181781434.jpg',
    concerns: ['UV Protection', 'Photoaging', 'Blue Light', 'Pollution'],
    skinTypes: ['All Skin Types', 'Sensitive', 'Acne-Prone'],
    keyActives: ['Non-Nano Zinc Oxide 18.2%', 'Ectoin 1.5%', 'Buddleja Davidii (Butterfly Bush)'],
    tag: 'Daily Shield',
    description: 'An ultra-sheer, fluid physical sunscreen that melts invisibly into all skin tones. Delivers broad-spectrum SPF 50+ UVA/UVB defense plus cellular protection against HEV blue light and infrared radiation.',
    ritual: {
      step: 'Step 4 · Defend',
      am: true,
      pm: false,
      instructions: 'Shake well before use. Apply two finger lengths generously across face, neck, and ears as the last step in your morning ritual, 15 minutes before sun exposure.',
    },
    clinicalProof: '100% mineral physical defense with zero white residue certified on Fitzpatrick phototypes I through VI.',
    fullIngredients: [
      'Zinc Oxide (Non-Nano 18.2%)',
      'Aqua',
      'Isododecane',
      'Caprylic/Capric Triglyceride',
      'Butyloctyl Salicylate',
      'Propanediol',
      'Ectoin',
      'Buddleja Davidii Extract',
      'Silica',
      'Polyglyceryl-4 Diisostearate',
      'Iron Oxides (CI 77492, CI 77491)'
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Zara T.',
        rating: 5,
        date: '1 week ago',
        title: 'Truly zero white cast on deep skin',
        comment: 'I have deep brown skin and mineral SPFs always make me look purple or ghostly. This completely disappears and leaves a soft satin finish. Best mineral SPF on the market.',
        verified: true,
        skinType: 'Combination'
      }
    ]
  },
  {
    id: 'resurfacing-lactic-pha-elixir',
    name: 'Resurfacing Botanical Lactic & PHA Renewal Elixir',
    subtitle: 'Gentle Multi-Acid Refining Treatment with Blue Tansy',
    category: 'Treatments & Oils',
    price: 64,
    volume: '30 ml / 1.0 fl oz',
    rating: 4.7,
    reviewCount: 79,
    image: '/src/assets/images/product_barrier_serum_1791181758066.jpg',
    concerns: ['Uneven Texture', 'Clogged Pores', 'Dullness', 'Flaking'],
    skinTypes: ['Normal', 'Combination', 'Oily', 'Sensitive'],
    keyActives: ['8% Plant-Derived Lactic Acid', '2% Gluconolactone (PHA)', 'Moroccan Blue Tansy'],
    tag: 'Gentle Resurfacing',
    description: 'A non-abrasive chemical exfoliant formulated with large-molecule PHA and plant lactic acid. Dissolves dead surface cohesion without disrupting deeper barrier integrity, buffered by soothing blue tansy.',
    ritual: {
      step: 'Step 2 · Nightly Renewal',
      am: false,
      pm: true,
      instructions: 'Smooth 3 drops onto clean skin at night 2–3 times weekly. Follow with Bio-Cellular Velvet Moisture Cream. Always wear SPF the next morning.',
    },
    clinicalProof: '91% of testers reported visibly refined skin texture and smaller pore appearance without stinging or flaking.',
    fullIngredients: [
      'Aloe Barbadensis Leaf Juice',
      'Lactic Acid (Fermented Vegan)',
      'Gluconolactone (PHA)',
      'Tanacetum Annuum (Blue Tansy) Flower Oil',
      'Salix Alba (Willow) Bark Extract',
      'Sodium Hydroxide',
      'Glycerin',
      'Hyaluronic Acid',
      'Sodium Benzoate'
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Chloe B.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Smooth glass skin without the burn',
        comment: 'Glycolic acid always broke out my sensitive skin. This PHA and lactic formula gave me smooth radiant skin overnight without redness.',
        verified: true,
        skinType: 'Sensitive / Textured'
      }
    ]
  },
  {
    id: 'overnight-lipid-recovery-balm',
    name: 'Overnight Bio-Lipid Recovery Balm',
    subtitle: 'Intensive Stratum Corneum Salve with Phytosterols & Colloidal Oat',
    category: 'Moisturizers',
    price: 82,
    volume: '50 ml / 1.7 oz',
    rating: 5.0,
    reviewCount: 63,
    image: '/src/assets/images/product_hydrating_cream_1791181770126.jpg',
    concerns: ['Severe Dryness', 'Compromised Barrier', 'Flaking', 'Post-Procedure'],
    skinTypes: ['Very Dry', 'Sensitized', 'Mature'],
    keyActives: ['Biomimetic Phytosterol Complex', 'Ceramide Complex 1/3/6-II', 'Hydrolyzed Colloidal Oat'],
    tag: 'Intensive Repair',
    description: 'An emergency rescue treatment designed for severely compromised, chapped, or sensitized skin. Melts from a rich whipped salve into a nourishing lipid cocoon.',
    ritual: {
      step: 'Step 3 · Intensive Recovery',
      am: false,
      pm: true,
      instructions: 'Warm a pea-sized amount between clean palms and press firmly over sensitive or dehydrated zones as the final occlusive layer.',
    },
    clinicalProof: 'Clinically proven 100% recovery of baseline stratum corneum integrity within 72 hours post-irritation challenge.',
    fullIngredients: [
      'Butyrospermum Parkii (Shea) Butter',
      'Phytosterols',
      'Ceramide NP',
      'Ceramide AP',
      'Ceramide EOP',
      'Colloidal Oatmeal',
      'Simmondsia Chinensis Seed Oil',
      'Bisabolol',
      'Tocopheryl Acetate'
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Rachel W.',
        rating: 5,
        date: '2 weeks ago',
        title: 'The only thing that saved my skin after retinol burn',
        comment: 'My face was peeling and red. Put this on overnight and woke up to soft, calm skin. A permanent staple in my cabinet.',
        verified: true,
        skinType: 'Dry & Reactive'
      }
    ]
  }
];

export const INGREDIENT_GLOSSARY: Ingredient[] = [
  {
    id: 'bio-ceramides',
    name: 'Bio-Identical Ceramide Complex',
    botanicalName: 'Sphingolipids & Phytosphingosine',
    origin: 'Biotechnological yeast fermentation',
    category: 'Lipid & Barrier',
    description: 'Ceramides make up over 50% of the skin’s natural lipid matrix. Our bio-identical complex mimics the natural ratio of Ceramide NP, AP, and EOP to seal intercellular gaps.',
    benefits: ['Repairs damaged stratum corneum', 'Prevents transepidermal water loss', 'Reinforces natural resilience against pollutants'],
    clinicalHighlight: 'Restores skin barrier matrix by 94% within 14 days',
    usedInProductIds: ['barrier-restore-serum', 'bio-cellular-moisture-cream', 'overnight-lipid-recovery-balm']
  },
  {
    id: 'tremella-mushroom',
    name: 'Tremella Fuciformis (Snow Mushroom)',
    botanicalName: 'Tremella Fuciformis Sporocarp',
    origin: 'Wild harvested organic highland mycelium',
    category: 'Hydrator & Humectant',
    description: 'Known as the botanical queen of hydration, Tremella holds up to 500 times its weight in water with particles smaller than hyaluronic acid, allowing deeper penetration.',
    benefits: ['Deep cellular plumping', 'Immediate moisture binding', 'Antioxidant skin smoothing'],
    clinicalHighlight: 'Outperforms standard high-molecular hyaluronic acid in long-term moisture retention by 28%',
    usedInProductIds: ['barrier-restore-serum', 'calming-hydrating-essence']
  },
  {
    id: 'centella-asiatica',
    name: 'Fermented Centella Asiatica',
    botanicalName: 'Centella Asiatica / Gotu Kola',
    origin: 'Cold-fermented organic herb leaves',
    category: 'Soothing & Adaptogen',
    description: 'A legendary medicinal herb rich in triterpenoids (Madecassoside and Asiaticoside) that stimulate collagen synthesis and swiftly extinguish cutaneous inflammation.',
    benefits: ['Calms visible flushing & redness', 'Accelerates wound and micro-tear repair', 'Soothes reactive sensitivity'],
    clinicalHighlight: 'Reduces cutaneous erythema and inflammatory markers by 42%',
    usedInProductIds: ['bio-cellular-moisture-cream', 'calming-hydrating-essence']
  },
  {
    id: 'kakadu-plum',
    name: 'Supercritical Kakadu Plum',
    botanicalName: 'Terminalia Ferdinandiana',
    origin: 'Indigenous wild harvest, Northern Territory Australia',
    category: 'Antioxidant & Brightening',
    description: 'The world’s richest natural botanical source of stable Vitamin C—up to 100 times more concentrated than an orange. Extracted via clean supercritical CO2.',
    benefits: ['Neutralizes oxidative free radicals', 'Visibly diminishes post-inflammatory dark spots', 'Stimulates pro-collagen fibers'],
    clinicalHighlight: 'Demonstrates 3.8x higher radical scavenging capacity than synthetic L-Ascorbic acid',
    usedInProductIds: ['phyto-glow-treatment-oil']
  },
  {
    id: 'olive-squalane',
    name: 'Plant Squalane',
    botanicalName: 'Olea Europaea Squalane',
    origin: 'Mediterranean cold-pressed olive fruit',
    category: 'Lipid & Barrier',
    description: 'Biomimetic to natural human sebum, squalane sinks in effortlessly without clogging pores, imparting silky suppleness and locking active moisture into deeper layers.',
    benefits: ['Non-comedogenic weightless hydration', 'Softens texture & fine dry lines', 'Enhances active penetration'],
    clinicalHighlight: 'Zero pore blockage index; 100% biocompatible lipid carrier',
    usedInProductIds: ['barrier-restore-serum', 'bio-cellular-moisture-cream']
  },
  {
    id: 'ectoin',
    name: 'Natural Ectoin Extremolyte',
    botanicalName: 'Ectoin Amino Derivative',
    origin: 'Salt lake halophilic extremophiles',
    category: 'Lipid & Barrier',
    description: 'A natural extremolyte synthesized by microorganisms in salt deserts to survive extreme UV, drought, and heat. Forms a protective hydro-complex around cellular membranes.',
    benefits: ['Pollution & blue-light environmental shielding', 'Prevents cellular stress from UV', 'Long-lasting cellular hydration'],
    clinicalHighlight: 'Shields cellular membrane protein structures against heat shock & particulate stress',
    usedInProductIds: ['bio-cellular-moisture-cream', 'mineral-shield-spf50']
  },
  {
    id: 'blue-tansy',
    name: 'Moroccan Blue Tansy',
    botanicalName: 'Tanacetum Annuum',
    origin: 'Organic valleys of Morocco',
    category: 'Soothing & Adaptogen',
    description: 'Distilled to produce deep indigo chamazulene, renowned for its intense anti-inflammatory properties, clarifying congested pores, and calming aggravated skin.',
    benefits: ['Soothes irritated and breakout-prone skin', 'Refines congested textures', 'Natural herbaceous calming aromatherapeutic scent'],
    clinicalHighlight: 'Rich in chamazulene which inhibits histamine and pro-inflammatory cytokine pathways',
    usedInProductIds: ['resurfacing-lactic-pha-elixir']
  }
];

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
}

export const SKIN_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'skinType',
    question: 'How does your skin feel midday after your morning wash?',
    description: 'Helps us diagnose your natural sebum and lipid baseline.',
    options: [
      { label: 'Tight & Dehydrated', description: 'Feels taut, rough, or dull with occasional flaking', value: 'Dry' },
      { label: 'Shiny in T-Zone', description: 'Forehead and nose become oily, while cheeks remain normal or dry', value: 'Combination' },
      { label: 'Easily Flushed & Reactive', description: 'Stings easily, turns red with changes in temperature or ingredients', value: 'Sensitive' },
      { label: 'Balanced & Comfortable', description: 'Neither excessively dry nor oily throughout the day', value: 'Normal' }
    ]
  },
  {
    id: 'primaryConcern',
    question: 'What is your primary skin focus right now?',
    description: 'We will target the highest potency clinical botanical active to your key goal.',
    options: [
      { label: 'Barrier Repair & Hydration', description: 'Heal redness, rebuild protective lipids, quench deep thirst', value: 'Barrier Repair' },
      { label: 'Luminosity & Uneven Tone', description: 'Fade sun spots, post-blemish marks, and restore radiance', value: 'Luminosity' },
      { label: 'Smoothing Texture & Clogged Pores', description: 'Clear congestion, soften micro-bumps, gentle renewal', value: 'Texture' },
      { label: 'Daily Environmental Defense', description: 'Preserve firmness, protect against UV & blue light damage', value: 'Protection' }
    ]
  },
  {
    id: 'sensitivityLevel',
    question: 'How does your skin react to new active ingredients or weather changes?',
    description: 'Ensures we calibrate formula strengths to your barrier resilience.',
    options: [
      { label: 'Highly Sensitive', description: 'Quick to burn, itch, or turn crimson; requires ultra-gentle bio-lipids', value: 'High' },
      { label: 'Moderate Sensitivity', description: 'Can handle mild acids and botanical oils with proper buffering', value: 'Moderate' },
      { label: 'Resilient', description: 'Rarely reacts or breaks out from new skincare products', value: 'Low' }
    ]
  },
  {
    id: 'climate',
    question: 'What environment does your skin live in?',
    description: 'Atmospheric humidity and urban exposure dictate your required occlusive weight.',
    options: [
      { label: 'Dry / Arid or Mountain', description: 'Low humidity, artificial indoor heating or air conditioning', value: 'Arid' },
      { label: 'Humid / Tropical', description: 'High humidity, heat, and perspiration', value: 'Humid' },
      { label: 'Urban / City Metro', description: 'High airborne pollution, particulates, and commuter smog', value: 'Urban' },
      { label: 'Temperate / Changing Seasons', description: 'Four distinct seasons requiring adaptive lipid layering', value: 'Temperate' }
    ]
  }
];
