"use client";

type TelemetryPayload = {
  event: string;
  path?: string;
  meta?: Record<string, unknown>;
  ts?: number;
};

export async function track(event: string, meta?: Record<string, unknown>) {
  const body: TelemetryPayload = {
    event,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    meta,
    ts: Date.now(),
  };
  try {
    const json = JSON.stringify(body);
    if ("sendBeacon" in navigator) {
      const blob = new Blob([json], { type: "application/json" });
      navigator.sendBeacon("/api/events", blob);
      return;
    }
    await fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: json, keepalive: true });
  } catch {
    // no-op: Telemetry darf niemals UI blockieren
  }
}