'use client';
import { useEffect } from 'react';

export default function EventWire() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-event]');
      if (!target) return;
      const id = target.getAttribute('data-event');
      if (!id) return;
      const payload = {
        id,
        path: location.pathname,
        ts: Date.now(),
      };
      navigator.sendBeacon?.(
        '/api/events',
        new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      ) || fetch('/api/events', { method: 'POST', body: JSON.stringify(payload) }).catch(() => {});
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
