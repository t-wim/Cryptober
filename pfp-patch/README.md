# Pumpkin Patch – Starter

VS Code + PowerShell friendly starter for the **Pumpkin Patch** PFP transformer (Next.js + TypeScript + Tailwind).

## Quickstart

```powershell
# 1) Install deps
npm i

# 2) Configure env
copy .env.example .env
# Then open .env and set your key

# 3) Run dev server
npm run dev
```

Open http://localhost:3000

## Environment

- `OPENAI_API_KEY` – required
- `NEXT_PUBLIC_APP_NAME` – optional

> v1 uses **OpenAI gpt-image-1** _edits/variations_.

## Notes

- `next.config.mjs` is **ESM**. Avoid TypeScript syntax in this file.
- The API route (`/api/edit`) currently submits **edits without a mask** for simplicity. Client-side mask upload can be added next.
- Preview size can be changed later; currently we request `1024x1024` from the API for best quality and downscale client side for thumbs.
