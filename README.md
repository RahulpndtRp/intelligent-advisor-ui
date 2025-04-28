# 🧠 Intelligent Advisor UI

Clean, production‑ready **React + Vite + Tailwind** front‑end for an LLM‑powered assistant.

## 🚀 Quick start

```bash
git clone <repo>
cd intelligent-advisor-ui
cp .env.example .env   # edit backend URL
npm install
npm run dev            # http://localhost:5173
```

## Expected backend response

```jsonc
{
  "answer": "...",
  "sources": [{ "title": "", "link": "" }],
  "follow_up_questions": ["..."],
  "tool_outputs": [
    { "function_name": "search_location", "response": { "query": "Disneyland", "maps_url": "https://..." } },
    { "function_name": "search_shopping", "response": { "title": "iPhone", "price": "$1,199", "link": "https://...", "image_url": "https://..." } },
    { "function_name": "search_news", "response": { "articles": [{ "title": "...", "source": "...", "date": "...", "link": "...", "snippet": "..." }] } }
  ]
}
```

## 📂 Key files

* `src/App.jsx` – shell & data fetching  
* `src/components/` – Chat UI pieces  
* `tailwind.config.cjs` – theme colours  
* `.env.example` – env vars

## 🔧 Config

| Var | Default | Notes |
|-----|---------|-------|
| `VITE_BACKEND_URL` | `http://localhost:8000/answer` | Chat endpoint |
| `VITE_GMAPS_EMBED_KEY` | — | only if you want Embed API |

## 🛠 Build

```bash
npm run build   # static files in dist/
```

Serve `dist/` on Vercel / Netlify / Cloudflare Pages.

## 📄 License

MIT
