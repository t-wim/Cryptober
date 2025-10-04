import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import OpenAI, { toFile } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Mode = 'manual' | 'oneclick';

const DEFAULT_NEGATIVE =
  'no extra faces, no text or watermark, no heavy distortion or warping, ' +
  'no harsh halos, avoid posterization, keep eyes clear.';

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // ---- robustes Lesen (falls 'mode' mehrfach gesendet wurde → nimm den letzten) ----
    const modeValues = form.getAll('mode').map(v => String(v)).filter(Boolean);
    let mode: Mode = (modeValues.at(-1) as Mode) || 'oneclick';

    const image = form.get('image');
    const presetId = String(form.get('presetId') || '');
    const promptIn = String(form.get('prompt') || '');
    const negativeIn = String(form.get('negative') || '');
    const nIn = Number(form.get('n') || 3);
    const sizeIn = String(form.get('size') || '1024');

    const isFile = (v: unknown): v is File =>
      !!v && typeof v === 'object' && typeof (v as any).arrayBuffer === 'function';

    if (!isFile(image)) {
      return NextResponse.json({ error: 'No image' }, { status: 400 });
    }

    // Uploadables bauen
    const imageUpload = await toFile(
      Buffer.from(await image.arrayBuffer()),
      'input.png',
      { type: image.type || 'image/png' }
    );

    const mask = form.get('mask');
    const hasMask = isFile(mask);
    const maskUpload = hasMask
      ? await toFile(
          Buffer.from(await (mask as File).arrayBuffer()),
          'mask.png',
          { type: (mask as File).type || 'image/png' }
        )
      : undefined;

    // One-Click Presets (Serverquelle)
    const presets = {
      'pumpkin-glow': {
        prompt:
          'Preserve the person’s facial identity and proportions; transform into a warm neon pumpkin-patch at night with candle bokeh, soft orange-purple glow, gentle rim light, light fog; comic-realistic look.',
        negative:
          'no extra faces, no text or watermark, no heavy distortion or warping, no harsh halos, no frame, avoid posterization; keep eyes clear.',
      },
      'spooky-fog': {
        prompt:
          'Preserve facial identity and proportions; cinematic night scene in a foggy pumpkin patch with cool key light, moon haze, crisp silhouette; high-contrast but readable face.',
        negative:
          'no excessive grain or banding, no face warping, avoid overly dark eye sockets, no text/watermarks, do not obscure the face with fog.',
      },
      'neon-candle': {
        prompt:
          'Preserve the subject’s facial identity; night scene with candles and vivid neon accents; hard purple-orange rim light along hair and shoulders, subtle particles; stylized comic, clean edges.',
        negative:
          'no oversharpening halos, no duplicate outlines, avoid blown highlights on skin, no posterization, no text/watermarks.',
      },
      'wojak-witch': {
        prompt:
          'Preserve facial identity; witchy Halloween portrait with neon cauldron glow, stylized comic edges and subtle meme energy; soft fog and crisp silhouette.',
        negative:
          'no extra faces, no text or watermark, avoid posterization, keep eyes clear.',
      },
      'pepe-lantern': {
        prompt:
          'Preserve facial identity; lantern-lit pumpkin patch with neon palette and degen meme vibe; candle bokeh and gentle particles around the subject.',
        negative:
          'no extra faces, no text or watermark, avoid posterization, keep eyes clear.',
      },
    } as const;

    // ---- Prompt & Negative auflösen (One-Click vs. Manual, inkl. Fallback) ----
    let prompt = '';
    let negative = '';

    if (mode === 'manual') {
      prompt = promptIn.trim();
      negative = (negativeIn || DEFAULT_NEGATIVE).trim();
      if (!prompt) {
        return NextResponse.json({ error: 'Missing prompt (manual mode)' }, { status: 400 });
      }
    } else {
      // oneclick
      if (presetId && presetId in presets) {
        const p = presets[presetId as keyof typeof presets];
        prompt = p.prompt;
        negative = p.negative;
      } else if (promptIn) {
        // Fallback: Wenn Client irrtümlich oneclick sendet, aber bereits prompt mitliefert → als manual behandeln
        mode = 'manual';
        prompt = promptIn.trim();
        negative = (negativeIn || DEFAULT_NEGATIVE).trim();
      } else {
        return NextResponse.json({ error: 'Invalid or missing presetId (oneclick mode)' }, { status: 400 });
      }
    }

    // ---- n & size validieren ----
    const nParsed = Number.isFinite(nIn) ? Math.round(nIn) : 3;
    const n = Math.min(Math.max(nParsed, 1), 6);

    const size =
      sizeIn === '512' || sizeIn === '512x512'
        ? '512x512'
        : '1024x1024';

    // ---- OpenAI Images: Edit-Aufruf (einheitlicher Pfad) ----
    const generated = await openai.images.edit({
      model: 'gpt-image-1',
      image: imageUpload,         // einzelnes Uploadable
      mask: maskUpload,           // optional
      prompt: `${prompt} ${negative}`,
      size,
      n,
    });

    const images = (generated.data || [])
      .map((d: any) => (d.b64_json ? `data:image/png;base64,${d.b64_json}` : d.url || null))
      .filter(Boolean);

    return NextResponse.json({ images });
  } catch (err: any) {
    console.error('[api/edit] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}