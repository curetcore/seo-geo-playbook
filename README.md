# SEO + GEO Playbook

> El playbook completo de SEO técnico, on-page, content strategy y **Generative Engine Optimization (GEO)** que uso para que Google y ChatGPT empiecen a recomendar mis SaaS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Threads](https://img.shields.io/badge/Threads-@ronaldships-black?logo=threads)](https://www.threads.com/@ronaldships)

---

## Por qué existe este playbook

En enero 2026 nadie conocía mis proyectos. Hoy:

- **Linkship.cc** — 20k visitas mensuales orgánicas, sin pagar un dólar de ads
- **Karrito.shop** — 48 pagando, la mayoría llegan porque ChatGPT recomienda la app cuando alguien pregunta por catálogos digitales con WhatsApp
- **Ambos rankean en primera página de Google** para sus keywords objetivo

No hubo magia. Hubo un sistema replicable que aplico a cada proyecto desde el día 1. Eso es lo que está en este repo.

---

## Cómo usar este playbook (según quién seas)

### Si sos developer (Next.js / React)

Arrancá por:

1. **`SKILL.md`** — código TypeScript listo para pegar: `generateMetadata`, JSON-LD generators (Organization, FAQ, SoftwareApplication, etc.), componente `<HomepageSEO />` para tu page.tsx
2. **`seo.ts`** — utilidades adicionales y types
3. **`technical.md`** — Core Web Vitals (INP, LCP, CLS), sitemap, robots.ts, security headers, fonts
4. **`on-page.md`** — patterns de title/description/OG por tipo de página

Después leé los `.md` de estrategia (los de la siguiente sección).

### Si sos marketer, founder no-técnico, indie hacker

No necesitás programar nada. Arrancá por:

1. **`_index.md`** — overview de los 11 pilares
2. **`ai-seo.md`** — **el corazón del playbook**: cómo posicionarte para AI Overviews de Google, ChatGPT, Perplexity, Claude. llms.txt, BLUF, citabilidad, cómo medir si te están recomendando
3. **`content-strategy.md`** — content clusters, E-E-A-T, keyword research, briefs
4. **`growth-engine.md`** — playbook end-to-end: tools internas, blog x20, comparativas, AEO, outreach
5. **`local-seo.md`** — solo si tu negocio tiene componente físico/local

---

## Los 11 pilares

| # | Archivo | Qué cubre |
|---|---|---|
| 1 | `SKILL.md` | Código + JSON-LD generators + componente Homepage SEO listo para pegar |
| 2 | `_index.md` | Índice + orden de implementación recomendado |
| 3 | `technical.md` | SEO técnico: CWV, sitemap, robots, performance, headers |
| 4 | `on-page.md` | Meta tags, headings, URLs, imágenes, internal linking |
| 5 | **`ai-seo.md`** | **AEO/GEO — llms.txt, AI Overviews, BLUF, citabilidad** |
| 6 | `content-strategy.md` | BLUF, content clusters, E-E-A-T, keyword research, briefs |
| 7 | `local-seo.md` | GBP, NAP, LocalBusiness schema, multi-location, reviews |
| 8 | `analytics.md` | GSC, CWV RUM, AI referral tracking, rank tracking, audit cadence |
| 9 | `growth-engine.md` | Playbook completo: tools, blog x20, comparativas, AEO, outreach |
| 10 | `slug-date-distribution.md` | Anti-batch signal — para sitios con 50+ páginas programáticas |
| 11 | `audit-website.md` | Auditorías automatizadas con squirrelscan CLI |
| 12 | `seo.ts` | TypeScript types y helpers |

---

## La parte del playbook que más se está demandando: GEO

**Generative Engine Optimization** = optimizar para que ChatGPT, Claude, Perplexity y AI Overviews de Google te recomienden cuando alguien pregunta algo de tu nicho.

Es lo que más cambió mi tracción en 2026. Si solo vas a leer un archivo, leé **`ai-seo.md`**. Cubre:

- `llms.txt` y `llms-full.txt` — el "robots.txt para LLMs"
- `robots.txt` para AI bots (cuáles permitir, cuáles bloquear)
- BLUF (Bottom Line Up Front) — el formato de contenido que LLMs prefieren citar
- Cómo verificar si ChatGPT/Claude/Perplexity están citando tu sitio
- Patterns de citabilidad — cómo escribir contenido que las IAs quieren resumir

---

## Stack en el que está probado

Todo este playbook nació aplicándolo a stacks reales en producción:

- **Next.js 14+ con App Router**
- **TypeScript** end-to-end
- **Tailwind v4**
- **Vercel + Cloudflare DNS**
- **Search Console** + **PostHog** + **web-vitals** RUM

Pero la estrategia (los `.md`) aplica a **cualquier stack** — WordPress, Astro, SvelteKit, Webflow, lo que sea. El código TypeScript es bonus para devs Next.js.

---

## Cómo aplicar paso a paso

Hay un orden específico recomendado en `_index.md`:

1. **Technical** primero — robots.ts, sitemap.ts, security headers
2. **On-Page** — generateMetadata en layout, title template, canonical
3. **JSON-LD** — Organization, BreadcrumbList, FAQ
4. **AI SEO** — llms.txt + robots.txt para AI bots
5. **Content Strategy** — clusters, BLUF, E-E-A-T
6. **Local SEO** — solo si aplica
7. **Analytics** — GSC + RUM
8. **Growth Engine** — tools, blog, comparativas, outreach
9. **Slug Date Distribution** — al escalar a 50+ páginas programáticas
10. **Audit** — primera auditoría post-lanzamiento

---

## Resultados reales (no promesas)

Esto es lo que pasó cuando lo apliqué de verdad:

- **Linkship.cc**: de 0 a 20k visitas mensuales orgánicas en ~3 meses. ChatGPT y Claude empezaron a recomendarlo cuando la gente pregunta por "alternativas a linktree" en español
- **Karrito.shop**: 48 cuentas pagando. La mayoría llega via Google y ChatGPT preguntando por "cómo crear catálogo de productos con WhatsApp checkout"
- **Tiempo entre implementar y ver primeros frutos**: 4-8 semanas para indexación rica, 2-4 meses para volumen orgánico real

No vendo cursos. Esto está acá gratis porque la mejor distribución es construir confianza primero.

---

## Estructura del repo

```
seo-geo-playbook/
├── README.md                    # Este archivo
├── _index.md                    # Índice + orden de implementación
├── SKILL.md                     # Código JSON-LD + componente Homepage SEO
├── ai-seo.md                    # ⭐ AEO/GEO — el corazón
├── content-strategy.md          # Clusters, E-E-A-T, keyword research
├── technical.md                 # CWV, sitemap, robots, headers
├── on-page.md                   # Meta tags, OG, internal linking
├── local-seo.md                 # GBP, NAP, LocalBusiness
├── analytics.md                 # GSC, RUM, AI referral tracking
├── growth-engine.md             # ⭐ Playbook end-to-end
├── slug-date-distribution.md    # Anti-batch signal
├── audit-website.md             # squirrelscan CLI
└── seo.ts                       # TS helpers
```

---

## Roadmap de updates

Este playbook va a evolucionar conmigo a medida que aprendo más cosas en producción:

- [ ] Casos de estudio con métricas más detalladas
- [ ] Sección de "errores que cometí los primeros 6 meses"
- [ ] Templates de prompts para auditorías con LLMs
- [ ] Comparativas de tools de rank tracking
- [ ] Patterns específicos para e-commerce LATAM

Si querés sugerir algo o reportar errores, abrí un issue.

---

## Licencia

[MIT](LICENSE) — usar, modificar, distribuir libre. Si te sirvió, mencioname en Threads ([@ronaldships](https://www.threads.com/@ronaldships)) — cierra el círculo y me ayuda a saber qué profundizar después.

---

## Créditos

Playbook construido por [Ronaldo Paulino](https://www.threads.com/@ronaldships), aplicado en producción en:

- [linkship.cc](https://linkship.cc) — link in bio SaaS
- [karrito.shop](https://karrito.shop) — catálogo digital con checkout WhatsApp

Sigueme en Threads si querés ver más drops del stack: agentes de Claude Code, slash commands, boilerplate Next.js, y todo lo que uso para construir SaaS rápido.
