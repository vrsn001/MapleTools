# Maple Tools

[![Repository](https://img.shields.io/badge/GitHub-vrsn001%2FMapleTools-orange)](https://github.com/vrsn001/MapleTools)

A self-hosted fork of [IT Tools](https://it-tools.tech) — **70+ developer utilities** with a refreshed maple-themed UI. Everything runs in your browser; your data stays local.

- **This fork:** [github.com/vrsn001/MapleTools](https://github.com/vrsn001/MapleTools)
- **Upstream:** [CorentinTh/it-tools](https://github.com/CorentinTh/it-tools) (GPL-3.0)
## Features

- Crypto, converters, web tools, networking, math, text, and more
- Search with `Ctrl+K` / `Cmd+K`
- Favorites with drag-and-drop reorder
- Dark / light mode
- Category-organized home page

## Quick start

```bash
cd MapleTools
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

### Docker (from upstream)

```bash
docker run -d --name maple-tools --restart unless-stopped -p 8080:80 corentinth/it-tools:latest
```

## Tech stack

- Vue 3 + Vite + TypeScript
- Naive UI + UnoCSS
- Pinia + Vue Router + Vue I18n

## License

GNU GPLv3 — same as the upstream IT Tools project.
