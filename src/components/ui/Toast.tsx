"use client";
import { useEffect, useState } from "react";
import Portal from "./Portal";

export default function Toast({ text, open, onDoneAction }: { text: string; open: boolean; onDoneAction: () => void; }) {
  const [visible, setVisible] = useState(open);
  useEffect(() => {
    if (!open) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); onDoneAction(); }, 3000);
    return () => clearTimeout(t);
  }, [open, onDoneAction]);

  if (!visible) return null;
  return (
    <Portal>
      <div className="fixed top-4 right-4 z-50">
        <div className="rounded-xl border border-[color:var(--color-pumpkin)]/40 bg-[color:var(--color-pumpkin)]/15 text-[color:var(--color-text)] px-4 py-2 shadow-[0_0_30px_rgba(255,69,0,.25)]">
          {text}
        </div>
      </div>
    </Portal>
  );
}