# SEO + GEO Playbook

**El método que uso para que Google y ChatGPT empiecen a recomendar mis SaaS.** Aplicado en producción en proyectos reales. En español. Gratis.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version: v2.0.0](https://img.shields.io/badge/version-v2.0.0-blue)](./CHANGELOG.md)
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

## Dual-use: playbook + skill pack

El repo se puede usar de dos formas:

### Modo 1 — Leer el playbook (humanos)

Documentación educacional en [`playbook/`](./playbook/). 9 archivos `.md` que explican estrategia, patrones y código. Stack: Next.js 16, pero la estrategia aplica a cualquier framework.

### Modo 2 — Instalar el skill pack (Claude Code)

Agente especializado + 10 sub-skills instalables en Claude Code. Después de instalar, le decís a Claude *"necesito que mi SaaS aparezca en ChatGPT"* y el agente delega al sub-skill correcto, ejecuta los pasos y reporta.

```bash
# Clonar el repo
git clone https://github.com/curetcore/seo-geo-playbook.git
cd seo-geo-playbook

# Instalar agente y skills en Claude Code
cp agents/seo-marketing.md ~/.claude/agents/
cp -r skills/seo-* ~/.claude/skills/

# Listo. En cualquier proyecto Next.js, decile a Claude:
# "Hacé un audit SEO + GEO completo del proyecto"
```

---

## Estructura del repo

```
seo-geo-playbook/
├── README.md                    # Este archivo
├── CHANGELOG.md                 # Historial de versiones
├── CONTRIBUTING.md              # Guía de contribución
├── LICENSE
│
├── playbook/                    # Modo 1 — Educacional para humanos
│   ├── _index.md                # Índice + orden de implementación
│   ├── ai-seo.md                ⭐ AEO/GEO — el corazón
│   ├── growth-engine.md         ⭐ Playbook end-to-end
│   ├── content-strategy.md      # Clusters, E-E-A-T, keyword research
│   ├── technical.md             # CWV, sitemap, robots, headers
│   ├── on-page.md               # Meta tags, OG, internal linking
│   ├── local-seo.md             # GBP, NAP, LocalBusiness
│   ├── analytics.md             # GSC, RUM, AI referral tracking
│   └── slug-date-distribution.md # Anti-batch signal
│
├── agents/                      # Modo 2 — Claude Code agent
│   └── seo-marketing.md         # Decision-framework + matriz
│
├── skills/                      # Modo 2 — 10 sub-skills instalables
│   ├── seo-technical/
│   ├── seo-on-page/
│   ├── seo-ai-geo/              ⭐
│   ├── seo-content-strategy/
│   ├── seo-local/
│   ├── seo-analytics/
│   ├── seo-growth-engine/       ⭐
│   ├── seo-slug-dates/
│   ├── seo-nextjs-implementation/
│   └── seo-audit-website/
│
└── examples/                    # Casos reales
    ├── linkship-llms.txt        # llms.txt de linkship.cc
    ├── linkship-robots.txt
    ├── karrito-llms.txt         # llms.txt de karrito.shop
    └── karrito-robots.txt
```

---

## Quick start con LLMs (Claude / ChatGPT / Cursor)

Si no querés instalar skills y solo querés que un LLM aplique el playbook a tu proyecto, copiá y pegá este prompt (reemplazá los `[corchetes]` con tu info):

```
Tengo un proyecto en [stack: Next.js / WordPress / Astro / Shopify / etc.]
sobre [nicho: SaaS de productividad / e-commerce de ropa / consultoría legal / etc.].
Mi sitio es [tudominio.com].

Quiero implementar el SEO + GEO Playbook completo. Los archivos están en:
https://github.com/curetcore/seo-geo-playbook

Hacelo así, conmigo:

1. Leé los archivos de playbook/ del repo (si tenés acceso a terminal:
   `git clone https://github.com/curetcore/seo-geo-playbook playbook`
   y abrí esa carpeta).

2. Auditá honestamente mi proyecto actual:
   - Qué pilares ya tengo implementados
   - Cuáles me faltan
   - Cuáles tengo a medias
   Mostrame el resultado en una tabla.

3. Empezá por el orden recomendado en playbook/_index.md
   (technical → on-page → JSON-LD → ai-seo → content-strategy → ...).

4. Para cada pilar:
   - Mostrame los cambios concretos que harías en mis archivos
   - Esperá mi aprobación antes de modificar nada
   - Adaptá los ejemplos genéricos a mi marca real
   - Si hay decisiones que dependen de mi nicho, preguntame antes de asumir

5. Pausá entre cada pilar para que pueda revisar y validar.

Empezá ahora con el audit. Si necesitás más info de mi proyecto,
preguntame antes de asumir.
```

> **Tip**: si vas con Claude Code, tenés el bonus de que puede ejecutar comandos (git, npm, lighthouse, etc.) y verificar resultados en tiempo real. Si vas con ChatGPT/Cursor, los cambios los hacés manualmente con su guía.

---

## Los 10 pilares

| # | Skill | Playbook | Qué cubre |
|---|-------|----------|-----------|
| 1 | [`seo-technical`](./skills/seo-technical/) | [`technical.md`](./playbook/technical.md) | Core Web Vitals, robots.ts, sitemap, security headers |
| 2 | [`seo-on-page`](./skills/seo-on-page/) | [`on-page.md`](./playbook/on-page.md) | Meta tags, headings, OG images, internal linking |
| 3 | [`seo-ai-geo`](./skills/seo-ai-geo/) ⭐ | [`ai-seo.md`](./playbook/ai-seo.md) | **AEO/GEO — llms.txt, AI Overviews, BLUF, citabilidad** |
| 4 | [`seo-content-strategy`](./skills/seo-content-strategy/) | [`content-strategy.md`](./playbook/content-strategy.md) | Content clusters, E-E-A-T, keyword research |
| 5 | [`seo-local`](./skills/seo-local/) | [`local-seo.md`](./playbook/local-seo.md) | GBP, NAP, LocalBusiness, multi-location |
| 6 | [`seo-analytics`](./skills/seo-analytics/) | [`analytics.md`](./playbook/analytics.md) | GSC, web-vitals RUM, AI referral tracking |
| 7 | [`seo-growth-engine`](./skills/seo-growth-engine/) ⭐ | [`growth-engine.md`](./playbook/growth-engine.md) | **Tools, blog, comparativas, outreach end-to-end** |
| 8 | [`seo-slug-dates`](./skills/seo-slug-dates/) | [`slug-date-distribution.md`](./playbook/slug-date-distribution.md) | Anti-batch signal — sitios con 50+ páginas |
| 9 | [`seo-nextjs-implementation`](./skills/seo-nextjs-implementation/) | — | Código TypeScript: JSON-LD generators, `generateMetadata` |
| 10 | [`seo-audit-website`](./skills/seo-audit-website/) | — | Auditoría automatizada con squirrelscan CLI |

Índice general en [`playbook/_index.md`](./playbook/_index.md).

---

## La parte que más se está demandando: GEO

**Generative Engine Optimization** = optimizar para que ChatGPT, Claude, Perplexity y Google AI Overviews te recomienden cuando alguien pregunta algo de tu nicho.

Es lo que más cambió mi tracción en 2026. Si solo vas a leer un archivo, leé **[`playbook/ai-seo.md`](./playbook/ai-seo.md)**. Cubre:

- `llms.txt` y `llms-full.txt` — el "robots.txt para LLMs"
- `robots.txt` para AI bots — cuáles permitir, cuáles bloquear
- BLUF (Bottom Line Up Front) — el formato que las IAs prefieren citar
- Cómo verificar si ChatGPT/Claude/Perplexity ya están citando tu sitio
- Patrones concretos para escribir contenido citable

Querés ver cómo se ve un `llms.txt` real en producción? [`examples/linkship-llms.txt`](./examples/linkship-llms.txt) (1175 líneas, multi-idioma).

---

## Stack en el que está probado

- **Next.js 14+ con App Router**
- **TypeScript** end-to-end
- **Tailwind v4**
- **Vercel + Cloudflare DNS**
- **Search Console** + **PostHog** + **web-vitals** RUM

Pero la estrategia (los `.md` del playbook) aplica a **cualquier stack** — WordPress, Astro, SvelteKit, Webflow, Shopify, lo que sea. El código TypeScript es bonus para devs Next.js.

---

## Orden de implementación recomendado

Para un proyecto nuevo:

1. **Technical** — robots.ts, sitemap.ts, security headers
2. **On-Page** — generateMetadata, title template, canonical
3. **JSON-LD** — Organization, BreadcrumbList, FAQ
4. **AI SEO** — llms.txt + robots.txt para AI bots
5. **Content Strategy** — clusters, BLUF, E-E-A-T
6. **Local SEO** — solo si aplica
7. **Analytics** — GSC + RUM
8. **Growth Engine** — tools, blog, comparativas, outreach
9. **Slug Date Distribution** — al escalar a 50+ páginas programáticas
10. **Audit** — primera auditoría post-lanzamiento

Detalles en [`playbook/_index.md`](./playbook/_index.md).

---

## FAQ

### ¿Funciona en WordPress / Shopify / Webflow?

Sí, la estrategia (todo lo de `playbook/`) aplica a cualquier stack. Lo que NO aplica es el código TypeScript en `skills/seo-nextjs-implementation/scripts/seo.ts` — eso es Next.js específico. Los conceptos los podés llevar a tu plataforma.

### ¿Cuánto tarda en mostrar resultados?

- **Indexación rica** (rich snippets, FAQ schema): 2-4 semanas
- **Tráfico orgánico inicial**: 4-8 semanas
- **Volumen significativo**: 2-4 meses
- **Citaciones consistentes en ChatGPT/Perplexity**: 3-6 meses

No hay shortcuts. Si alguien te promete resultados SEO en 7 días, está mintiendo o usa técnicas de blackhat que después te cuestan caro.

### ¿Necesito ser dev para usar esto?

Si vas a usar el `seo.ts` y los snippets de código, sí (nivel intermedio Next.js). Si solo querés la estrategia (`playbook/`), no — un LLM puede aplicarla a tu sitio leyendo los archivos.

### ¿Por qué el playbook está en español si la mayoría de SEO en internet está en inglés?

Porque mi audiencia es LATAM y porque hay menos contenido SEO honesto en español que en inglés. Si necesitás versión en inglés, abrí un issue.

### ¿Me podés ayudar con SEO de mi proyecto?

No hago consultoría. El repo es exactamente lo que recomendaría — está todo acá. Si tenés dudas específicas después de leerlo, abrí un issue o mencioname en Threads.

---

## Cuándo NO usar este playbook

Sé honesto con vos mismo:

- **Si tu producto no resuelve un problema real** — SEO no salva un producto malo
- **Si tu sitio carga en >5 segundos** — arreglá eso primero (skill `seo-technical`)
- **Si no tenés audiencia ni siquiera 0** — el playbook complementa distribución, no la reemplaza
- **Si estás buscando crecimiento en 2 semanas** — esto toma 2-4 meses mínimo
- **Si querés comprar backlinks** — eso es spam, no SEO. Te van a desindexar

---

## Qué viene después

Roadmap pendiente:

- [ ] Casos de estudio detallados con métricas mes a mes
- [ ] Sección de "errores que cometí los primeros 6 meses"
- [ ] Templates de prompts para auditorías con LLMs
- [ ] Patterns específicos para e-commerce LATAM
- [ ] Más ejemplos en `examples/` (sitemap snippets, OG image templates)

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
