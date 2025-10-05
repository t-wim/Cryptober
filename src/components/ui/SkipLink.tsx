// src/components/ui/SkipLink.tsx
export default function SkipLink() {
  return (
    <a
      href="#content"
      className="skip fixed left-2 top-2 -translate-y-full focus:translate-y-0 bg-[color:var(--color-pumpkin)]/10 text-[color:var(--color-pumpkin)] px-3 py-2 rounded-md font-medium transition-transform"
    >
      Skip to main content
    </a>
  );
}
