// src/components/tools/ToolHost.tsx
"use client";
import { Suspense } from "react";
import CarverShell from "../ui/carver/CarverShell";
import PfpShell   from "../ui/pfp/PfpShell";
import OracleShell from "../ui/oracle/OracleShell";

type ToolId = "oracle" | "pfp" | "carver";

function Skeleton() {
  return (
    <div className="grid gap-3">
      <div className="h-6 w-40 rounded bg-white/10" />
      <div className="h-24 rounded bg-white/10" />
      <div className="h-40 rounded bg-white/10" />
    </div>
  );
}

export default function ToolHost({ id }: { id: ToolId }) {
  return (
    <Suspense fallback={<Skeleton />}>
      {id === "oracle" && <OracleShell />}
      {id === "pfp"    && <PfpShell />}
      {id === "carver" && <CarverShell />}
    </Suspense>
  );
}
