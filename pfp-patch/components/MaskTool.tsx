'use client';
import { useEffect, useRef, useState } from 'react';

type Strategy = 'oval' | 'faceHair';

type Props = {
  imageFile: File | null;
  onMaskFileAction: (mask: File | null) => void;
};

type Controls = {
  strategy: Strategy;
  cx: number;  // center x (0..1)
  cy: number;  // center y (0..1)
  rx: number;  // radius x (relative)
  ry: number;  // radius y (relative)
  rotation: number; // deg
  hairBoost: number; // extra space for hair
  feather: number;   // px
  enabled: boolean;
};

export default function MaskTool({ imageFile, onMaskFileAction }: Props) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgDim, setImgDim] = useState<{ w: number; h: number } | null>(null);
  const [controls, setControls] = useState<Controls>({
    strategy: 'faceHair',
    cx: 0.5, cy: 0.48,
    rx: 0.32, ry: 0.40,
    rotation: 0,
    hairBoost: 0.12,
    feather: 5,
    enabled: true,
  });

  const baseRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  // Load image
  useEffect(() => {
    if (!imageFile) {
      setImgUrl(null);
      setImgDim(null);
      onMaskFileAction(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImgUrl(url);
    const img = new Image();
    img.onload = () => {
      setImgDim({ w: img.width, h: img.height });
      URL.revokeObjectURL(url);
      const base = baseRef.current!;
      base.width = img.width; base.height = img.height;
      base.getContext('2d')!.drawImage(img, 0, 0);
      const overlay = overlayRef.current!;
      overlay.width = img.width; overlay.height = img.height;
      drawOverlay(); buildMask();
    };
    img.src = url;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  // Redraw overlay & mask when controls change
  useEffect(() => {
    if (!imgDim) return;
    drawOverlay(); buildMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, imgDim]);

  function drawEllipsePath(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const minDim = Math.min(w, h);
    let rx = controls.rx * minDim;
    let ry = controls.ry * minDim;
    let cx = controls.cx * w;
    let cy = controls.cy * h;

    if (controls.strategy === 'faceHair') {
      cy = cy - controls.hairBoost * h * 0.5;
      ry = ry * (1 + controls.hairBoost);
    }
    const rot = (controls.rotation * Math.PI) / 180;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i <= 360; i += 2) {
      const th = (i * Math.PI) / 180;
      const x = Math.cos(th) * rx;
      const y = Math.sin(th) * ry;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.restore();
  }

  function drawOverlay() {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d')!;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#ff0044'; // protected (face/hair)
    drawEllipsePath(ctx, overlay.width, overlay.height);
    ctx.fill();
    ctx.restore();
  }

  async function buildMask() {
    if (!imgDim) return;
    const off = document.createElement('canvas');
    off.width = imgDim.w; off.height = imgDim.h;
    const ctx = off.getContext('2d')!;

    // White = editable area (background/styling)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, off.width, off.height);

    // Black = protected area (face/hair) with optional feather
    ctx.fillStyle = '#000000';
    if (controls.feather > 0) ctx.filter = `blur(${controls.feather}px)`;
    drawEllipsePath(ctx, off.width, off.height);
    ctx.fill();

    const blob: Blob = await new Promise(res => off.toBlob(b => res(b!), 'image/png'));
    const file = new File([blob], 'mask.png', { type: 'image/png' });
    onMaskFileAction(controls.enabled ? file : null);
  }

  if (!imageFile) return <div className="opacity-60 text-sm">Upload an image to configure the mask.</div>;

  return (
    <div className="card space-y-3">
      <div className="text-base font-semibold">Identity Guard (Mask)</div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox"
            checked={controls.enabled}
            onChange={(e) => setControls(v => ({ ...v, enabled: e.target.checked }))}/>
          Enable Mask
        </label>

        <select
          className="bg-white/10 rounded px-2 py-1"
          value={controls.strategy}
          onChange={(e) => setControls(v => ({ ...v, strategy: e.target.value as Strategy }))}
          disabled={!controls.enabled}
        >
          <option value="faceHair">Face + Hair</option>
          <option value="oval">Oval</option>
        </select>

        <label className="ml-2">Feather
          <input type="range" min={0} max={12} step={1}
            value={controls.feather}
            onChange={(e) => setControls(v => ({ ...v, feather: Number(e.target.value) }))}
            className="ml-2"/>
          <span className="ml-2 tabular-nums">{controls.feather}px</span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <canvas ref={baseRef} className="w-full rounded-xl overflow-hidden border border-white/10"/>
          <div className="text-xs opacity-70">Source</div>
        </div>
        <div className="space-y-2">
          <canvas ref={overlayRef} className="w-full rounded-xl overflow-hidden border border-white/10"/>
          <div className="text-xs opacity-70">Protected region (red = preserved)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <label>Center X
          <input type="range" min={0.3} max={0.7} step={0.005}
            value={controls.cx}
            onChange={(e) => setControls(v => ({ ...v, cx: Number(e.target.value) }))}/>
        </label>
        <label>Center Y
          <input type="range" min={0.3} max={0.7} step={0.005}
            value={controls.cy}
            onChange={(e) => setControls(v => ({ ...v, cy: Number(e.target.value) }))}/>
        </label>
        <label>Radius X
          <input type="range" min={0.2} max={0.5} step={0.005}
            value={controls.rx}
            onChange={(e) => setControls(v => ({ ...v, rx: Number(e.target.value) }))}/>
        </label>
        <label>Radius Y
          <input type="range" min={0.25} max={0.6} step={0.005}
            value={controls.ry}
            onChange={(e) => setControls(v => ({ ...v, ry: Number(e.target.value) }))}/>
        </label>
        <label>Rotation
          <input type="range" min={-20} max={20} step={1}
            value={controls.rotation}
            onChange={(e) => setControls(v => ({ ...v, rotation: Number(e.target.value) }))}/>
        </label>
        {controls.strategy === 'faceHair' && (
          <label>Hair Boost
            <input type="range" min={-0.1} max={0.5} step={0.01}
              value={controls.hairBoost}
              onChange={(e) => setControls(v => ({ ...v, hairBoost: Number(e.target.value) }))}/>
          </label>
        )}
      </div>
    </div>
  );
}
