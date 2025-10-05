"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Portal from "./Portal";

type Props = {
  open: boolean;
  onCloseAction: () => void;
  title?: string;
  children: ReactNode;
  sheetOnMobile?: boolean; // true => Full-Sheet auf Mobile
};

export default function Overlay({ open, onCloseAction, title, children, sheetOnMobile }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    // focus first focusable
    setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      )?.focus();
    }, 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCloseAction]);

  if (!open) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseAction();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title || "Dialog"}
          className={[
            "rounded-2xl border border-[color:var(--color-accent)]/40",
            "bg-[color:var(--color-ink)] text-[color:var(--color-text)]",
            "shadow-[0_0_60px_rgba(34,197,94,.25)] w-[min(92vw,44rem)]",
            sheetOnMobile
              ? "md:rounded-2xl md:translate-y-0 md:max-h-[90vh] md:p-6 translate-y-[10vh] p-4"
              : "p-6"
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-lg font-semibold">{title || " "}</h2>
            <button
              className="btn btn-accent"
              aria-label="Close dialog"
              onClick={onCloseAction}
            >
              Close
            </button>
          </div>
          <div className="overflow-auto max-h-[70vh]">{children}</div>
        </div>
      </div>
    </Portal>
  );
}