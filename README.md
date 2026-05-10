# SEO + GEO Playbook

**El método que uso para que Google y ChatGPT empiecen a recomendar mis SaaS.** Aplicado en producción en proyectos reales. En español. Gratis.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Threads](https://img.shields.io/badge/Threads-@ronaldships-black?logo=threads)](https://www.threads.com/@ronaldships)

---

## Resultados reales

Esto no es teoría leída en un libro. Es lo que pasó cuando lo apliqué de verdad:

| Métrica | Resultado |
|---|---|
| **Visitas orgánicas mensuales (combinadas)** | **+60,000** |
| **Usuarios pagando** | Decenas, mayoría llegando por ChatGPT |
| **Inversión en ads** | $0 |
| **Tiempo entre implementar y ver tracción** | 4-8 semanas para indexación rica, 2-4 meses para volumen real |
| **Apps en producción aplicando esto** | [linkship.cc](https://linkship.cc), [karrito.shop](https://karrito.shop) |

No hay magia. Hay un sistema replicable que aplico desde el día 1 de cada proyecto. Eso es lo que está en este repo.

---

## Cómo usar este playbook

### Si tu objetivo es entender la estrategia (no necesitas programar)

Arrancá por estos archivos en este orden:

1. **[`ai-seo.md`](./ai-seo.md)** — el corazón. Cómo lograr que ChatGPT, Claude, Perplexity y Google AI Overviews empiecen a recomendarte. La parte que más cambió mi tracción en 2026
2. **[`content-strategy.md`](./content-strategy.md)** — qué escribir, en qué orden, cómo organizarlo
3. **[`growth-engine.md`](./growth-engine.md)** — el plan completo end-to-end: páginas internas, comparativas, blog, outreach
4. **[`local-seo.md`](./local-seo.md)** — solo si tu negocio tiene componente físico (restaurantes, servicios locales)

### Si vas a implementar el código (Next.js / React)

Arrancá por:

1. **[`SKILL.md`](./SKILL.md)** — código TypeScript listo para pegar
2. **[`seo.ts`](./seo.ts)** — utilidades y types
3. **[`technical.md`](./technical.md)** — Core Web Vitals, sitemap, robots.ts, headers
4. **[`on-page.md`](./on-page.md)** — meta tags, OG, internal linking

Después leé los `.md` de estrategia (la sección anterior).

---

## Los 11 pilares

| # | Archivo | Qué cubre |
|---|---|---|
| 1 | [`ai-seo.md`](./ai-seo.md) ⭐ | **AEO/GEO — llms.txt, AI Overviews, BLUF, citabilidad** |
| 2 | [`content-strategy.md`](./content-strategy.md) | Content clusters, E-E-A-T, keyword research, briefs |
| 3 | [`growth-engine.md`](./growth-engine.md) ⭐ | **Playbook end-to-end: tools, blog, comparativas, outreach** |
| 4 | [`technical.md`](./technical.md) | SEO técnico: CWV, sitemap, robots, performance, headers |
| 5 | [`on-page.md`](./on-page.md) | Meta tags, headings, URLs, imágenes, internal linking |
| 6 | [`local-seo.md`](./local-seo.md) | GBP, NAP, LocalBusiness schema, multi-location, reviews |
| 7 | [`analytics.md`](./analytics.md) | GSC, RUM, AI referral tracking, rank tracking |
| 8 | [`slug-date-distribution.md`](./slug-date-distribution.md) | Anti-batch signal — para sitios con 50+ páginas programáticas |
| 9 | [`audit-website.md`](./audit-website.md) | Auditorías automatizadas con squirrelscan CLI |
| 10 | [`SKILL.md`](./SKILL.md) | Código + JSON-LD generators + Homepage SEO |
| 11 | [`seo.ts`](./seo.ts) | TypeScript types y helpers |

Y un índice general en [`_index.md`](./_index.md).

---

## La parte que más se está demandando: GEO

**Generative Engine Optimization** = optimizar para que ChatGPT, Claude, Perplexity y Google AI Overviews te recomienden cuando alguien pregunta algo de tu nicho.

Es lo que más cambió mi tracción en 2026. Si solo vas a leer un archivo, leé **[`ai-seo.md`](./ai-seo.md)**. Cubre:

- `llms.txt` y `llms-full.txt` — el "robots.txt para LLMs"
- `robots.txt` para AI bots — cuáles permitir, cuáles bloquear
- BLUF (Bottom Line Up Front) — el formato que las IAs prefieren citar
- Cómo verificar si ChatGPT/Claude/Perplexity ya están citando tu sitio
- Patterns concretos para escribir contenido citable

---

## Stack en el que está probado

Aplicado en producción sobre:

- **Next.js 14+ con App Router**
- **TypeScript** end-to-end
- **Tailwind v4**
- **Vercel + Cloudflare DNS**
- **Search Console** + **PostHog** + **web-vitals** RUM

Pero la estrategia (los `.md`) aplica a **cualquier stack** — WordPress, Astro, SvelteKit, Webflow, Shopify, lo que sea. El código TypeScript es bonus para devs Next.js.

---

## Orden de implementación recomendado

Para un proyecto nuevo:

1. **Technical** — robots.ts, sitemap.ts, security headers
2. **On-Page** — generateMetadata, title template, canonical
3. **JSON-LD** (en `SKILL.md`) — Organization, BreadcrumbList, FAQ
4. **AI SEO** — llms.txt + robots.txt para AI bots
5. **Content Strategy** — clusters, BLUF, E-E-A-T
6. **Local SEO** — solo si aplica
7. **Analytics** — GSC + RUM
8. **Growth Engine** — tools, blog, comparativas, outreach
9. **Slug Date Distribution** — al escalar a 50+ páginas programáticas
10. **Audit** — primera auditoría post-lanzamiento

Detalles en [`_index.md`](./_index.md).

---

## Estructura del repo

```
seo-geo-playbook/
├── README.md                    # Este archivo
├── _index.md                    # Índice + orden de implementación
├── ai-seo.md                    ⭐ AEO/GEO — el corazón
├── growth-engine.md             ⭐ Playbook end-to-end
├── content-strategy.md          # Clusters, E-E-A-T, keyword research
├── technical.md                 # CWV, sitemap, robots, headers
├── on-page.md                   # Meta tags, OG, internal linking
├── local-seo.md                 # GBP, NAP, LocalBusiness
├── analytics.md                 # GSC, RUM, AI referral tracking
├── slug-date-distribution.md    # Anti-batch signal
├── audit-website.md             # squirrelscan CLI
├── SKILL.md                     # Código JSON-LD + Homepage SEO
└── seo.ts                       # TS helpers
```

---

## Qué viene después

Este playbook va a evolucionar. En el roadmap:

- [ ] Casos de estudio detallados con métricas mes a mes
- [ ] Sección de "errores que cometí los primeros 6 meses"
- [ ] Templates de prompts para auditorías con LLMs
- [ ] Patterns específicos para e-commerce LATAM

Si querés sugerir algo o reportar errores, abrí un [issue](https://github.com/curetcore/seo-geo-playbook/issues).

---

## Licencia

[MIT](LICENSE) — usar, modificar, distribuir libre. Si te sirvió, mencioname en Threads ([@ronaldships](https://www.threads.com/@ronaldships)) — cierra el círculo y me ayuda a saber qué profundizar después.

---

## Créditos

Construido por [Ronaldo Paulino](https://www.threads.com/@ronaldships), aplicado en producción en:

- **[linkship.cc](https://linkship.cc)** — link in bio SaaS
- **[karrito.shop](https://karrito.shop)** — catálogo digital con checkout WhatsApp

Sigueme en Threads si querés ver más drops del stack: agentes de Claude Code, slash commands, boilerplate Next.js, y todo lo que uso para construir SaaS rápido.
