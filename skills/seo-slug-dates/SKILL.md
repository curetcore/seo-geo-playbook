---
name: seo-slug-dates
description: Implementa anti-batch SEO signal en sitios con páginas programáticas (`/para/[slug]`, `/vs/[slug]`, `/tools/[slug]`) — distribuye `publishedAt` y `dateModified` por categoría usando hash determinístico del slug, evitando que Google detecte el sitio como "content farm batch". Use this skill whenever the user has 50+ programmatic pages, mentions content farm signals, batch detection, identical sitemap lastmod, programmatic SEO, or asks how to make programmatic pages look editorial — even if they don't say "anti-batch".
---

# Slug-based Date Distribution

Anti-batch SEO signal. Distribuye fechas por slug en lugar de fechas globales para evitar que Google detecte programmatic SEO como "content farm". Probado en Linkship 2026-04-24 — 318 páginas indexables, 10 rutas dinámicas. Stack: Next.js 16 App Router, TypeScript.

---

## Cuándo invocar este skill

- El proyecto tiene 50+ páginas programáticas (de una o más dimensiones)
- Antes de escalar a 500+ páginas
- El usuario nota que todas las páginas tienen el mismo `publishedAt` o `<lastmod>`
- Sospecha de "content farm signal" en GSC
- Setup nuevo de sitio data-driven con `getStaticParams`

**No usar cuando**:
- El proyecto tiene <20 páginas (overkill, fechas globales OK)
- El contenido tiene fechas reales en frontmatter (MDX blogs) — respetar las reales

---

## Problema

Cuando un proyecto tiene programmatic SEO (páginas generadas por config data-driven como `/para/[nicho]`, `/vs/[competitor]`, `/tools/[slug]`), la tentación es usar fechas globales:

```ts
// Anti-patrón
export const SITE_PUBLISHED_DATE = "2025-12-01";
export const SITE_MODIFIED_DATE = BUILD_DATE;

// ... en cada página:
datePublished: SITE_PUBLISHED_DATE,
dateModified: SITE_MODIFIED_DATE,
```

Resultado: 500+ páginas con exactamente las mismas fechas. Google interpreta esto como:

| Señal | Cómo lo lee Google |
|-------|-------------------|
| 500 `publishedAt` idénticos | "Contenido auto-generado en batch" |
| Sitemap `<lastmod>` idéntico en 500 URLs | "Sistema, no editorial" |
| Sin distribución histórica | "Sitio sin historial real" |
| Freshness signals masivos | Se diluyen, ninguno destaca |

Los LLMs (ChatGPT, Claude, Perplexity) también descartan fuentes que parecen auto-generadas.

---

## Solución: hash determinístico por slug

Cada slug produce una fecha estable distribuida en un rango definido por categoría. Misma entrada → misma salida entre deploys. Resultado: el sitio se ve editorial, no batch.

El script completo (listo para pegar en `src/lib/seo/dates.ts`) está en [`scripts/dates.ts`](./scripts/dates.ts).

---

## Reglas clave

1. **Determinístico, NO random** — misma fecha en cada deploy. Random rompe consistencia entre crawls de Google
2. **NUNCA fechas anteriores al lanzamiento oficial** — la fundación del proyecto es el floor absoluto. Si el producto lanzó 2025-12-01, ningún `publishedAt` antes de eso. Viola integridad narrativa
3. **Guardrail `updatedAt >= publishedAt`** — siempre. El algoritmo lo aplica
4. **Hashes distintos para `publishedAt` y `modifiedAt`** — evita correlación 1:1 visible
5. **Rangos realistas por categoría** — glossary más antiguo que trends. Contenido por definición "viejo" en fechas más antiguas
6. **Páginas estáticas únicas (legal, pricing) mantienen fecha global** — no aplica. Son 1 sola página cada una, no generan "batch signal"
7. **Páginas con fechas reales de frontmatter (MDX blogs)** — respetar. No sobrescribir con hash

---

## Categorías y rangos

```ts
type DateCategory =
  | "glossary" | "niche" | "guide" | "tool" | "comparison"
  | "alternative" | "useCase" | "integration" | "template"
  | "trend" | "blog";
```

| Categoría | Cuándo publicarla (relativo a lanzamiento) | Razón |
|-----------|------|-------|
| `glossary` | Muy temprano | Definiciones son evergreen, "viejas" es más creíble |
| `niche` | Temprano | Landing pages por nicho son foundational |
| `integration` | Temprano | Integraciones core suelen existir desde inicio |
| `useCase` | Medio | Casos de uso se articulan con producto maduro |
| `template` | Medio | Se agregan progresivamente |
| `guide` | Medio-tardío | Tutoriales se escriben cuando hay feature |
| `tool` | Tardío | Tech moderno, features recientes |
| `comparison` | Tardío | Pricing cambia, datos recientes |
| `alternative` | Tardío | Idem comparison |
| `trend` | Últimos 60 días | Por definición reciente |
| `blog` | Amplio | Cluster editorial natural desde día 1 |

**IMPORTANTE**: ajustar rangos al `foundingDate` real del proyecto. Editar [`scripts/dates.ts`](./scripts/dates.ts) con tus fechas.

---

## Integración en rutas dinámicas

### 1. Page component (JSON-LD)

```tsx
// src/app/[locale]/para/[nicho]/page.tsx
import { slugToDates } from "@/lib/seo/dates";

export default async function Page({ params }) {
  const { nicho: slug } = await params;
  const niche = getNicheBySlug(slug);

  const { datePublished, dateModified } = slugToDates(slug, "niche");

  const schemas = [
    getWebPageSchema({
      name: niche.title,
      description: niche.description,
      url,
      datePublished,  // per-slug, no global
      dateModified,   // per-slug, no global
    }),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <LastUpdated date={dateModified} />
    </>
  );
}
```

### 2. Componente `LastUpdated` con fallback

```tsx
// src/components/landing/LastUpdated.tsx
import { SITE_MODIFIED_DATE } from "@/config/seo";

export function LastUpdated({ className, date: dateOverride }: { className?: string; date?: string }) {
  const effectiveDate = dateOverride ?? SITE_MODIFIED_DATE;
  const date = new Date(effectiveDate);
  const formatted = date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  return <p className={className}>Actualizado en <time dateTime={effectiveDate}>{formatted}</time></p>;
}
```

### 3. `sitemap.ts` — `lastmod` por slug

```ts
// src/app/sitemap.ts
import { slugToModifiedDate } from "@/lib/seo/dates";

const nichePages: MetadataRoute.Sitemap = getAllNicheSlugs().map((slug) => ({
  url: `${baseUrl}/para/${slug}`,
  lastModified: new Date(slugToModifiedDate(slug, "niche")), // per-slug
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));
```

### 4. Schema generators compartidos

Si tenés helpers como `generateToolSchemas(tool)` en `src/lib/`, pasar el slug + category:

```ts
// src/lib/tool-schemas.ts
import { slugToDates } from "@/lib/seo/dates";

export function generateToolSchemas(tool: ToolConfig) {
  const { datePublished, dateModified } = slugToDates(tool.slug, "tool");
  return [
    getWebPageSchema({ name: tool.title, url, datePublished, dateModified }),
  ];
}
```

---

## Anti-patrones

❌ **Usar `Date.now()` o `new Date()` en build time directo** — no determinístico, distinto entre deploys
❌ **Usar fechas random `Math.random()`** — cada crawl de Google ve fechas distintas, Google se confunde
❌ **Fechas antes del lanzamiento oficial del proyecto** — viola integridad narrativa. Si te linkean citando fecha y Wayback Machine dice otra cosa, credibilidad muerta
❌ **Cambiar el hash después de la primera indexación** — Google ya indexó con fechas X. Si las regenerás con otro algoritmo, reset de señales
❌ **Aplicar a user-generated content (páginas de perfil, posts, etc.)** — esas sí son editoriales reales. Usar sus fechas de DB

---

## Verificación post-implementación

```bash
# 1. Verificar que la función produce fechas distintas
npx tsx -e "
import { slugToDates } from './src/lib/seo/dates';
const tests = [
  ['instagram', 'niche'],
  ['tiktok', 'niche'],
  ['linktree', 'comparison'],
];
for (const [slug, cat] of tests) {
  console.log(slug, slugToDates(slug, cat));
}
"

# 2. Typecheck + lint
npx tsc --noEmit
npx eslint src/lib/seo/dates.ts

# 3. Build completo (captura problemas en generateStaticParams)
npm run build

# 4. Verificar sitemap local
curl http://localhost:3000/sitemap.xml | head -50
# Debe mostrar <lastmod> variados, no todos iguales

# 5. Google Search Console post-deploy
# - Verificar que nuevas fechas se indexan
# - Impresiones deberían subir progresivamente (no spike artificial)
```

---

## Caso real: Linkship 2026-04-24

**Antes**: 318 páginas indexables, todas con `publishedAt = 2025-12-01` y `modifiedAt = BUILD_DATE`.

**Después**:
- 10 rutas dinámicas con fechas distribuidas: `/para`, `/vs`, `/alternativas`, `/guia`, `/integraciones`, `/casos-de-uso`, `/templates`, `/tools`, `/explorar`, `/tendencias`
- Sitemap `<lastmod>` único por URL
- Componente `LastUpdated` acepta prop override con fallback global
- `tool-schemas.ts` centralizado también usa el helper

**Tiempo de implementación**: ~40 min. **ROI esperado**: anti-batch signal permanente. Google reinterpreta el sitio como editorial, no content farm.

---

## Bundled script

- [`scripts/dates.ts`](./scripts/dates.ts) — Implementación completa lista para pegar en `src/lib/seo/dates.ts`. Incluye `hashSlug` (djb2), `slugToPublishedDate`, `slugToModifiedDate`, `slugToDates` y rangos por categoría.

Ajustar el rango `PUBLISHED_RANGES` y `UPDATED_RANGE` con las fechas reales de tu proyecto antes de usar.
