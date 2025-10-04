export type RefineKey =
  | 'more_candles'
  | 'more_glow'
  | 'less_fog'
  | 'darker_bg'
  | 'lower_contrast'
  | 'rim_plus'
  | 'softer_edges'
  | 'less_neon'
  | 'closer_to_source'
  | 'more_creative'
  | 'new_palette';

export type Preset = {
  id: string;
  label: string;
  tooltip: string;
  prompt: string;
  negative: string;
  refine: Partial<Record<RefineKey, string>>;
  mode: 'edit' | 'variation';
};

export const PRESETS: Preset[] = [
  {
    id: 'pumpkin-glow',
    label: 'Pumpkin Glow',
    tooltip: 'Warm, soft Halloween light with candle bokeh and gentle comic look.',
    prompt:
      "Preserve the person’s facial identity and proportions; transform into a warm neon pumpkin-patch at night with candle bokeh, soft orange-purple glow, gentle rim light, light fog; comic-realistic look.",
    negative:
      "no extra faces, no text or watermark, no heavy distortion or warping, no harsh halos, no frame, avoid posterization; keep skin tones natural and eyes clear.",
    refine: {
      more_candles: 'increase number of candles, intensify warm glow around subject',
      more_glow: 'stronger orange-purple glow, gentle bloom around edges',
      less_fog: 'reduce fog density, keep subject crisp'
    },
    mode: 'edit'
  },
  {
    id: 'spooky-fog',
    label: 'Spooky Fog',
    tooltip: 'Cool key light in dense fog; cinematic yet readable face.',
    prompt:
      'Preserve facial identity and proportions; cinematic night scene in a foggy pumpkin patch with cool key light, moon haze, crisp silhouette; high-contrast but readable face.',
    negative:
      'no excessive grain or banding, no face warping, avoid overly dark eye sockets, no text/watermarks, do not obscure the face with fog.',
    refine: {
      less_fog: 'thin the fog, increase facial clarity',
      darker_bg: 'darken background while keeping subject readable',
      lower_contrast: 'soften contrast to preserve midtones'
    },
    mode: 'edit'
  },
  {
    id: 'neon-candle',
    label: 'Neon Candle',
    tooltip: 'Crisp neon accents with hard rim light and clean edges.',
    prompt:
      'Preserve the subject’s facial identity; night scene with candles and vivid neon accents; hard purple-orange rim light along hair and shoulders, subtle particles; stylized comic, clean edges.',
    negative:
      'no oversharpening halos, no duplicate outlines, avoid blown highlights on skin, no posterization, no text/watermarks.',
    refine: {
      rim_plus: 'increase hard rim light intensity along hair and shoulders',
      softer_edges: 'soften edge enhancement, reduce halos',
      less_neon: 'reduce neon saturation, keep natural skin appearance'
    },
    mode: 'edit'
  },
  {
    id: 'creative-variations',
    label: 'Creative Mode',
    tooltip: 'Freer reinterpretation; identity loosely preserved, style can vary.',
    prompt:
      'Loosely preserve likeness while freely reinterpreting the portrait in a neon-Halloween theme; allow stronger style and palette changes; remix scene and lighting.',
    negative:
      'avoid extreme face mutation or age/body changes, no extra faces, no heavy artifacts, no text/watermarks.',
    refine: {
      closer_to_source: 'bring features closer to the source image, preserve facial likeness',
      more_creative: 'broaden stylistic changes while keeping subject identity loosely',
      new_palette: 'shift palette to an alternative scheme while maintaining lighting logic'
    },
    mode: 'variation'
  }
];
