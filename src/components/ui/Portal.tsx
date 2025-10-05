"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: ReactNode }) {
  const elRef = useRef<HTMLElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!;
    el.setAttribute("data-portal-root", "true");
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, []);
  return createPortal(children, elRef.current!);
}