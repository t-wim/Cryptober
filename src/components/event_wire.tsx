"use client";

import { useEffect } from "react";
import { track } from "@/lib/telemetry";

function findEventElement(e: Event): HTMLElement | null {
  const path = (e as unknown as { composedPath?: () => EventTarget[] }).composedPath?.();
  if (Array.isArray(path)) {
    for (const t of path) {
      if (t instanceof HTMLElement && t.dataset?.event) return t;
    }
  }
  // Fallback if composedPath() not available
  let node = e.target as Node | null;
  while (node) {
    if (node instanceof HTMLElement && node.dataset?.event) return node;
    node = (node as HTMLElement).parentElement;
  }
  return null;
}

export default function EventWire() {
  useEffect(() => {
    const handler = (e: Event) => {
      const el = findEventElement(e);
      if (!el) return;

      const eventId = el.dataset.event;
      if (!eventId) return;

      const text =
        el instanceof HTMLButtonElement || el instanceof HTMLAnchorElement
          ? (el.innerText || "").slice(0, 140)
          : undefined;

      void track(eventId, {
        tag: el.tagName.toLowerCase(),
        id: el.id || undefined,
        text,
      });
    };

    document.addEventListener("click", handler, { passive: true });
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}