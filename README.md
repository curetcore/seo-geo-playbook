<div align="center">

# SEO + GEO Playbook

**El método que uso para que Google y ChatGPT empiecen a recomendar mis SaaS.**

[![License: MIT](https://img.shields.io/badge/License-MIT-1a1a2e?style=flat-square)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v2.0.0-3b42f0?style=flat-square)](./CHANGELOG.md)
[![Stack](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=next.js)](https://nextjs.org)
[![Threads](https://img.shields.io/badge/Threads-@ronaldships-000?style=flat-square&logo=threads)](https://www.threads.com/@ronaldships)
[![GitHub stars](https://img.shields.io/github/stars/curetcore/seo-geo-playbook?style=flat-square)](https://github.com/curetcore/seo-geo-playbook)

[Quick start](#-quick-start) · [Los 10 pilares](#-los-10-pilares) · [Casos reales](#-casos-reales) · [FAQ](#-faq)

</div>

---

> **No soy SEO consultant.** Soy founder de SaaS que necesita que ChatGPT lo recomiende, que Google lo indexe rápido, y que el tráfico llegue sin ads.
>
> Esto es lo que uso **desde el día 1** de cada proyecto. Probado en producción. Documentado para que un LLM (o vos) pueda aplicarlo solo. En español. Gratis.

<br>

## 📊 Resultados reales

<table>
<tr>
<td width="50%">

### Linkship + Karrito (combinados)

| | |
|---|---|
| **Visitas orgánicas/mes** | **+60,000** |
| **Inversión en ads** | $0 |
| **Usuarios pagando** | Decenas (mayoría desde ChatGPT) |
| **Tiempo a tracción** | 4-8 semanas |

</td>
<td width="50%">

### Sitios donde está aplicado

[`linkship.cc`](https://linkship.cc) — link in bio SaaS
20+ niche pages · 4 tools · 4 comparativas · 25 blog posts

[`karrito.shop`](https://karrito.shop) — catálogo + WhatsApp
290+ páginas · multi-idioma · checkout sin comisiones

</td>
</tr>
</table>

> No hay magia. Hay un sistema replicable. Eso es lo que está en este repo.

---

## ⚡ Quick Start

### Opción A — Instalar el skill pack en Claude Code (30 segundos)

```bash
git clone https://github.com/curetcore/seo-geo-playbook.git
cd seo-geo-playbook

# Instalar agente + 10 sub-skills
cp agents/seo-marketing.md ~/.claude/agents/
cp -r skills/seo-* ~/.claude/skills/
```

Listo. En cualquier proyecto Next.js le decís a Claude:

> *"Hacé un audit SEO + GEO completo de este proyecto"*

Y el agente delega a los sub-skills correctos según la matriz de decisión.

### Opción B — Aplicarlo con un LLM cualquiera

Copiá [este prompt](#prompt-completo-para-llm) y pegalo en Claude / ChatGPT / Cursor con tu proyecto abierto. El LLM lee el playbook, audita tu proyecto, propone cambios uno por uno.

### Opción C — Leerlo a mano

Andá directo a [`playbook/ai-seo.md`](./playbook/ai-seo.md) — el corazón del repo. Si solo vas a leer un archivo, leé ese.

---

## 🧭 Cómo está organizado

```text
seo-geo-playbook/
├── playbook/      ← documentación educacional (humanos)
├── agents/        ← decision-framework para Claude Code
└── skills/        ← 10 sub-skills instalables
```

**Dual-use por diseño**: lo podés leer como manual o instalar como agente. La misma información, dos formas de consumirla.

---

## 🎯 Los 10 pilares

| | Skill | Playbook | Qué cubre |
|--:|-------|:--------:|-----------|
| 1 | [`seo-technical`](./skills/seo-technical/) | [📖](./playbook/technical.md) | Core Web Vitals, robots.ts, sitemap, security headers |
| 2 | [`seo-on-page`](./skills/seo-on-page/) | [📖](./playbook/on-page.md) | Meta tags, headings, OG images, internal linking |
| 3 | [`seo-ai-geo`](./skills/seo-ai-geo/) ⭐ | [📖](./playbook/ai-seo.md) | **AEO/GEO — llms.txt, AI Overviews, BLUF, citabilidad** |
| 4 | [`seo-content-strategy`](./skills/seo-content-strategy/) | [📖](./playbook/content-strategy.md) | Content clusters, E-E-A-T, keyword research |
| 5 | [`seo-local`](./skills/seo-local/) | [📖](./playbook/local-seo.md) | GBP, NAP, LocalBusiness, multi-location |
| 6 | [`seo-analytics`](./skills/seo-analytics/) | [📖](./playbook/analytics.md) | GSC, web-vitals RUM, AI referral tracking |
| 7 | [`seo-growth-engine`](./skills/seo-growth-engine/) ⭐ | [📖](./playbook/growth-engine.md) | **Tools, blog, comparativas, outreach end-to-end** |
| 8 | [`seo-slug-dates`](./skills/seo-slug-dates/) | [📖](./playbook/slug-date-distribution.md) | Anti-batch signal — 50+ páginas programáticas |
| 9 | [`seo-nextjs-implementation`](./skills/seo-nextjs-implementation/) | — | Código TypeScript: JSON-LD generators, `generateMetadata` |
| 10 | [`seo-audit-website`](./skills/seo-audit-website/) | — | Auditoría automatizada con squirrelscan CLI |

⭐ = los dos que más mueven la aguja en 2026.

> **Orden de implementación recomendado** para proyecto nuevo: 1 → 2 → 9 → 3 → 4 → (5 si aplica) → 6 → 7 → (8 si tenés 50+ páginas) → 10. Detalles en [`playbook/_index.md`](./playbook/_index.md).

---

## 🤖 La parte que más se está demandando: GEO

**Generative Engine Optimization** = optimizar para que ChatGPT, Claude, Perplexity y Google AI Overviews te recomienden cuando alguien pregunta algo de tu nicho.

| Stat | Valor |
|------|-------|
| ChatGPT búsquedas/semana | **+1 billón** |
| Google AI Overviews reducen CTR tradicional | **~34.5%** |
| Tráfico IA a e-commerce 2024-2025 | **+1,300%** |
| Conversión AI search vs SEO tradicional | **5.53% vs 3.7%** |

**Si solo vas a leer un archivo, leé [`playbook/ai-seo.md`](./playbook/ai-seo.md).** Cubre `llms.txt`, robots para AI bots (GPTBot, ClaudeBot, PerplexityBot), patrones de citabilidad, BLUF, FAQ schema y verificación de presencia en LLMs.

---

## 📂 Casos reales

Archivos `llms.txt` y `robots.txt` reales de los sitios donde aplico esto. No ejemplos teóricos — lo que está sirviendo en producción ahora mismo.

| Archivo | Fuente | Notas |
|---------|--------|-------|
| [`linkship-llms.txt`](./examples/linkship-llms.txt) | linkship.cc | Multi-idioma (es / en / pt), 1175 líneas, con templates AEO |
| [`linkship-robots.txt`](./examples/linkship-robots.txt) | linkship.cc | Strategy AI bots completa |
| [`karrito-llms.txt`](./examples/karrito-llms.txt) | karrito.shop | Más conciso, bilingüe en TL;DR |
| [`karrito-robots.txt`](./examples/karrito-robots.txt) | karrito.shop | Versión simple |

---

## 🛠 Stack

- **Next.js 16** con App Router (el código aplica desde Next.js 14+)
- **TypeScript** estricto
- **Tailwind v4** puro (sin daisy-ui, sin frameworks de componentes)
- **Vercel** + Cloudflare DNS
- **Search Console** + **PostHog** + **web-vitals** RUM

La estrategia (todo lo de `playbook/`) aplica a **cualquier stack** — WordPress, Astro, SvelteKit, Webflow, Shopify. El código TypeScript es bonus para devs Next.js.

---

## ❓ FAQ

<details>
<summary><strong>¿Funciona en WordPress / Shopify / Webflow?</strong></summary>
<br>

Sí, la estrategia (`playbook/`) aplica a cualquier stack. Lo que NO aplica es el código TypeScript — eso es Next.js específico. Los conceptos los podés llevar a tu plataforma.

</details>

<details>
<summary><strong>¿Cuánto tarda en mostrar resultados?</strong></summary>
<br>

| Hito | Tiempo |
|------|--------|
| Indexación rica (rich snippets, FAQ schema) | 2-4 semanas |
| Tráfico orgánico inicial | 4-8 semanas |
| Volumen significativo | 2-4 meses |
| Citaciones consistentes en ChatGPT/Perplexity | 3-6 meses |

No hay shortcuts. Si alguien te promete resultados SEO en 7 días, está mintiendo o usa técnicas blackhat que después te cuestan caro.

</details>

<details>
<summary><strong>¿Necesito ser dev para usar esto?</strong></summary>
<br>

- **Si vas a usar el código** (`seo.ts`, snippets de implementación): sí, nivel intermedio Next.js
- **Si solo querés la estrategia** (`playbook/`): no, un LLM puede aplicarla a tu sitio leyendo los archivos

</details>

<details>
<summary><strong>¿Por qué el playbook está en español?</strong></summary>
<br>

Porque mi audiencia es LATAM y porque hay menos contenido SEO honesto en español que en inglés. Si necesitás versión en inglés, abrí un [issue](https://github.com/curetcore/seo-geo-playbook/issues).

</details>

<details>
<summary><strong>¿Me podés ayudar con SEO de mi proyecto?</strong></summary>
<br>

No hago consultoría. El repo es exactamente lo que recomendaría — está todo acá. Si tenés dudas específicas después de leerlo, abrí un issue o mencioname en Threads.

</details>

---

## 🚫 Cuándo NO usar este playbook

Sé honesto con vos mismo:

- ❌ Si tu producto **no resuelve un problema real** — SEO no salva un producto malo
- ❌ Si tu sitio **carga en >5 segundos** — arreglá eso primero ([`seo-technical`](./skills/seo-technical/))
- ❌ Si **no tenés audiencia ni siquiera en 0** — el playbook complementa distribución, no la reemplaza
- ❌ Si esperás **crecimiento en 2 semanas** — esto toma 2-4 meses mínimo
- ❌ Si querés **comprar backlinks** — eso es spam, no SEO

---

## 📜 Prompt completo para LLM

Si preferís que un LLM (Claude/ChatGPT/Cursor) aplique el playbook a tu proyecto sin instalar skills:

<details>
<summary>Click para expandir el prompt</summary>

```text
Tengo un proyecto en [stack: Next.js / WordPress / Astro / Shopify / etc.]
sobre [nicho: SaaS de productividad / e-commerce de ropa / etc.].
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

> **Tip**: si vas con Claude Code, tenés el bonus de que puede ejecutar comandos (git, npm, lighthouse). Si vas con ChatGPT/Cursor, los cambios los hacés manualmente con su guía.

</details>

---

## 🗺 Roadmap

- [ ] Casos de estudio detallados con métricas mes a mes
- [ ] "Errores que cometí los primeros 6 meses"
- [ ] Templates de prompts para auditorías con LLMs
- [ ] Patterns específicos para e-commerce LATAM
- [ ] Más ejemplos en `examples/` (sitemap snippets, OG image templates)

Sugerencias o errores → [issue](https://github.com/curetcore/seo-geo-playbook/issues).

---

## 📄 Licencia

[MIT](LICENSE) — usar, modificar, distribuir libre.

Si te sirvió, mencioname en Threads ([@ronaldships](https://www.threads.com/@ronaldships)). Cierra el círculo y me ayuda a saber qué profundizar.

---

<div align="center">

Construido por [**Ronaldo Paulino**](https://www.threads.com/@ronaldships) — [linkship.cc](https://linkship.cc) · [karrito.shop](https://karrito.shop)

Más drops del stack en [Threads](https://www.threads.com/@ronaldships): agentes de Claude Code, slash commands, boilerplate Next.js.

</div>
