export type Intensity = 'soft' | 'medium' | 'strong';
export type SizeOpt = '512' | '1024';

export const NEGATIVE_DEFAULTS = [
  'no extra faces',
  'no text or watermark',
  'no heavy distortion or warping',
  'no harsh halos',
  'avoid posterization',
  'keep eyes clear'
];

export const KEYWORD_MATRIX = {
  scene: [
    'neon pumpkin patch at night',
    'graveyard path with lanterns',
    'foggy corn maze',
    'moonlit forest clearing',
  ],
  lighting: [
    'soft orange-purple glow',
    'hard rim light along hair and shoulders',
    'candle bokeh',
    'moon haze volumetric',
  ],
  style: [
    'comic-realistic look',
    'stylized comic, clean edges',
    'cinematic tone mapping',
    'subtle grain for texture',
  ],
  accents: [
    'gentle particles drifting',
    'light fog around the subject',
    'subtle ember sparks',
    'pumpkin carvings glowing',
  ],
  palette: [
    'warm orange + deep purple',
    'teal shadows + amber highlights',
    'muted blues with pumpkin amber',
  ],
  camera: [
    'portrait framing, 50mm look',
    'slight vignette',
    'shallow depth of field',
  ],
  memeCrypto: [
    'crypto Halloween vibe',
    'degen meme energy',
    'uptober atmosphere',
  ]
} as const;

const INTENSITY_PREFIX: Record<Intensity, string> = {
  soft:   'Preserve the person’s facial identity and proportions; gently',
  medium: 'Preserve the person’s facial identity and proportions;',
  strong: 'Preserve the person’s facial identity and proportions; boldly',
};

export function buildManualPrompt(
  selections: Partial<Record<keyof typeof KEYWORD_MATRIX, string[]>>,
  intensity: Intensity = 'medium'
): string {
  const parts: string[] = [];
  const order: (keyof typeof KEYWORD_MATRIX)[] = ['scene','lighting','style','accents','palette','camera','memeCrypto'];
  for (const key of order) {
    const vals = selections[key];
    if (vals && vals.length) parts.push(vals.join(', '));
  }
  return `${INTENSITY_PREFIX[intensity]} transform the portrait into ${parts.join('; ')}.`;
}

export function buildNegative(custom: string[] = []): string {
  const merged = [...NEGATIVE_DEFAULTS, ...custom];
  return merged.join(', ') + '.';
}

// ---------- One-Click: Presets & Random ----------

export type OneClickPreset = {
  id: string;
  label: string;
  tooltip: string;
  prompt: string;
  negative: string;
};

export const ONECLICK_PRESETS: OneClickPreset[] = [
  {
    id: 'pumpkin-glow',
    label: 'Pumpkin Glow',
    tooltip: 'Warm, soft Halloween light with candle bokeh and gentle comic look.',
    prompt:
      "Preserve the person’s facial identity and proportions; transform into a warm neon pumpkin-patch at night with candle bokeh, soft orange-purple glow, gentle rim light, light fog; comic-realistic look.",
    negative: buildNegative(),
  },
  {
    id: 'spooky-fog',
    label: 'Spooky Fog',
    tooltip: 'Cool key light in dense fog; cinematic yet readable face.',
    prompt:
      "Preserve facial identity and proportions; cinematic night scene in a foggy pumpkin patch with cool key light, moon haze, crisp silhouette; high-contrast but readable face.",
    negative: buildNegative(['do not obscure the face with fog']),
  },
  {
    id: 'neon-candle',
    label: 'Neon Candle',
    tooltip: 'Crisp neon accents with hard rim light and clean edges.',
    prompt:
      "Preserve the subject’s facial identity; night scene with candles and vivid neon accents; hard purple-orange rim light along hair and shoulders, subtle particles; stylized comic, clean edges.",
    negative: buildNegative(['no duplicate outlines', 'avoid blown highlights on skin']),
  },
  {
    id: 'wojak-witch',
    label: 'Wojak Witch',
    tooltip: 'Witchy rim light & meme energy, identity preserved.',
    prompt:
      "Preserve facial identity; witchy Halloween portrait with neon cauldron glow, stylized comic edges and subtle meme energy; soft fog and crisp silhouette.",
    negative: buildNegative(),
  },
  {
    id: 'pepe-lantern',
    label: 'Pepe Lantern',
    tooltip: 'Lantern-lit neon palette, degen meme vibe.',
    prompt:
      "Preserve facial identity; lantern-lit pumpkin patch with neon palette and degen meme vibe; candle bokeh and gentle particles around the subject.",
    negative: buildNegative(),
  },
];

// Simple seeded RNG for Random prompt
function seedToRng(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildRandomPrompt(seed = String(Date.now())): { prompt: string; negative: string } {
  const rnd = seedToRng(seed);
  const pick = (arr: readonly string[]) => arr[Math.floor(rnd() * arr.length)];
  const scene = pick(KEYWORD_MATRIX.scene);
  const lighting = pick(KEYWORD_MATRIX.lighting);
  const style = pick(KEYWORD_MATRIX.style);
  const accents = pick(KEYWORD_MATRIX.accents);
  const palette = pick(KEYWORD_MATRIX.palette);
  const camera = pick(KEYWORD_MATRIX.camera);
  const meme = pick(KEYWORD_MATRIX.memeCrypto);

  const prompt = `Preserve the person’s facial identity and proportions; transform the portrait into ${scene}; ${lighting}; ${style}; ${accents}; palette ${palette}; ${camera}; ${meme}.`;
  const negative = buildNegative();

  return { prompt, negative };
}