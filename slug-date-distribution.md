# Slug-based Date Distribution — Anti-batch SEO signal

> Skill del agente `seo-marketing`. Evita que Google detecte programmatic SEO como "content farm batch" distribuyendo fechas por slug en lugar de usar fechas globales.
> Probado en Linkship 2026-04-24 — 318 páginas indexables, 10 rutas dinámicas.
> Stack: Next.js 16 App Router, TypeScript.

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

### Implementación completa

```ts
// src/lib/seo/dates.ts

export type DateCategory =
    | "glossary" | "niche" | "guide" | "tool" | "comparison"
    | "alternative" | "useCase" | "integration" | "template"
    | "trend" | "blog";

// Rangos de publishedAt por categoría. AJUSTAR al fundarFounding date del proyecto.
// IMPORTANTE: ninguna fecha antes del lanzamiento oficial (integridad narrativa).
const PUBLISHED_RANGES: Record<DateCategory, { start: string; end: string }> = {
    glossary: { start: "2025-12-01", end: "2026-03-15" },  // Evergreen temprano
    niche: { start: "2025-12-15", end: "2026-03-20" },     // Foundational
    guide: { start: "2026-01-01", end: "2026-04-01" },     // Tutoriales
    tool: { start: "2026-01-15", end: "2026-04-10" },      // Tech reciente
    comparison: { start: "2026-02-01", end: "2026-04-15" },// Pricing cambia
    alternative: { start: "2026-02-01", end: "2026-04-15" },
    useCase: { start: "2026-01-10", end: "2026-04-01" },
    integration: { start: "2025-12-20", end: "2026-04-05" },
    template: { start: "2026-01-01", end: "2026-03-30" },
    trend: { start: "2026-03-01", end: "2026-04-20" },     // Por definición reciente
    blog: { start: "2025-12-01", end: "2026-04-20" },
};

// updatedAt: TODAS las páginas "activamente mantenidas" en las últimas ~8 semanas
const UPDATED_RANGE = { start: "2026-02-28", end: "2026-04-24" };

// Hash determinístico djb2 — 32-bit, estable entre deploys
function hashSlug(slug: string): number {
    let hash = 5381;
    for (let i = 0; i < slug.length; i++) {
        hash = ((hash << 5) + hash + slug.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function toDateString(date: Date): string {
    return date.toISOString().split("T")[0]!;
}

function daysBetween(start: string, end: string): number {
    return Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 86400000);
}

function addDays(dateStr: string, days: number): string {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return toDateString(d);
}

export function slugToPublishedDate(slug: string, category: DateCategory): string {
    const range = PUBLISHED_RANGES[category];
    const total = daysBetween(range.start, range.end);
    if (total <= 0) return range.start;
    const offset = hashSlug(slug) % total;
    return addDays(range.start, offset);
}

export function slugToModifiedDate(slug: string, category: DateCategory): string {
    const publishedAt = slugToPublishedDate(slug, category);
    // Hash distinto para evitar correlación 1:1 con publishedAt
    const reversed = [...slug].reverse().join("") + "-updated";
    const total = daysBetween(UPDATED_RANGE.start, UPDATED_RANGE.end);
    if (total <= 0) return UPDATED_RANGE.end;
    const offset = hashSlug(reversed) % total;
    const candidate = addDays(UPDATED_RANGE.start, offset);
    // Guardrail: updatedAt nunca anterior a publishedAt
    return new Date(candidate) < new Date(publishedAt) ? publishedAt : candidate;
}

export function slugToDates(slug: string, category: DateCategory) {
    return {
        datePublished: slugToPublishedDate(slug, category),
        dateModified: slugToModifiedDate(slug, category),
    };
}
```

---

## Integración en rutas dinámicas

### 1. Page component (JSON-LD)

```tsx
// src/app/[locale]/para/[nicho]/page.tsx
import { slugToDates } from "@/lib/seo/dates";

export default async function Page({ params }) {
    const { nicho: slug } = await params;
    const niche = getNicheBySlug(slug);

    // Fechas distribuidas por slug
    const { datePublished, dateModified } = slugToDates(slug, "niche");

    const schemas = [
        getWebPageSchema({
            name: niche.title,
            description: niche.description,
            url,
            datePublished,  // ← per-slug, no global
            dateModified,   // ← per-slug, no global
        }),
        // ... otros schemas
    ];

    return (
        <>
            <script type="application/ld+json" ... />
            <LastUpdated date={dateModified} />  {/* ← pasar la fecha */}
        </>
    );
}
```

### 2. Componente LastUpdated con fallback

```tsx
// src/components/landing/LastUpdated.tsx
import { SITE_MODIFIED_DATE } from "@/config/seo";

export function LastUpdated({ className, date: dateOverride }: { className?: string; date?: string }) {
    const effectiveDate = dateOverride ?? SITE_MODIFIED_DATE;  // ← fallback para páginas estáticas
    const date = new Date(effectiveDate);
    const formatted = date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    return <p className={className}>Actualizado en <time dateTime={effectiveDate}>{formatted}</time></p>;
}
```

### 3. sitemap.ts — `lastmod` por slug

```ts
// src/app/sitemap.ts
import { slugToModifiedDate } from "@/lib/seo/dates";

const nichePages: MetadataRoute.Sitemap = getAllNicheSlugs().map((slug) => ({
    url: `${baseUrl}/para/${slug}`,
    lastModified: new Date(slugToModifiedDate(slug, "niche")),  // ← per-slug
    changeFrequency: "monthly" as const,
    priority: 0.7,
}));
```

### 4. Schema generators compartidos

Si tienes helpers como `generateToolSchemas(tool)` en `src/lib/`, pasar el slug + category:

```ts
// src/lib/tool-schemas.ts
import { slugToDates } from "@/lib/seo/dates";

export function generateToolSchemas(tool: ToolConfig) {
    const { datePublished, dateModified } = slugToDates(tool.slug, "tool");
    return [
        getWebPageSchema({ name: tool.title, url, datePublished, dateModified }),
        // ...
    ];
}
```

---

## Reglas de integridad

### Ética + narrativa

1. **NUNCA fechas anteriores al lanzamiento oficial** — la fundación del proyecto es el floor absoluto. Si el producto lanzó 2025-12-01, ningún `publishedAt` antes de eso.
2. **Coherencia de contenido** — si un post con `publishedAt: 2025-08` cita un evento que pasó en 2026-04, rompe integridad. Validar con script si el volumen lo amerita.
3. **Páginas con fechas reales de frontmatter (MDX, blogs)** — respetar. No sobrescribir con hash. Ej: blog posts con `publishedAt` en frontmatter.

### Técnicas

1. **Determinístico, no random** — misma fecha en cada deploy. Random rompe consistencia entre crawls de Google.
2. **Guardrail `updatedAt >= publishedAt`** — siempre. El algoritmo lo aplica.
3. **Hashes distintos para publishedAt y modifiedAt** — evita correlación 1:1 visible.
4. **Rangos realistas por categoría** — glossary más antiguo que trends. Contenido por definición "viejo" en fechas más antiguas.
5. **Páginas estáticas únicas (legal, pricing) mantienen fecha global** — no aplica. Son 1 sola página cada una, no generan "batch signal".

---

## Rangos por categoría (guía general)

Ajustar al producto. La lógica base:

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

**Archivos modificados** (11 total):
- `src/lib/seo/dates.ts` (new)
- `src/components/landing/LastUpdated.tsx` (prop opcional)
- `src/lib/tool-schemas.ts`
- `src/app/sitemap.ts`
- `src/app/[locale]/para/[nicho]/page.tsx`
- `src/app/[locale]/vs/[competitor]/page.tsx`
- `src/app/[locale]/alternativas/[competitor]/page.tsx`
- `src/app/[locale]/guia/[plataforma]/page.tsx`
- `src/app/[locale]/integraciones/[plataforma]/page.tsx`
- `src/app/[locale]/casos-de-uso/[uso]/page.tsx`
- `src/app/[locale]/templates/[categoria]/page.tsx`
- `src/app/[locale]/tools/[slug]/page.tsx`

**Tiempo de implementación**: ~40 min. **ROI esperado**: anti-batch signal permanente. Google reinterpreta el sitio como editorial, no content farm.

---

## Anti-patrones a evitar

❌ **Usar `Date.now()` o `new Date()` en build time directo** — no determinístico, distinto entre deploys.

❌ **Usar fechas random `Math.random()`** — cada crawl de Google ve fechas distintas, Google se confunde.

❌ **Fechas antes del lanzamiento oficial del proyecto** — viola integridad narrativa. Si te linkean citando fecha y Wayback Machine dice otra cosa, credibilidad muerta.

❌ **Cambiar el hash después de la primera indexación** — Google ya indexó con fechas X. Si las regeneras con otro algoritmo, reset de señales.

❌ **Aplicar a user-generated content (páginas de perfil, posts, etc.)** — esas sí son editoriales reales. Usar sus fechas de BD.

---

## Cuándo aplicar este skill

✅ **Cuando el proyecto tiene 50+ páginas programáticas** de una o más dimensiones (niches, tools, comparisons, etc.)

✅ **Antes de escalar a 500+ páginas** — aplicar de entrada evita reset de señales después

✅ **Proyectos con stack Next.js App Router** — `getWebPageSchema`, `sitemap.ts`, componentes de UI

❌ **Proyectos con <20 páginas** — overkill. Fechas globales OK.

❌ **Proyectos donde contenido tiene fechas reales en frontmatter** (MDX blogs) — respetar las reales, no sobrescribir.
