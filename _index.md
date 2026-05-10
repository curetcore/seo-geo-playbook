# SEO Skills Index

> Indice de todos los skills disponibles para el agente `seo-marketing`.

---

## Skills por pilar

| # | Skill | Archivo | Descripcion | Tipo |
|---|-------|---------|-------------|------|
| 1 | SEO Tecnico | `technical.md` | CWV (INP, LCP, CLS), crawlability, sitemap, robots.ts, speed, security headers | Implementacion |
| 2 | SEO On-Page | `on-page.md` | Meta tags, headings, URLs, imagenes, Open Graph, internal linking | Implementacion |
| 3 | AI SEO (AEO/GEO) | `ai-seo.md` | llms.txt, robots.txt para AI bots, AI Overviews, citabilidad, BLUF | Implementacion |
| 4 | Content Strategy | `content-strategy.md` | BLUF, content clusters, E-E-A-T, keyword research, briefs | Estrategia |
| 5 | Local SEO | `local-seo.md` | GBP, NAP, LocalBusiness schema, multi-location, reviews | Implementacion |
| 6 | Analytics | `analytics.md` | GSC, CWV RUM, AI referral tracking, rank tracking, audit cadence | Monitoreo |
| 7 | JSON-LD / Code | `SKILL.md` | Generators de JSON-LD, generateMetadata patterns, seo.ts reference | Codigo |
| 8 | Ecosystem (CURET) | `ECOSYSTEM.md` | Hub-and-spoke para ecosistema CURET, interlinking, llms.txt CURET | Estrategia |
| 9 | Audit | `audit-website.md` | squirrelscan CLI para auditorias automatizadas | Herramienta |
| 10 | Growth Engine | `growth-engine.md` | Playbook completo: tools, blog x20, comparativas, AEO, outreach | Implementacion |
| 11 | Slug Date Distribution | `slug-date-distribution.md` | Anti-batch signal. Hash deterministico por slug para sitios con 50+ paginas programaticas | Implementacion |
| 12 | TS Reference | `seo.ts` | TypeScript types y helpers para SEO | Codigo |

---

## Orden de implementacion para proyecto nuevo

1. **Technical** - robots.ts, sitemap.ts, security headers, next/font
2. **On-Page** - generateMetadata en layout, title template, canonical
3. **JSON-LD** (SKILL.md) - Organization schema, BreadcrumbList
4. **AI SEO** - llms.txt, robots.txt AI bots
5. **Content Strategy** - Content clusters, BLUF, E-E-A-T
6. **Local SEO** - Solo si aplica (negocio fisico o por area)
7. **Analytics** - GSC setup, web-vitals RUM, PostHog
8. **Growth Engine** - Tools, blog, comparativas, AEO, outreach (post-lanzamiento)
9. **Slug Date Distribution** - Aplicar cuando haya 50+ paginas programaticas (antes de escalar a 500+)
10. **Audit** - Primera auditoria post-lanzamiento
11. **Ecosystem** - Solo para ecosistema multi-producto (CURET)
