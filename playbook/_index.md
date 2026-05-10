# SEO + GEO Playbook — Índice

> Índice de los pilares y orden de implementación recomendado.

---

## Pilares por archivo

| # | Pilar | Archivo | Descripción | Tipo |
|---|-------|---------|-------------|------|
| 1 | SEO Técnico | `technical.md` | CWV (INP, LCP, CLS), crawlability, sitemap, robots.ts, speed, security headers | Implementación |
| 2 | SEO On-Page | `on-page.md` | Meta tags, headings, URLs, imágenes, Open Graph, internal linking | Implementación |
| 3 | AI SEO (AEO/GEO) ⭐ | `ai-seo.md` | llms.txt, robots.txt para AI bots, AI Overviews, citabilidad, BLUF | Implementación |
| 4 | Content Strategy | `content-strategy.md` | BLUF, content clusters, E-E-A-T, keyword research, briefs | Estrategia |
| 5 | Local SEO | `local-seo.md` | GBP, NAP, LocalBusiness schema, multi-location, reviews | Implementación |
| 6 | Analytics | `analytics.md` | GSC, CWV RUM, AI referral tracking, rank tracking, audit cadence | Monitoreo |
| 7 | Growth Engine ⭐ | `growth-engine.md` | Playbook end-to-end: tools, blog, comparativas, AEO, outreach | Implementación |
| 8 | Slug Date Distribution | `slug-date-distribution.md` | Anti-batch signal — hash determinístico por slug para sitios con 50+ páginas programáticas | Implementación |
| 9 | JSON-LD / Código | `SKILL.md` | Generadores de JSON-LD, `generateMetadata` patterns, referencia a `seo.ts` | Código |
| 10 | Audit | `audit-website.md` | squirrelscan CLI para auditorías automatizadas | Herramienta |

---

## Orden de implementación para proyecto nuevo

1. **Technical** — robots.ts, sitemap.ts, security headers, `next/font`
2. **On-Page** — `generateMetadata` en layout, title template, canonical
3. **JSON-LD** (`SKILL.md`) — Organization schema, BreadcrumbList
4. **AI SEO** — llms.txt, robots.txt para AI bots
5. **Content Strategy** — content clusters, BLUF, E-E-A-T
6. **Local SEO** — solo si aplica (negocio físico o por área)
7. **Analytics** — GSC setup, web-vitals RUM, PostHog
8. **Growth Engine** — tools, blog, comparativas, AEO, outreach (post-lanzamiento)
9. **Slug Date Distribution** — aplicar cuando haya 50+ páginas programáticas (antes de escalar a 500+)
10. **Audit** — primera auditoría post-lanzamiento
